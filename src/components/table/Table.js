import {ExcelComponent} from "@core/ExcelComponent";

import {createTable} from "@/components/table/tableTempalte";
import {resizeHandler} from "@/components/table/tableResize";
import {matrix, shouldResize} from "@/components/table/tableFunctions";
import {isCell} from "@/components/table/tableFunctions";
import {nextSelector} from "@/components/table/tableFunctions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static ClassName = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
    }
    toHTML() {
        return createTable(20)
    }
    prepare() {
        this.selection = new TableSelection()
    }
    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
        if (isCell(event)) {
            const $target = $(event.target)
             if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                        .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                 this.selectCell($target)
            }
        }
    }
    onKeydown(event) {
        const keys = ['Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }
    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}