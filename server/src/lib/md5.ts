import * as crypto from "crypto"

export function md5 (message: string) {
    return crypto.createHash('md5').update(message, 'utf8').digest('hex')
}