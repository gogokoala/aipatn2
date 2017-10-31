import { Context } from 'koa'
import { redisStore } from './redisstore'

import * as Debug from 'debug'
const debug = Debug('aipatn.session')

export function session () {
    const key = 'x-session-id'
    const store = redisStore

    return async (ctx: Context, next: Function) => {
        let id = ctx.headers[key]
        debug('x-session-id: %s', id)

        if(!id) {
            ctx.state.session = {}
        } else {
            ctx.state.session = await store.get(id, ctx)
            
            // check session must be a no-null object
            if(typeof ctx.state.session !== "object" || ctx.state.session == null) {
                ctx.state.session = {}
            }
        }
        debug('session: %o', ctx.state.session)
        
        const old = JSON.stringify(ctx.state.session)

        await next();

        // if not changed
        if(old == JSON.stringify(ctx.state.session)) return

        // if is an empty object
        if(ctx.state.session instanceof Object && !Object.keys(ctx.state.session).length) {
            ctx.state.session = null
        }

        // need clear old session
        if(id && !ctx.state.session) {
            await store.destroy(id, ctx)
            return
        }

        // set/update session
        let sid
        if (id) {
            sid = await store.set(ctx.state.session, id);
        } else {
            sid = await store.set(ctx.state.session);

            // set headers
            ctx.state.data.sid = sid
        }

    }
}