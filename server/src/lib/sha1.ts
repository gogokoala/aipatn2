import * as crypto from "crypto"

export function sha1 (message: string) {
    return crypto.createHash('sha1').update(message, 'utf8').digest('hex')
}
