import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createWorldsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_search_worlds',
    // Description
    'Search and list worlds by query filters.',
    {
      featured: z.boolean().optional(),
      sort: z.enum(['popularity', 'heat', 'trust', 'shuffle', 'random', 'favorites', 'reportScore', 'reportCount', 'publicationDate', 'labsPublicationDate', 'created', '_created_at', 'updated', '_updated_at', 'order', 'relevance', 'magic', 'name']).optional(),
      user: z.enum(['me']).optional(),
      userId: z.string().optional(),
      n: z.number().min(1).max(100).optional(),
      order: z.enum(['ascending', 'descending']).optional(),
      offset: z.number().min(0).optional(),
      search: z.string().optional(),
      tag: z.string().optional(),
      notag: z.string().optional(),
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
