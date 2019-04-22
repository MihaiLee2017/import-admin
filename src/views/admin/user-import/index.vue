<template>
  <app-main>
    <section slot="app-header">
      <upload-excel @on-selected-file="selected" @submit="_submit" />
    </section>
    <section style="height:100%">
      <el-table :data="tablePageData" stripe border style="width: 100%" height="100%">
        <el-table-column v-for="(item,index) in tableHeader" :prop="item" :label="item" :key="index">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" v-if="tablePageData.length">
          <template slot-scope="scope">
            <el-button @click="_delColumn(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column> -->
      </el-table>
    </section>
    <section slot="app-footer" v-if="tablePageData.length>0">
      <div class="table-page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageObj.page" :page-sizes="[20, 30, 40, 50]" :page-size="pageObj.size" layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total">
        </el-pagination>
      </div>
    </section>
  </app-main>
</template>
<script>
import AppMain from '@/components/AppMain'
import UploadExcel from '@/components/UploadExcel'
export default {
  name: 'UserImport',
  components: {
    AppMain,
    UploadExcel
  },
  data() {
    return {
      // files: [],
      tableData: [],
      tableHeader: [],
      pageObj: {
        page: 1,
        size: 20,
        total: 0
      }
    }
  },
  computed: {
    tablePageData() {
      let { size, page } = this.pageObj
      let s = (page - 1) * size
      let e = page * size
      return this.tableData.slice(s, e)
    }
  },
  methods: {
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
      this.pageObj = {
        page: 1,
        size: 20,
        total: this.tableData.length
      }
    },
    handleSizeChange(value) {
      this.pageObj.size = value
    },
    handleCurrentChange(value) {
      this.pageObj.page = value
    },
    _delColumn(scope) {
      let { size, page } = this.pageObj
      let s = (page - 1) * size + scope.$index
      this.tableData.splice(s, 1)
    },
    _submit() {}
  }
}
</script>
<style lang="scss">
@import '~@/styles/table.scss';
</style>
