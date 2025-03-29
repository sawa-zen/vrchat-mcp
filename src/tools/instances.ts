import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createInstancesTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_get_instance',
    // Description
    'Get information about a specific instance. Note: Detailed information about instance members is only available if you are the instance owner.',
    {
      worldId: z.string().describe('Must be a valid world ID.'),
      instanceId: z.string().describe('Must be a valid instance ID.'),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const instance = await vrchatClient.instancesApi.getInstance(params.worldId, params.instanceId)
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(instance.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to get instance: ' + error
          }]
        }
      }
    }
  )

  server.tool(
    // Name
    'vrchat_create_instance',
    // Description
    'Create a new instance of a world.',
    {
      worldId: z.string(),
      type: z.enum(['public', 'hidden', 'friends', 'private', 'group']),
      region: z.enum(['us', 'use', 'eu', 'jp', 'unknown']).default('us'),
      ownerId: z.string().nullable().optional(),
      roleIds: z.array(z.string()).optional(),
      groupAccessType: z.enum(['members', 'plus', 'public']).optional(),
      queueEnabled: z.boolean().optional(),
      closedAt: z.string().optional(), // date-time format
      canRequestInvite: z.boolean().optional(),
      hardClose: z.boolean().optional(),
      inviteOnly: z.boolean().optional(),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const instance = await vrchatClient.instancesApi.createInstance({
          worldId: params.worldId,
          type: params.type,
          region: params.region,
          ownerId: params.ownerId,
          roleIds: params.roleIds,
          groupAccessType: params.groupAccessType,
          queueEnabled: params.queueEnabled,
          closedAt: params.closedAt,
          canRequestInvite: params.canRequestInvite,
          hardClose: params.hardClose,
          inviteOnly: params.inviteOnly,
        })
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(instance.data, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: 'Failed to create instance: ' + error
          }]
        }
      }
    }
  )
}
