![VRChat MCP](./eyecatch.jpg)

[![npm version](https://badge.fury.io/js/vrchat-mcp.svg)](https://badge.fury.io/js/vrchat-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[日本語](./README.ja.md) | [한국어](./README.ko.md)

This project is a Model Context Protocol (MCP) server for interacting with the VRChat API. It allows you to retrieve various information from VRChat using a standardized protocol.

<a href="https://youtu.be/0MRxhzlFCkw">
  <img width="300" src="https://github.com/user-attachments/assets/85c00cc4-46b3-4f66-ab36-bf2891fdb283" alt="YouTube" />
</a>

<a href="https://glama.ai/mcp/servers/u763zoyi5a">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/u763zoyi5a/badge" />
</a>

## Overview

The VRChat MCP server provides a way to access VRChat's API endpoints in a structured manner. It supports a wide range of functionalities, including user authentication, retrieving user and friend information, accessing avatar and world data, and more.

## Usage

To start the server, ensure you have the necessary environment variables set:

```bash
export VRCHAT_USERNAME=your_username
export VRCHAT_AUTH_TOKEN=your_auth_token
```

> [!NOTE]
> #### How to obtain AUTH TOKEN
>
> You can use the following command for a simple login:
> ```
> npx vrchat-auth-token-checker
> ```
> [Command source code](https://github.com/sawa-zen/vrchat-auth-token-checker)
>
> **Please handle the obtained token with care as it has a very long lifetime**

Then, run the following command:

```bash
npx vrchat-mcp
```

This will launch the MCP server, allowing you to interact with the VRChat API through the defined tools.

## Usage with Claude Desktop

To use this MCP server with Claude Desktop, you do not need to run `npx vrchat-mcp` manually. Instead, add the following configuration to your Claude Desktop config file:

- MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vrchat-mcp": {
      "command": "npx",
      "args": ["vrchat-mcp"],
      "env": {
        "VRCHAT_USERNAME": "your-username",
        "VRCHAT_AUTH_TOKEN": "your-auth-token"
      }
    }
  }
}
```

Then, start Claude Desktop as usual. If you have to use nodenv or nvm, you may need to specify the full path to the `npx` command.

## Available Tools

This Model Context Protocol server provides the following VRChat-related tools:

### User Related
- vrchat_get_friends_list: Get a list of friends
- vrchat_send_friend_request: Send a friend request

### Avatar Related
- vrchat_search_avatars: Search for avatars
- vrchat_select_avatar: Select and switch to a specific avatar

### World Related
- vrchat_search_worlds: Search for worlds
- vrchat_list_favorited_worlds: Get a list of favorited worlds

### Instance Related
- vrchat_create_instance: Create a new instance
- vrchat_get_instance: Get information about a specific instance

### Group Related
- vrchat_search_groups: Search for groups
- vrchat_join_group: Join a group

### Favorites Related
- vrchat_list_favorites: Get a list of favorites
- vrchat_add_favorite: Add a new favorite
- vrchat_list_favorite_groups: Get a list of favorite groups

### Invite Related
- vrchat_list_invite_messages: Get a list of invite messages
- vrchat_request_invite: Request an invite
- vrchat_get_invite_message: Get a specific invite message

### Notification Related
- vrchat_get_notifications: Get a list of notifications

## Debugging

First, build the project:

```bash
npm install
npm run build
```

Since MCP servers run over stdio, debugging can be challenging. For the best debugging experience, we strongly recommend using the MCP Inspector.

You can launch the MCP Inspector via npm with this command:

```bash
npx @modelcontextprotocol/inspector "./dist/main.js"
```

Be sure that environment variables are properly configured.

Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.

## Publishing

To publish a new version of the package, follow these steps:

1. Pull the latest code from the main branch
   ```bash
   git checkout main
   git pull origin main
   ```

2. Build the package
   ```bash
   npm run build
   ```

4. Publish to npm
   ```bash
   npm publish
   ```

5. Push changes to the remote repository
   ```bash
   git push origin main --tags
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
