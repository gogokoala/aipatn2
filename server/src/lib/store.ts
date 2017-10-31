import { randomBytes } from 'crypto'
import * as uuidv4 from 'uuid/v4'

class Store {
    sessions: Map<string, string>
    __timer: Map<string, NodeJS.Timer>

    constructor() {
        this.sessions = new Map()
        this.__timer = new Map()
    }

    getID() {
        return uuidv4()
    }

    get(sid: string) {
        if (!this.sessions.has(sid)) return undefined
        // We are decoding data coming from our Store, so, we assume it was sanitized before storing
        return JSON.parse(String(this.sessions.get(sid)))
    }

    set(session: any, { sid =  this.getID(), maxAge = 3600000 } = {}) {
        // Just a demo how to use maxAge and some cleanup
        if (this.sessions.has(sid) && this.__timer.has(sid)) {
            const __timeout = this.__timer.get(sid)
            if (__timeout) clearTimeout(__timeout)
        }
        if (maxAge) {
            this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge))
        }
        try {
            this.sessions.set(sid, JSON.stringify(session))
        } catch (err) {
            console.log('Set session error:', err)
        }

        return sid
    }

    destroy(sid: string) {
        this.sessions.delete(sid)
        this.__timer.delete(sid)
    }
}

export = Store

