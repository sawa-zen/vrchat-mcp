import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createFriendsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_get_friends_list',
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
    {
      offset: z.number().min(0).optional(),
      n: z.number().min(1).max(100).optional(),
      offline: z.boolean().optional(),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.friendsApi.getFriends(
          params.offset || 0,
          params.n || 10,
          params.offline || false,
        )
        const friends = response.data
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(friends, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to retrieve friends: ' + error
          }]
        }
      }
    }
  )
}
