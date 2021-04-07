import {ExcelComponent} from "@core/ExcelComponent";

import {createTable} from "@/components/table/tableTempalte";
import {resizeHandler} from "@/components/table/tableResize";
import {shouldResize} from "@/components/table/tableFunctions";

export class Table extends ExcelComponent {
    static ClassName = 'excel__table'
    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
        })
    }
    toHTML() {
        return createTable(20)
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}