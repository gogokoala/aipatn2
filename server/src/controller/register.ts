import { Context } from 'koa'
import { redisStore } from '../middleware/redisstore'
import * as Debug from 'debug'
import { getManager } from "typeorm";
import { User } from "../entity/user";
import * as moment from 'moment'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

const debug = Debug('aipatn.register')
const jwtSecret = config.get<string>('jwtSecret')


/**
 * Middleware register
 */
export async function register (ctx: Context, next: Function) {
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

    if (!session.verificationCode || !session.verificationCode.code || !session.verificationCode.expireAt) {
        throw new Error('请获取验证码')
    }
    if (user.vcode != session.verificationCode.code) {
        throw new Error('验证码不正确')
    }
    if (moment().valueOf() >= session.verificationCode.expireAt) {
        throw new Error('验证码已过期')
    }

    const usrRepository = getManager().getRepository(User)
    let vo = await usrRepository.findOne({ mobilePhone: user.phone })
    
    if (vo) {
        throw new Error('该手机号已注册')
    }
    
    // 生成注册用户信息
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    vo = new User()
    vo.username = user.phone
    vo.password = '000000'
    vo.mobilePhone = user.phone
    vo.email = ''
    vo.emailVerified = false
    vo.createTime = now
    vo.lastLoginTime = now
    vo.state = 'active'

    // 创建用户
    vo = await usrRepository.save(vo)

    // TODO - 更新日志

    session.verificationCode = null
    session.user.logged = true
    ctx.state.session = session

    ctx.state.data = { status: 0, message: "恭喜您！注册成功" }
}