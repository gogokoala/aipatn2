import http from 'axios'
import * as config from 'config'
import { md5 } from '../lib/md5'

import * as Debug from 'debug'
const debug = Debug('sms')

class SMS {

    private url: string
    private user: string
    private subcode: string
    private password: string
        
    constructor() {
        this.url = config.get<string>('sms.url')
        this.user = config.get<string>('sms.user')
        this.subcode = config.get<string>('sms.subcode')
        this.password = md5(config.get<string>('sms.pass'))
    }

    async send(phone: string, message: string) {
        debug('request: %o', { phone, message })
        let res = await http({
            url: this.url,
            method: 'GET',
            params: {
                sdk: this.user,
                code: this.password,
                pwdtype: 'md5',
                phones: phone,
                msg: message,
                encode: 'UTF-8',
                resulttype: 'xml',
                subcode: this.subcode
            }
        })
    
        res = res.data
        debug('sms send result: %o', res)
            
        return res
    }
    
}

export const smsService = new SMS()