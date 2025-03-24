import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'

export const createUsersTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    'vrchat_get_current_user',
    'Retrieve your own VRChat user information',
    {}, // No parameters
    async () => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.authApi.getCurrentUser()
        const user = response.data
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(user, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to retrieve user: ' + error
          }]
        }
      }
    }
  )
}
