export const tablePage = {
  data() {
    return {
      pageObj: {
        page: 1,
        size: 20,
        total: 0
      },
      pageSizes: [20, 30, 40, 50]
    }
  },
  methods: {
    handleSizeChange(value) {
      this.pageObj.size = value
      this._getUserList()
    },
    handleCurrentChange(value) {
      this.pageObj.page = value
      this._getUserList()
    }
  }
}
