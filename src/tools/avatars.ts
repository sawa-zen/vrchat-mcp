import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createAvatarsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_search_avatars',
    // Description
    'Search and list avatars by query filters. You can only search your own or featured avatars. It is not possible as a normal user to search other people\'s avatars.',
    {
      featured: z.boolean().optional(),
      sort: z.enum(['popularity', 'heat', 'trust', 'shuffle', 'random', 'favorites', 'reportScore', 'reportCount', 'publicationDate', 'labsPublicationDate', 'created', '_created_at', 'updated', '_updated_at', 'order', 'relevance', 'magic', 'name']).optional(),
      user: z.enum(['me']).optional(),
      userId: z.string().optional(),
      n: z.number().min(1).max(100).optional(),
      order: z.enum(['ascending', 'descending']).optional(),
      offset: z.number().min(0).optional(),
      tag: z.string().optional(),
      notag: z.string().optional(),
      releaseStatus: z.enum(['public', 'private', 'hidden', 'all']).optional(),
      maxUnityVersion: z.string().optional(),
      minUnityVersion: z.string().optional(),
      platform: z.string().optional(),
    },
    async (params) => {
      try {
        const avatars = await vrchatClient.avatarApi.searchAvatars(
          params.featured,
          params.sort,
          params.user,
          params.userId,
          params.n,
          params.order,
          params.offset,
          params.tag,
          params.notag,
          params.releaseStatus,
          params.maxUnityVersion,
          params.minUnityVersion,
          params.platform
        )
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(avatars, null, 2)
          }]
        }
      } catch (error) {
        throw new Error('Failed to search avatars: ' + error)
      }
    }
  )
}
