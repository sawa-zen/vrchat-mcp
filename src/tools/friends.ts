import { McpServer } from "@modelcontextprotocol/sdk/server/mcp"
import { VRChatClient } from "../VRChatClient"

export const createFriendsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    "vrchat_get_friends",
    // Description
    `Retrieve a list of VRChat friend information. The following information can be retrieved:
    - "bio"
    - "bioLinks"
    - "currentAvatarImageUrl"
    - "currentAvatarThumbnailImageUrl"
    - "currentAvatarTags"
    - "developerType"
    - "displayName"
    - "fallbackAvatar"
    - "id"
    - "isFriend"
    - "last_platform"
    - "last_login"
    - "profilePicOverride"
    - "pronouns"
    - "status"
    - "statusDescription"
    - "tags"
    - "userIcon"
    - "location"
    - "friendKey"`,
    {}, // No parameters
    async () => {
      try {
        const response = await vrchatClient.friendsApi.getFriends(0, undefined, true)
        const friends = response.data
        return {
          content: [{
            type: "text",
            text: JSON.stringify(friends, null, 2)
          }]
        }
      } catch (error) {
        throw new Error('Failed to retrieve friends: ' + error)
      }
    }
  )
}
