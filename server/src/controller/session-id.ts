import { Context } from 'koa'

/**
 * 获取SessionID
 */
export async function getSessionId(ctx: Context, next: Function) {
    // if is an empty object
    if(ctx.state.session instanceof Object && !Object.keys(ctx.state.session).length) {
        ctx.state.session.user = { name: 'anonymous' }
    }

    ctx.state.data = { status: 0, message: "ok" }
}