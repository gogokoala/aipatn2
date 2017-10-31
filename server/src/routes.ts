import * as Router from 'koa-router'

import { getSessionId } from './controller/session-id'
import { ping } from './controller/ping'
import { getVerificationCode } from './controller/vcode'
import { login } from './controller/login'
import { register } from './controller/register'
import { search as sf1 } from './controller/cnipr/sf1'


/**
 * All application routes.
 */
export const router = new Router()

router.get('/public/ping', ping)

router.get('/public/sid', getSessionId)

router.get('/public/vcode', getVerificationCode)

router.post('/public/register', register)

router.post('/public/login', login)

router.post('/api/sf1', sf1)

