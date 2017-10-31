import { Context } from 'koa'

import * as Debug from 'debug'
const debug = Debug('aipatn.vcode')

/**
 * Middleware ping
 */
export async function ping (ctx: Context, next: Function) {

    ctx.state.data = { status: 0, message: "pong" }
}