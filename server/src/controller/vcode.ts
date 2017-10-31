/**
 * 验证码获取
 * TODO - 如何防止恶意刷验证码
 */
import { Context } from 'koa'
import { create } from 'random-seed'
import * as uuidv4 from 'uuid/v4'
import * as config from 'config'
import { sha1 } from '../lib/sha1'
import * as moment from 'moment'
import { redisStore } from '../middleware/redisstore'
import { smsService } from '../lib/sms'

import * as Debug from 'debug'
const debug = Debug('aipatn.vcode')

const seed = uuidv4()
const rand = create(seed)
const mobileReg = /^1[0-9]{10}$/ 

const jwtSecret = config.get<string>('jwtSecret')

/**
 * 生成验证码并发送短信通知
 */
export async function getVerificationCode (ctx: Context, next: Function) {
    const req = ctx.request;
    const query = req.query;
    // 验证手机号
    if (!query || !query.phone || !mobileReg.test(query.phone)) {
        throw new Error('无效的请求')
    }
    const phone = query.phone
    
    // 生成验证码
    const vcode = rand.intBetween(100000, 999999)

    debug('phone: %s, vcode: %d', phone, vcode)
/*
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers[''];
    if (!token) {
        const issuedAt = moment().valueOf()
        const expires = moment().add('m', 10).valueOf()
        token = jwt.sign({ 
            iss: phone,
            iat: issuedAt,
            exp: expires
        }, jwtSecret)
    } else {
        jwt.verify(token, jwtSecret, function(err: Error, decoded: object) {
            if (err instanceof TokenExpiredError) {
                throw err
            } else {

            }
            debug('jwt decoded: %o', decoded)
        })
    }
*/

    // 维护Session
//    const issueAt = moment().valueOf()
    const expireAt = moment().add(10, 'm').valueOf()
    let session = ctx.state.session
    if (session.user) {
        session.user.name = phone
    } else {
        session.user = { name: phone }
    }
    session.verificationCode = { code: vcode, expireAt }
    ctx.state.session = session

    // 发送短信
    if (!debug.enabled) {
        const message = `您的验证码是${vcode}`
        await smsService.send(phone, message)
    }

    ctx.state.data = { status: 0, message: "ok" }
}