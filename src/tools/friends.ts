import { McpServer } from "@modelcontextprotocol/sdk/server/mcp"
import { VRChatClient } from "../VRChatClient"

export const createFriendsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool("get_vrchat_friends",
    "Retrieve a list of VRChat friend information",
    {}, // No parameters
    async () => {
      try {
        const friends = await vrchatClient.getFriends()
        return {
          content: [{
            type: "text",
            text: JSON.stringify(friends, null, 2)
          }]
        }
      } catch (error) {
        throw new Error('Failed to retrieve friends: ' + error)
      }
    }
  )
}