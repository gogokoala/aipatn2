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

router.get('/ping', ping)

router.get('/sid', getSessionId)

router.get('/vcode', getVerificationCode)

router.post('/register', register)

router.post('/login', login)

router.post('/sf1', sf1)

