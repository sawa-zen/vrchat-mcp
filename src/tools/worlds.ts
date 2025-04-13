import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createWorldsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_list_favorited_worlds',
    // Description
    'List favorited worlds by query filters.',
    {
      featured: z.boolean().optional().describe('Filters on featured results'),
      sort: z.enum(['popularity', 'heat', 'trust', 'shuffle', 'random', 'favorites', 'reportScore', 'reportCount', 'publicationDate', 'labsPublicationDate', 'created', '_created_at', 'updated', '_updated_at', 'order', 'relevance', 'magic', 'name']).optional().describe('The sort order of the results'),
      n: z.number().min(1).max(100).optional().describe('The number of objects to return, min 1, max 100'),
      order: z.enum(['ascending', 'descending']).optional().describe('Sort results in ascending or descending order'),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const worlds = await vrchatClient.worldsApi.getFavoritedWorlds(
          params.featured,
          params.sort,
          params.n,
          params.order,
        )
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(worlds.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to get favorited worlds: ' + error
          }]
        }
      }
    }
  )

  server.tool(
    // Name
    'vrchat_search_worlds',
    // Description
    'Search and list worlds by query filters.',
    {
      featured: z.boolean().optional().describe('Return featured worlds only'),
      sort: z.enum(['popularity', 'heat', 'trust', 'shuffle', 'random', 'favorites', 'reportScore', 'reportCount', 'publicationDate', 'labsPublicationDate', 'created', '_created_at', 'updated', '_updated_at', 'order', 'relevance', 'magic', 'name']).optional().describe('Sort worlds by a specific criteria'),
      user: z.enum(['me']).optional().describe('Filter by the specified user, currently only supports "me" to see your own worlds'),
      userId: z.string().optional().describe('Filter worlds by a specific VRChat user ID'),
      n: z.number().min(1).max(100).optional().describe('Number of worlds to return, from 1 to 100'),
      order: z.enum(['ascending', 'descending']).optional().describe('Sort results in ascending or descending order'),
      offset: z.number().min(0).optional().describe('Offset for pagination, minimum 0'),
      search: z.string().optional().describe('Search worlds by name or other text fields'),
      tag: z.string().optional().describe('Filter worlds by a specific tag'),
      notag: z.string().optional().describe('Exclude worlds with a specific tag'),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const worlds = await vrchatClient.worldsApi.searchWorlds(
          params.featured,
          params.sort,
          params.user,
          params.userId,
          params.n,
          params.order,
          params.offset,
          params.search,
          params.tag,
          params.notag,
        )
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(worlds.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to search worlds: ' + error
          }]
        }
      }
    }
  )
}
