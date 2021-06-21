import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/tableTempalte";
import {resizeHandler} from "@/components/table/tableResize";
import {matrix, shouldResize} from "@/components/table/tableFunctions";
import {isCell} from "@/components/table/tableFunctions";
import {nextSelector} from "@/components/table/tableFunctions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import * as actions from "@/Store/actions";
import {defaultStyles} from "@/constants";
import {parse} from "@core/parse";

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
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds,
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
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

    updateTextInStore(value) {
        this.$dispatch(actions.tableChangeText({
            id: this.selection.current.id(),
            value,
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}