import axios from 'axios'
import { Configuration, AuthenticationApi, FriendsApi, AvatarsApi, WorldsApi, InstancesApi, GroupsApi, FavoritesApi, InviteApi, NotificationsApi } from 'vrchat'
import { authenticator } from 'otplib'

interface Arguments {
  username: string;
  password?: string;
  potpSecret?: string;
  authToken?: string;
}

export class VRChatClient {
  authApi: AuthenticationApi
  friendsApi: FriendsApi
  avatarApi: AvatarsApi
  worldsApi: WorldsApi
  instancesApi: InstancesApi
  groupsApi: GroupsApi
  favoritesApi: FavoritesApi
  inviteApi: InviteApi
  notificationsApi: NotificationsApi
  constructor({ username, password, potpSecret, authToken }: Arguments) {
    this._axiosConfiguration = axios.create({
      headers: {
        'User-Agent': `vrc-mcp/0.15.0 ${username}`,
        ...(authToken ? {
          'Cookie': `auth=${authToken}`
        } : {})
      },
    })
    if (authToken) this._authed = true

    this._vrchatConfiguration = new Configuration({ username, password })
    this._totpSecret = potpSecret

    this.authApi = new AuthenticationApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.friendsApi = new FriendsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.avatarApi = new AvatarsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.worldsApi = new WorldsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.instancesApi = new InstancesApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.groupsApi = new GroupsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.favoritesApi = new FavoritesApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.inviteApi = new InviteApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.notificationsApi = new NotificationsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
  }

  async auth() {
    if (this._authed) return

    // Log in using ID and password
    try {
      await this.authApi.getCurrentUser()
    } catch (error) {
      throw new Error('Failed to get current user: ' + error)
    }

    // 2FA authentication
    try {
      await this._verify2FA()
    } catch (error) {
      throw new Error('2FA verification failed: ' + error)
    }

    this._authed = true
  }

  // Private
  private _totpSecret?: string
  private _axiosConfiguration
  private _vrchatConfiguration
  private _authed = false

  private async _verify2FA() {
    if (!this._totpSecret) {
      throw new Error('2FA secret not provided')
    }
    const totpCode = authenticator.generate(this._totpSecret)
    const response = await this.authApi.verify2FA({ code: totpCode })
    if (!response.data.verified) {
      throw new Error('2FA verification failed')
    }
    return response.data
  }
}
