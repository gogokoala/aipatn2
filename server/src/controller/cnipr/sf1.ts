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

    const searchParams = req.body
    if (!searchParams || !searchParams.exp) {
        throw new Error('无效的请求')
    }
    /**
     * 下列参加中
     * exp 必选
     * dbs、order等 可选
     */
    const exp = searchParams.exp
    const dbs = searchParams.dbs ? searchParams.dbs : 'FMZL,FMSQ,SYXX,WGZL'
    const order = searchParams.order ? searchParams.order : ''
    const option = searchParams.option && parseInt(searchParams.option) < 3  ? searchParams.option : 2
    const from = searchParams.from && !isNaN(searchParams.from) ? searchParams.from : 0
    const to = searchParams.to && !isNaN(searchParams.to) ? searchParams.to : 10
    const displayCols = searchParams.displayCols ? searchParams.displayCols : ''

    const params = oauth2.getApiParams()
    const clientId = params.clientId
    const url = 'https://open.cnipr.com/cnipr-api/rs/api/search/sf1/' + clientId
    const openId = params.openId
    const accessToken = params.accessToken

    debug('exp = %s, dbs = %s', exp, dbs)
    let res = await Axios({
        url: url,
        method: 'post',
        params:{
            exp: exp,
            dbs: dbs,
            order: order,
            option: option,
            from: from,
            to: to,
            displayCols: displayCols,
            openid: openId,
            access_token: accessToken
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const sf1Resp: sf1Response = res.data
    debug('search result = %o', sf1Resp)
    if (parseInt(sf1Resp.status)) {
        throw new Error(`${sf1Resp.status} - ${sf1Resp.message}`)
    }

    // TODO - 检索条件保存至Session
    // TODO- 检索条件保存至数据库

    
    ctx.state.data = sf1Resp
}
