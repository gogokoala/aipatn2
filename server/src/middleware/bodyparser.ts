import * as koaBodyParser from 'koa-bodyparser'
import { Context } from 'koa'
/**
 * 这里做一个兼容
 * 由于微信方面客服接口 post 过来的数据是 JSON
 * 但是 header 里的 Content-Type 却错误标记为 text/xml
 * 这里对所有 Content-Type 为 text/xml 的用 JSON 解析
 * 如果你在消息推送后台配置的是 xml，请直接将 detectJSON 设置为空
 */
export function bodyParser (opts = {}) {
    const options = Object.assign({}, {
        detectJSON (ctx: Context) {
            if (ctx.request.type === 'text/xml') {
                return true
            } else {
                return false
            }
        }
    }, opts)

    return koaBodyParser(options)
}
