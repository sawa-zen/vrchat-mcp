import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createFriendsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_send_friend_request',
    // Description
    'Send a friend request to another user.',
    {
      userId: z.string().min(1),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.friendsApi.friend(params.userId)
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(response.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to send friend request: ' + error
          }]
        }
      }
    }
  )

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
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(response.data, null, 2)
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
