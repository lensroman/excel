import {DomListener} from '@core/DomListner';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
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
    // Настраиваем компонент до init
    prepare() {}
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
