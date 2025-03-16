import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'

export const createUsersTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool('vrchat_get_current_user',
    'Retrieve your own VRChat user information',
    {}, // No parameters
    async () => {
      try {
        const user = await vrchatClient.authApi.getCurrentUser()
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(user, null, 2)
          }]
        }
      } catch (error) {
        throw new Error('Failed to retrieve current user: ' + error)
      }
    }
  )
}
