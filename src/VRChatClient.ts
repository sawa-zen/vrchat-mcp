import axios from 'axios'
import { Configuration, AuthenticationApi, FriendsApi, AvatarsApi, WorldsApi } from 'vrchat'
import { authenticator } from 'otplib'

interface Arguments {
  username: string;
  password: string;
  potpSecret: string;
  email: string;
}

export class VRChatClient {
  authApi: AuthenticationApi
  friendsApi: FriendsApi
  avatarApi: AvatarsApi
  worldsApi: WorldsApi
  constructor({ username, password, potpSecret, email }: Arguments) {
    this._axiosConfiguration = axios.create({
      headers: { 'User-Agent': `vrc-mcp/0.10 ${email}` },
    })
    this._vrchatConfiguration = new Configuration({ username, password })
    this._totpSecret = potpSecret

    this.authApi = new AuthenticationApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.friendsApi = new FriendsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.avatarApi = new AvatarsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    this.worldsApi = new WorldsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
  }

  async auth() {
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
  }

  // Private
  private _totpSecret: string
  private _axiosConfiguration
  private _vrchatConfiguration

  private async _verify2FA() {
    const totpCode = authenticator.generate(this._totpSecret)
    const response = await this.authApi.verify2FA({ code: totpCode })
    if (!response.data.verified) {
      throw new Error('2FA verification failed')
    }
    return response.data
  }
}
