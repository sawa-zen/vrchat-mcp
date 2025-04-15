import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createNotificationsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_get_notifications',
    // Description
    'Retrieve a list of VRChat notifications.',
    {
      type: z.string().optional().describe(
        'Only send notifications of this type. Use "all" for all types. This parameter no longer does anything and is deprecated.'
      ),
      sent: z.boolean().optional().describe(
        'Return notifications sent by the user. Must be false or omitted.'
      ),
      hidden: z.boolean().optional().describe(
        'Whether to return hidden or non-hidden notifications. True only allowed on type "friendRequest".'
      ),
      after: z.string().optional().describe(
        'Only return notifications sent after this Date. Ignored if type is "friendRequest".'
      ),
      n: z.number().min(1).max(100).optional().describe(
        'The number of objects to return. Default: 60, Max: 100'
      ),
      offset: z.number().min(0).optional().describe(
        'A zero-based offset from the default object sorting from where to start.'
      ),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.notificationsApi.getNotifications(
          params.type,
          params.sent,
          params.hidden,
          params.after,
          params.n || 60,
          params.offset || 0,
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
            text: 'Failed to retrieve notifications: ' + error
          }]
        }
      }
    }
  )
}
