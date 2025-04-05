import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createFavoritesTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    'vrchat_list_favorite_groups',
    'Returns a list of favorite groups owned by a user.',
    {
      n: z.number().min(1).max(100).optional().default(60)
        .describe('Number of favorite groups to return (1-100). Default is 60.'),
      offset: z.number().min(0).optional()
        .describe('Skip this many favorite groups before beginning to return results.'),
      ownerId: z.string().optional()
        .describe('Filter by owner ID. If not provided, returns current user\'s favorite groups.'),
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
      n: z.number().min(1).max(100).optional().default(60)
        .describe('Number of favorites to return (1-100). Default is 60.'),
      offset: z.number().min(0).optional()
        .describe('Skip this many favorites before beginning to return results.'),
      type: z.string().optional()
        .describe('Filter by favorite type ("world", "friend", or "avatar").'),
      tag: z.string().optional()
        .describe('Filter by tag (e.g., "group_0", "group_1").'),
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

  server.tool(
    'vrchat_add_favorite',
    'Add a new favorite.',
    {
      type: z.enum(['world', 'friend', 'avatar'])
        .describe('FavoriteType. Default: friend, Allowed: world | friend | avatar'),
      favoriteId: z.string().min(1)
        .describe('Must be either AvatarID, WorldID or UserID'),
      tags: z.array(z.string().min(1)).min(1)
        .describe('Tags indicate which group this favorite belongs to. Adding multiple groups makes it show up in all. Removing it from one in that case removes it from all.'),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const favorite = await vrchatClient.favoritesApi.addFavorite({
          type: params.type,
          favoriteId: params.favoriteId,
          tags: params.tags,
        })
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(favorite.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to add favorite: ' + error
          }]
        }
      }
    }
  )
}
