import {DomListener} from '@core/DomListner';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.store = options.store
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.unsubscribers = []
        this.prepare()
        this.storeSub = null
    }

    //  Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Настраиваем компонент до init
    prepare() {}

    // Сюда приходят изменения по тем полям, на которые мы подписались
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // Инициализируем компонент
    // Добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент
    // Чистим слушателей
    destroy() {
        this.deleteDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
