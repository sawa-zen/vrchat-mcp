# VRChat MCP(Model Context Protocol)

![eyecatch](./eyecatch.jpg)

This project is a Model Context Protocol (MCP) server for interacting with the VRChat API. It allows you to retrieve various information from VRChat using a standardized protocol.

<a href="https://glama.ai/mcp/servers/u763zoyi5a">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/u763zoyi5a/badge" />
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

To use this MCP server with Claude Desktop, you do not need to run `npx vrchat-mcp` manually. Instead, add the following configuration to your `claude_desktop_config.json`:

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

## Supported VRChat APIs

This is a list of GET endpoints from the VRChat API that our Model Context Protocol server supports or plans to support. Check the boxes as features are implemented.

### Authentication and User Information
- [x] Get current user info
- [ ] Search users
- [ ] Get specific user profile
- [x] Get friends list
- [ ] Get online friends
- [ ] Get user groups
- [ ] Get player moderations
- [ ] Get user status

### Avatar Related
- [ ] Get own avatars
- [ ] Get favorite avatars
- [x] Search avatars
- [ ] Get specific avatar details
- [ ] Get public avatars

### World Related
- [ ] Get worlds list
- [ ] Get active worlds
- [ ] Get recently visited worlds
- [ ] Get favorite worlds
- [ ] Search worlds
- [ ] Get specific world details
- [ ] Get world instances
- [ ] Get public worlds

### Instance Related
- [ ] Get instance info
- [ ] Get instance attendees
- [ ] Get instance short name

### File Related
- [ ] Get file info
- [ ] Get file download info
- [ ] Get file status

### Group Related
- [ ] Get groups list
- [ ] Get specific group info
- [ ] Get group members
- [ ] Get group permissions
- [ ] Get group requests
- [ ] Get group invites
- [ ] Get group bans
- [ ] Get group galleries
- [ ] Get group owned worlds

### Notification Related
- [ ] Get notifications list
- [ ] Get friend requests
- [ ] Get unread notification count

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

### Others
- [ ] Get tags list
- [ ] Get favorite info
- [ ] Get invisibles list
- [ ] Get moderations
- [ ] Get favorite groups
- [ ] Get favorite group types

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
