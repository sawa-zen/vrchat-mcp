import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { VRChatClient } from '../VRChatClient'
import { z } from 'zod'

export const createInvitesTools = (server: McpServer, vrchatClient: VRChatClient) => {
  server.tool(
    // Name
    'vrchat_list_invite_messages',
    // Description
    'Returns a list of all the users Invite Messages. Admin Credentials are required to view messages of other users!',
    {
      userId: z.string().min(1).describe('Must be a valid user ID'),
      messageType: z.enum(['message', 'response', 'request', 'requestResponse']).describe('The type of message to fetch')
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.inviteApi.getInviteMessages(params.userId, params.messageType)
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
            text: 'Failed to get invite messages: ' + error
          }]
        }
      }
    }
  )

  server.tool(
    // Name
    'vrchat_request_invite',
    // Description
    'Request an invite from a user. IMPORTANT: Always obtain explicit permission from the user before sending an invite request. Note that invite requests cannot be sent to users in private instances. Returns the Notification of type requestInvite that was sent.',
    {
      userId: z.string().min(1).describe('Must be a valid user ID'),
      instanceId: z.string().describe('The instance ID to use when requesting an invite'),
      messageSlot: z.number().min(0).max(11).describe('Slot number of the Request Message to use when request an invite'),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.inviteApi.inviteUser(params.userId, {
          instanceId: params.instanceId,
          messageSlot: params.messageSlot,
        })
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
            text: 'Failed to request invite: ' + error
          }]
        }
      }
    }
  )

  server.tool(
    // Name
    'vrchat_get_invite_message',
    // Description
    `Returns a specific invite message. Admin Credentials are required to view messages of other users!

    Message type refers to a different collection of messages:
    - message = Message during a normal invite
    - response = Message when replying to a message
    - request = Message when requesting an invite
    - requestResponse = Message when replying to a request for invite
    `,
    {
      userId: z.string().min(1).describe(
        'Must be a valid user ID.'
      ),
      messageType: z.enum(['message', 'response', 'request', 'requestResponse']).default('message').describe(
        'The type of message to fetch. Must be a valid InviteMessageType.'
      ),
      slot: z.number().min(0).max(11).describe(
        'Slot number of the message to fetch.'
      ),
    },
    async (params) => {
      try {
        await vrchatClient.auth()
        const response = await vrchatClient.inviteApi.getInviteMessage(
          params.userId,
          params.messageType,
          params.slot
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
            text: 'Failed to retrieve invite message: ' + error
          }]
        }
      }
    }
  )
}
