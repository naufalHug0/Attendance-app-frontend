import * as XLSX from 'xlsx'

export default class Excel {
    static exportTableToExcel (table,fileName) {
        const workBook = XLSX.utils.book_new()
        const workSheet = XLSX.utils.table_to_sheet(table)
    
        XLSX.utils.book_append_sheet(workBook,workSheet,'Sheet1')
    
        XLSX.writeFile(workBook,`${fileName}.xlsx`)
    }
}