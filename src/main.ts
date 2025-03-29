#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import dotenv from 'dotenv'
import { VRChatClient } from './VRChatClient.js'
import { createFriendsTools } from './tools/friends.js'
import { createUsersTools } from './tools/users.js'
import { createAvatarsTools } from './tools/avatars.js'
import { createWorldsTools } from './tools/worlds.js'
import { createInstancesTools } from './tools/instances.js'
import { createGroupsTools } from './tools/groups.js'
import { createFavoritesTools } from './tools/favorites.js'
dotenv.config()

const vrchatClient = new VRChatClient({
  username: process.env.VRCHAT_USERNAME || '',
  password: process.env.VRCHAT_PASSWORD || '',
  potpSecret: process.env.VRCHAT_TOTP_SECRET || '',
  email: process.env.VRCHAT_EMAIL || ''
})

const server = new McpServer({
  name: 'vrchat-mcp',
  version: '0.8.1'
})

createUsersTools(server, vrchatClient)
createFriendsTools(server, vrchatClient)
createAvatarsTools(server, vrchatClient)
createWorldsTools(server, vrchatClient)
createInstancesTools(server, vrchatClient)
createGroupsTools(server, vrchatClient)
createFavoritesTools(server, vrchatClient)

// Start MCP server
const transport = new StdioServerTransport()
await server.connect(transport)
console.error('VRChat MCP server running on stdio')
