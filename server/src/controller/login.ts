import { Context } from 'koa'
import { redisStore } from '../middleware/redisstore'
import * as moment from 'moment'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'
import * as Debug from 'debug'
import { getManager } from "typeorm"
import { User } from "../entity/user"

const debug = Debug('aipatn.register')
const jwtSecret = config.get<string>('jwtSecret')

/**
 * Middleware login
 * headers => x-session-id
 * body => phone, vcode
 */
export async function login (ctx: Context, next: Function) {
    const req = ctx.request;
    const user = req.body;
    debug('req.body: %o', req.body)
    
    if (!user || !user.phone || !user.vcode) {
        throw new Error('无效的请求')
    }
    let session = ctx.state.session
    if (!session.user || !session.user.name || user.phone != session.user.name) {
        throw new Error('手机号错误')
    }
    if (!session.user.logged) {
        if (!session.verificationCode || !session.verificationCode.code || !session.verificationCode.expireAt) {
            throw new Error('请获取验证码')
        }
        if (user.vcode != session.verificationCode.code) {
            throw new Error('验证码不正确')
        }
        if (moment().valueOf() >= session.verificationCode.expireAt) {
            throw new Error('验证码已过期')
        }
    }

    // 验证用户
    const usrRepository = getManager().getRepository(User)
    let vo = await usrRepository.findOne({ mobilePhone: user.phone })
    
    if (!vo) {
        throw new Error('用户未注册')
    }

    if (vo.state !== 'active') {
        throw new Error('您的用户因某些原因被锁定！请联系管理员恢复。')
    }

    // jwt
    let jwtToken
    if (session.user.jwt) {
        jwtToken = session.user.jwt
    } else {
        jwtToken = vo.jwt
    }
    if (jwtToken) {
        // 校验jwt
        try {
            const jwtDecoded = jwt.verify(jwtToken, jwtSecret);
            debug('jwt decoded: %o', jwtDecoded)
        } catch(err) {
            jwtToken = ''
        }
    }
    
    if (!jwtToken) {
        // jwt授权, 有效期2天
        const issuedAt = moment().valueOf()
        const expireAt = moment().add('d', 2).valueOf()
        const jwtToken = await jwt.sign({ 
            iss: user.phone,
            iat: issuedAt,
            exp: expireAt
        }, jwtSecret)
    }
    vo.jwt = jwtToken
    session.user.jwt = jwtToken

    // 更新用户信息
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    vo.lastLoginTime = now

    vo = await usrRepository.save(vo)

    // 更新Session
    session.verificationCode = null

    // TODO - 更新日志
    
    ctx.state.data = { status: 0, message: "登录成功", jwt: jwtToken }
}