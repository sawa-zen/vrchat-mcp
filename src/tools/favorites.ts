import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createFavoritesTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    'vrchat_list_favorite_groups',
    'Returns a list of favorite groups owned by a user.',
    {
      n: z.number().min(1).max(100).optional().default(60),
      offset: z.number().min(0).optional(),
      ownerId: z.string().optional(),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const favorites = await vrchatClient.favoritesApi.getFavoriteGroups(
          params.n,
          params.offset,
          params.ownerId,
        )
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(favorites.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to list favorite groups: ' + error
          }]
        }
      }
    }
  )

  server.tool(
    // Name
    'vrchat_list_favorites',
    // Description
    'Returns a list of favorites.',
    {
      n: z.number().min(1).max(100).optional().default(60),
      offset: z.number().min(0).optional(),
      type: z.string().optional(),
      tag: z.string().optional(),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const favorites = await vrchatClient.favoritesApi.getFavorites(
          params.n,
          params.offset,
          params.type,
          params.tag,
        )
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(favorites.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to list favorites: ' + error
          }]
        }
      }
    }
  )
}
