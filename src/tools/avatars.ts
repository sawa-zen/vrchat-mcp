import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { VRChatClient } from "../VRChatClient";
import { searchAvatarsParams } from "../queryParams/avatars";

export const createAvatarsTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    "vrchat_search_avatars",
    // Description
    `Search and list avatars by query filters. You can only search your own or featured avatars. It is not possible as a normal user to search other people's avatars.`,
    searchAvatarsParams.shape,
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
            type: "text",
            text: JSON.stringify(avatars, null, 2)
          }]
        };
      } catch (error) {
        throw new Error('Failed to search avatars: ' + error);
      }
    }
  );
}
