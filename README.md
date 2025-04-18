![VRChat MCP](./eyecatch.jpg)

[![npm version](https://badge.fury.io/js/vrchat-mcp.svg)](https://badge.fury.io/js/vrchat-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[日本語](./README.ja.md) | [한국어](./README.ko.md)

This project is a Model Context Protocol (MCP) server for interacting with the VRChat API. It allows you to retrieve various information from VRChat using a standardized protocol.

<a href="https://youtu.be/0MRxhzlFCkw">
  <img width="300" src="https://github.com/user-attachments/assets/85c00cc4-46b3-4f66-ab36-bf2891fdb283" alt="YouTube" />
</a>

## Overview

The VRChat MCP server provides a way to access VRChat's API endpoints in a structured manner. It supports a wide range of functionalities, including user authentication, retrieving user and friend information, accessing avatar and world data, and more.

## Usage

To start the server, ensure you have the necessary environment variables set:

```bash
export VRCHAT_USERNAME=your_username
export VRCHAT_PASSWORD=your_password
export VRCHAT_TOTP_SECRET=your_totp_secret
export VRCHAT_EMAIL=your_email@example.com
```

> [!NOTE]
> #### Obtain your TOTP secret
> 1. Visit the [VRChat Profile](https://vrchat.com/home/profile) and enable Two-factor authentication.
> 2. Decode the displayed QR code to get a string like `otpauth://totp/VRChat:your@email.com?secret=XXXXXXXXXXXXXXXXXXX&issuer=VRChat`.
> 3. Use the `XXXXXXXXXXXXXXXXXXX` part as your TOTP secret.
>
> **This method may have security concerns, so proceed with caution.**

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
        "VRCHAT_PASSWORD": "your-password",
        "VRCHAT_TOTP_SECRET": "your-totp-secret",
        "VRCHAT_EMAIL": "your-email@example.com"
      }
    }
  }
}
```

Then, start Claude Desktop as usual. If you have to use nodenv or nvm, you may need to specify the full path to the `npx` command.

## VRChat API Endpoints

This is a list of endpoints from the VRChat API that our Model Context Protocol server supports or plans to support. Both GET and POST methods are included to provide comprehensive functionality. The checkboxes indicate the implementation status of each endpoint.

### Authentication and User Information
- [x] Get current user info
- [ ] Search users
- [ ] Get specific user profile
- [ ] Get user groups
- [ ] Get player moderations
- [ ] Get user status
- [ ] Update user info
- [ ] Update user status
- [ ] Block user
- [ ] Unblock user

### Friend Related
- [x] Get friends list
- [ ] Get online friends
- [x] Send friend request
- [ ] Accept/Deny friend request
- [ ] Remove friend

### Avatar Related
- [ ] Get own avatars
- [ ] Get favorite avatars
- [x] Search avatars
- [ ] Get specific avatar details
- [ ] Get public avatars
- [ ] Create avatar
- [ ] Update avatar
- [ ] Delete avatar
- [x] Select avatar
- [ ] Favorite/Unfavorite avatar

### World Related
- [ ] Get worlds list
- [ ] Get active worlds
- [ ] Get recently visited worlds
- [x] Get favorite worlds
- [x] Search worlds
- [ ] Get specific world details
- [ ] Get world instances
- [ ] Get public worlds
- [ ] Create world
- [ ] Update world
- [ ] Delete world
- [ ] Favorite/Unfavorite world

### Instance Related
- [x] Create instance
- [x] Get instance info
- [ ] Get instance attendees
- [ ] Get instance short name
- [ ] Join instance
- [ ] Leave instance
- [ ] Invite user to instance

### File Related
- [ ] Get file info
- [ ] Get file download info
- [ ] Get file status

### Group Related
- [x] Search groups
- [ ] Get specific group info
- [ ] Get group members
- [ ] Get group permissions
- [ ] Get group requests
- [ ] Get group invites
- [ ] Get group bans
- [ ] Get group galleries
- [ ] Get group owned worlds
- [ ] Create group
- [ ] Update group
- [ ] Delete group
- [x] Join group
- [ ] Leave group
- [ ] Invite user to group
- [ ] Accept/Deny group invite
- [ ] Ban user from group
- [ ] Unban user from group

### Notification Related
- [x] Get notifications list
- [ ] Get friend requests
- [ ] Get unread notification count
- [ ] Mark notification as read
- [ ] Delete notification
- [ ] Clear all notifications

### Inventory Related
- [ ] Get license types
- [ ] Get owned licenses
- [ ] Get stores list

### System Related
- [ ] Get API configuration
- [ ] Get API limits
- [ ] Check system health
- [ ] Get online users count
- [ ] Get server announcements

### Favorites
- [x] List Favorites
- [x] Add Favorite
- [ ] Remove Favorite
- [x] List Favorite Groups
- [ ] Show Favorite Group
- [ ] Update Favorite Group
- [ ] Clear Favorite Group
- [ ] Get Favorite Limits

### Invites
- [x] List Invite Messages
- [x] Request Invite
- [ ] Send Invite
- [x] Get Invite Message
- [ ] Update Invite Message

### Others
- [ ] Get tags list
- [ ] Get invisibles list
- [ ] Get moderations
- [ ] Get favorite group types
- [ ] Create moderation
- [ ] Delete moderation

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

2. Update the version as needed
   ```bash
   # For patch version updates (e.g., 0.1.2 → 0.1.3)
   npm version patch

   # For minor version updates (e.g., 0.1.2 → 0.2.0)
   npm version minor

   # For major version updates (e.g., 0.1.2 → 1.0.0)
   npm version major
   ```

3. Build the package
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
