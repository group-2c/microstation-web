import ExcelJS from "exceljs"
import FileSaver from "file-saver"

class ExportXlsxClass {

  createWorkBook = () => {
    this.workbook = new ExcelJS.Workbook()
    this.workbook.created = new Date()
    this.workbook.modified = new Date()
    this.workbook.lastPrinted = new Date()
  }

  createWorkSheet = () => {
    this.workSheet = this.workbook.addWorksheet("mySheet")
  }

  combinationData = list => {
    list.map((item, index) => {
      if(index === 0) {
        this.workSheet.columns = Object.keys(item).map(key => {
          const header = item[key]
          return {key, header}
        })  
      } else {
        this.workSheet.addRow(item)
      }
    })
  }

  download = title => {
    this.workbook.xlsx.writeBuffer()
      .then((buffer) => {
        FileSaver.saveAs(new Blob([buffer]), `${title}.xlsx`)
      })
      .catch((err) => {
        this.$message.error(`excel导出失败, 原因为: ${err}`)
      })
  }

  downloadExcel = (list, title) => {
    this.createWorkBook()
    this.createWorkSheet()
    this.combinationData(list)
    this.download(title)
  }
}

export default new ExportXlsxClass()