import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/tableTempalte";

export class Table extends ExcelComponent {
    static ClassName = 'excel__table'
    toHTML() {
        return createTable(20)
    }
}