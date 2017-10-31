import { Context } from 'koa'
import Axios from 'axios'
import { redisStore } from '../../middleware/redisstore'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import { sf1Data, sf1Response, sectionInfo } from './cnipr'
import * as Debug from 'debug'

const debug = Debug('cnipr.sf1')

/**
 * Middleware sf1
 * headers => x-session-id, auth
 * body => exp, dbs, order, option, from, to, displayCols
 */
export async function search (ctx: Context, next: Function) {
    const req = ctx.request;
    debug('req.body: %o', req.body)

    const {
        exp,
        dbs,
        order,
        option,
        from,
        to,
        displayCols
    } = req.body

    // 检查 querystring
    if ([exp, dbs, order, option, from, to].some(v => !v)) {
        throw new Error('无效的访问参数')
    }

    const params = oauth2.getApiParams()
    const clientId = params.clientId
    const url = 'https://open.cnipr.com/cnipr-api/rs/api/search/sf1/' + clientId
    const openId = params.openId
    const accessToken = params.accessToken

    let res = await Axios.post(url,
        {
            exp: exp,
            dbs: dbs,
            order: order,
            option: option,
            from: from,
            to: to,
            displayCols: displayCols,
            openid: openId,
            access_token: accessToken
        }
    )

    const sf1Resp: sf1Response = res.data
    debug('search result = %o', sf1Resp)
    if (sf1Resp.status) {
        throw new Error(`${sf1Resp.status} - ${sf1Resp.message}`)
    }

    // TODO - 更新日志
    
    ctx.state.data = sf1Resp
}
