#!/usr/bin/env node

/**
 * Model Context Protocol (MCP) Server for VRChat
 *
 * MCPの仕組み:
 * 1. MCPサーバーは、特定のドメイン（この場合はVRChat）に関する機能をツールとして提供します
 * 2. ツールは、入力パラメータを定義し、特定の機能を実行します
 * 3. Clineは、MCPサーバーが提供するツールを使用して、ユーザーのタスクを実行します
 * 4. 通信は標準入出力（stdio）を介して行われます
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Configuration, AuthenticationApi, Verify2FAResult } from 'vrchat';
import { authenticator } from 'otplib';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

const username = process.env.VRCHAT_USERNAME;
const password = process.env.VRCHAT_PASSWORD;

if (!username || !password) {
  throw new Error('VRCHAT_USERNAME and VRCHAT_PASSWORD must be set in .env file');
}

// TOTPシークレットキー
const totpSecret = process.env.VRCHAT_TOTP_SECRET;

if (!totpSecret) {
  throw new Error('VRCHAT_TOTP_SECRET must be set in .env file');
}

// VRChat APIクライアントの初期化
const configuration = new Configuration({
  username,
  password,
  baseOptions: {
    headers: {
      'User-Agent': 'vrchat-mcp/1.0.0',
    },
  },
});

const authApi = new AuthenticationApi(configuration);

// TOTPコードを生成して2FA認証を行う関数
async function authenticateWithTOTP(): Promise<Verify2FAResult> {
  if (!totpSecret) {
    throw new Error('TOTP secret is not set');
  }
  const totpCode = authenticator.generate(totpSecret);
  console.log(`Generated TOTP`);
  const response = await authApi.verify2FA({ code: totpCode });
  console.log('2FA verification response:', response.data);
  if (!response.data.verified) {
    throw new Error('2FA verification failed');
  }
  return response.data;
}

// MCPサーバーの作成
const server = new McpServer({
  name: "vrchat-mcp",
  version: "0.1.0"
});

// ユーザー情報取得ツールの追加
server.tool("get_current_user",
  "VRChat のアカウント情報を取得します",
  {}, // パラメータなし
  async () => {
    try {
      // 2FA認証を実行
      await authenticateWithTOTP();
    } catch (error) {
      throw new Error(`Failed to authenticate with TOTP: ${error}`);
    }

    try {
      // 認証後にユーザー情報を取得
      const response = await authApi.getCurrentUser();
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            username: response.data.displayName,
            status: response.data.status,
            statusDescription: response.data.statusDescription,
            lastLogin: response.data.last_login,
            currentAvatarImageUrl: response.data.currentAvatarImageUrl,
          }, null, 2)
        }]
      };
    } catch (error) {
      throw new Error(`Failed to get current user: ${error}`);
    }
  }
);

// サーバーの起動
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('VRChat MCP server running on stdio');
