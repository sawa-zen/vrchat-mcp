import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createGroupsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    'vrchat_search_groups',
    'Search VRChat groups by name or shortCode',
    {
      query: z.string().describe('Query to search for, can be either Group Name or Group shortCode'),
      offset: z.number().min(0).optional().describe('A zero-based offset from the default object sorting'),
      n: z.number().min(1).max(100).optional().describe('The number of objects to return')
    },
    async (args) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.groupsApi.searchGroups(
          args.query,
          args.offset,
          args.n
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
            text: 'Failed to search groups: ' + error
          }]
        }
      }
    }
  )
}
