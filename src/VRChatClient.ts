import axios from 'axios'
import { Configuration, AuthenticationApi, FriendsApi } from 'vrchat'
import { authenticator } from 'otplib'
import { wrapper } from 'axios-cookiejar-support'

interface Arguments {
  username: string;
  password: string;
  potpSecret: string;
  email: string;
}

export class VRChatClient {
  constructor({ username, password, potpSecret, email }: Arguments) {
    this._axiosConfiguration = wrapper(axios.create({
      headers: { 'User-Agent': `vrc-mcp/0.10 ${email}` },
    }))

    this._vrchatConfiguration = new Configuration({ username, password })

    this._vrchatAuthApi = new AuthenticationApi(
      this._vrchatConfiguration,
      undefined,
      this._axiosConfiguration
    )

    this._totpSecret = potpSecret
  }

  async auth() {
    // Log in using ID and password
    try {
      await this.getCurrentUser()
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

  async getCurrentUser() {
    const response = await this._vrchatAuthApi.getCurrentUser()
    return response.data
  }

  async getFriends() {
    const friendApi = new FriendsApi(this._vrchatConfiguration, undefined, this._axiosConfiguration)
    const response = await friendApi.getFriends(0, undefined, true)
    return response.data
  }

  // Private
  private _totpSecret: string
  private _axiosConfiguration
  private _vrchatConfiguration
  private _vrchatAuthApi

  private async _verify2FA() {
    const totpCode = authenticator.generate(this._totpSecret)
    const response = await this._vrchatAuthApi.verify2FA({ code: totpCode });
    if (!response.data.verified) {
      throw new Error('2FA verification failed')
    }
    return response.data;
  }
}
