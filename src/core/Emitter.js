export class Emitter {
    constructor() {
        this.listeners = {}
    }
    // dispatch, fire, trigger
    // Notice listeners if they are exist
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }
    // on, listen
    // Subscribe on notifications
    // Add new listener
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event]
                .filter(
                    listener => listener !== fn
                )
        }
    }
 }
// Example
// emitter.subscribe('Roman', data => console.log('Sub: ', data))
// emitter.emit('Roman', 42)
