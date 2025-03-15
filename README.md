# VRChat MCP(Model Context Protocol)

![eyecatch](./eyecatch.jpg)

This project is a Model Context Protocol (MCP) server for interacting with the VRChat API. It allows you to retrieve various information from VRChat using a standardized protocol.

## Overview

The VRChat MCP server provides a way to access VRChat's API endpoints in a structured manner. It supports a wide range of functionalities, including user authentication, retrieving user and friend information, accessing avatar and world data, and more.

## Installation

To install the VRChat MCP server, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/sawa-zen/vrchat-mcp.git
   cd vrchat-mcp
   ```

2. Install the dependencies:
   ```bash
   npm install && npm run build
   ```

3. Obtain your TOTP secret:
   - Visit [VRChat Profile](https://vrchat.com/home/profile) and enable Two-factor authentication.
   - Decode the displayed QR code to get a string like `otpauth://totp/VRChat:your%40email.com?secret=XXXXXXXXXXXXXXXXXXX&issuer=VRChat`.
   - Use the `XXXXXXXXXXXXXXXXXXX` part as your TOTP secret.
   - **Note:** This method may have security concerns, so proceed with caution.

4. Set up your environment variables in a `.env` file:
   ```
   VRCHAT_USERNAME=your_username
   VRCHAT_PASSWORD=your_password
   VRCHAT_TOTP_SECRET=your_totp_secret
   VRCHAT_EMAIL=your_email
   ```

## Usage

To start the server, run the following command:

```bash
npm run start
```

This will launch the MCP server, allowing you to interact with the VRChat API through the defined tools.

## Usage with Claude Desktop

To use this MCP server with Claude Desktop, you do not need to run `npm run start`. Instead, add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vrchat-mcp": {
      "command": "[[path to node command]]",
      "args": ["[[path to cloned repository]]/dist/main.js"],
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

Replace `[[path to node command]]` with the path to your Node.js executable and `[[path to cloned repository]]` with the path where you cloned this repository.

## Supported VRChat APIs

This is a list of GET endpoints from the VRChat API that our Model Context Protocol server supports or plans to support. Check the boxes as features are implemented.

### Authentication and User Information
- [x] Get current user info (GET /auth/user)
- [ ] Search users (GET /users)
- [ ] Get specific user profile (GET /users/{userId})
- [x] Get friends list (GET /auth/user/friends)
- [ ] Get online friends (GET /auth/user/friends/active)
- [ ] Get user groups (GET /users/{userId}/groups)
- [ ] Get player moderations (GET /auth/user/playermoderated)
- [ ] Get user status (GET /users/{userId}/status)

### Avatar Related
- [ ] Get own avatars (GET /avatars)
- [ ] Get favorite avatars (GET /avatars/favorites)
- [ ] Search avatars (GET /avatars/search/{searchQuery})
- [ ] Get specific avatar details (GET /avatars/{avatarId})
- [ ] Get public avatars (GET /avatars/public)

### World Related
- [ ] Get worlds list (GET /worlds)
- [ ] Get active worlds (GET /worlds/active)
- [ ] Get recently visited worlds (GET /worlds/recent)
- [ ] Get favorite worlds (GET /worlds/favorites)
- [ ] Search worlds (GET /worlds/search/{searchQuery})
- [ ] Get specific world details (GET /worlds/{worldId})
- [ ] Get world instances (GET /worlds/{worldId}/{instanceId})
- [ ] Get public worlds (GET /worlds/public)

### Instance Related
- [ ] Get instance info (GET /instances/{worldId}:{instanceId})
- [ ] Get instance attendees (GET /instances/{worldId}:{instanceId}/join)
- [ ] Get instance short name (GET /instances/{worldId}:{instanceId}/shortName)

### File Related
- [ ] Get file info (GET /file/{fileId})
- [ ] Get file download info (GET /file/{fileId}/download)
- [ ] Get file status (GET /file/{fileId}/status)

### Group Related
- [ ] Get groups list (GET /groups)
- [ ] Get specific group info (GET /groups/{groupId})
- [ ] Get group members (GET /groups/{groupId}/members)
- [ ] Get group permissions (GET /groups/{groupId}/permissions)
- [ ] Get group requests (GET /groups/{groupId}/requests)
- [ ] Get group invites (GET /groups/{groupId}/invites)
- [ ] Get group bans (GET /groups/{groupId}/bans)
- [ ] Get group galleries (GET /groups/{groupId}/galleries)
- [ ] Get group owned worlds (GET /groups/{groupId}/worlds)

### Notification Related
- [ ] Get notifications list (GET /auth/user/notifications)
- [ ] Get friend requests (GET /user/friendRequests)
- [ ] Get unread notification count (GET /auth/user/notifications/unreadCount)

### Inventory Related
- [ ] Get license types (GET /licenses)
- [ ] Get owned licenses (GET /licenses/own)
- [ ] Get stores list (GET /stores)

### System Related
- [ ] Get API configuration (GET /config)
- [ ] Get API limits (GET /auth/limits)
- [ ] Check system health (GET /health)
- [ ] Get online users count (GET /visits)
- [ ] Get server announcements (GET /announcements)

### Others
- [ ] Get tags list (GET /tags)
- [ ] Get favorite info (GET /favorite)
- [ ] Get invisibles list (GET /auth/user/invisibles)
- [ ] Get moderations (GET /auth/user/moderations)
- [ ] Get favorite groups (GET /favorite/groups)
- [ ] Get favorite group types (GET /favorite/group/types)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
