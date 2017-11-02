import { getManager } from "typeorm"
import { OAuth2 } from "../../entity/oauth2"
import * as moment from 'moment'
import Axios from 'axios'
import * as config from 'config'

import * as Debug from 'debug'
const debug = Debug('cnipr.auth')

class OAuth2Config {
    clientId: string
    clientSecret: string
    redirectUri: string
    refreshToken: string
    openId: string
    openKey: string

    constructor() { 
        this.clientId = config.get('oauth2.clientId')
        this.clientSecret = config.get('oauth2.clientSecret')
        this.redirectUri = config.get('oauth2.redirectUri')
        this.refreshToken = config.get('oauth2.refreshToken')
        this.openId = config.get('oauth2.openId')
        this.openKey = config.get('oauth2.openKey')
    }
}

class OAuth2Response {
    status: number
    message: string
    expires_in: number
    refresh_token: string
    access_token: string
}

class OAuth2Instance {

    private options: OAuth2Config
    private oauth2: OAuth2
    private csfrState: string
    
    constructor() {
        this.options = new OAuth2Config()
        this.csfrState = this.options.clientId
    }
    
    /**
     * 
     * @param clientId 获取OAuth2 Access Token信息
     */
    async getOAuth2Info(clientId: string) {
        const oauth2Repository = getManager().getRepository(OAuth2)
        let vo = await oauth2Repository.findOne({ clientId })
        if (vo) {
            return vo
        } else {
            const now = moment().format('YYYY-MM-DD HH:mm:ss')
            vo = new OAuth2()
            vo.clientId = clientId
            vo.accessToken = ''
            vo.expiresIn = 0
            vo.createTime = now
            vo.lastRefreshTime = now

            return await oauth2Repository.save(vo)
        }
    }

    /**
     * 检查Cnipr Access Token是否有效
     */
    async updateAccessToken() {
        if (!this.oauth2) {
            this.oauth2 = await this.getOAuth2Info(this.options.clientId)
        }

        const token = this.oauth2
        debug('access_token = %o', token)
        if (token.accessToken && token.expiresIn > 0) {
            // 校验access_token有效性
            //  access_token的过期时长，单位ms,缺省24小时 
            const expires = token.expiresIn ? token.expiresIn * 1000 : 86400 * 1000
            // access_token有效期少于1天时，即自动更新
            const remaining = expires - (moment().valueOf() - moment(token.lastRefreshTime, 'YYYY-MM-DD HH:mm:ss').valueOf()) - 86400 * 1000
            if (remaining <= 0) {
                // 过期
                debug('access_token expired. remaining = %d', remaining)
            } else {
                // 正常
                debug('access_token is ok. remaining = %d', remaining)
                return
            }
        }

        const authResp = await this.refreshAccessToken()

        token.accessToken = authResp.access_token
        token.expiresIn = authResp.expires_in
        token.lastRefreshTime = moment().format('YYYY-MM-DD HH:mm:ss')

        const oauth2Repository = getManager().getRepository(OAuth2)
        this.oauth2 = await oauth2Repository.save(token)
    }

    /**
     * 使用Refresh Token 刷新 Access Token
     * {"status":0,
     * "message":"SUCCESS",
     * "expires_in":2592000,
     * "refresh_token":"...",
     * "access_token":"..."}
     * 
     */
    async refreshAccessToken() {
        const clientId = this.options.clientId
        const clientSecret = this.options.clientSecret
        const redirectUri = encodeURI(this.options.redirectUri)
        const refreshToken = this.options.refreshToken
        const state = this.csfrState
        const url = 'https://open.cnipr.com/oauth2/access_token'

        let res = await Axios.get(
            url,
            {
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri,
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    state: state
                }
            }
        )

        const authResp: OAuth2Response = res.data
        debug('refreshAccessToken: %o', authResp)
        if (authResp.status) {
            debug('refresh access_token: %s', authResp)
            throw new Error(`${authResp.status} - ${authResp.message}`)
        } else {
            return authResp
        }
    }

    getApiParams() {
        return { 
            clientId: this.options.clientId, 
            openId: this.options.openId, 
            accessToken: this.oauth2.accessToken
        }
    }
}


export const oauth2 = new OAuth2Instance()