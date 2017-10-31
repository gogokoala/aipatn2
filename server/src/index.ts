import "reflect-metadata"
import { createConnection } from "typeorm"
import * as Koa from 'koa'
import { bodyParser } from './middleware/bodyparser'
import { response } from './middleware/response'
import { session } from './middleware/session'
import { router } from './routes'
import * as config from 'config'
import * as Debug from 'debug'
import * as jwtKoa from 'koa-jwt'
import { oauth2 } from './controller/cnipr/auth'

const debug = Debug('aipatn.server')

config.util.loadFileConfigs('./config')
const port = config.get('port')

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection().then(async connection => {

    await oauth2.updateAccessToken()

    // 间隔15m检查Cnipr AccessToken一次
    setInterval(async () => {
        await oauth2.updateAccessToken()
    } , 15 * 60 * 1000)

    // create koa app
    const app = new Koa()

    // Middleware below this line is only reached if JWT token is valid
    // unless the URL starts with '/api/login, /api/register'
    const jwtSecret = config.get<string>('jwtSecret')
    app.use(jwtKoa({ secret: jwtSecret }).unless({
        path: [/^\/public/]
    }))

    // 使用响应处理中间件
    app.use(response)

    // 解析请求体
    app.use(bodyParser())    

    // Session处理
    app.use(session())

    // 
    app.use(router.routes())
    app.use(router.allowedMethods())

    // 启动程序，监听端口
    app.listen(port, () => debug(`listening on port ${port}`))

}).catch(error => debug("TypeORM connection error: %o", error))