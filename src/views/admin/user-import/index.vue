<template>
  <app-main>
    <section slot="app-header">
      <upload-excel @on-selected-file="selected" @submit="_submit">
        <span slot="filter">
          <dl>
            <dt>角色：</dt>
            <dd>
              <el-select v-model="roleId" placeholder="请选择" size="mini" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </dd>
          </dl>
        </span>
      </upload-excel>
      <div class="errMsg" v-show="isError">
        提示：以下数据数据导入失败
      </div>
    </section>
    <section style="height:100%">
      <el-table v-loading="loading" :data="tablePageData" stripe border style="width: 100%" height="100%">
        <el-table-column v-for="(item,index) in tableHeader" :prop="item" :label="item" :key="index">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" v-if="tablePageData.length">
          <template slot-scope="scope">
            <el-button @click="_delColumn(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
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
import { mapGetters, mapActions } from 'vuex'
import UploadExcel from '@/components/UploadExcel'
import { importUser } from '@/api/userAction'
export default {
  name: 'UserImport',
  components: {
    AppMain,
    UploadExcel
  },
  data() {
    return {
      // files: [],
      loading: false,
      roleId: '',
      isError: '',
      tableData: [],
      tableHeader: [],
      keys: {
        姓名: 'username',
        密码: 'password',
        邮箱: 'email',
        学号: 'codeId'
      },
      pageObj: {
        page: 1,
        size: 20,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['roleList']),
    options() {
      let ret = []
      ret = this.roleList.map(item => {
        return {
          value: item._id,
          label: item.role
        }
      })
      return ret
    },
    tablePageData() {
      let { size, page } = this.pageObj
      let s = (page - 1) * size
      let e = page * size
      return this.tableData.slice(s, e)
    }
  },
  mounted() {
    if (!this.roleList.length) {
      this.getRoleList()
    }
  },
  methods: {
    ...mapActions('user', ['getRoleList']),
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
    _submit() {
      if (this.loading) return false
      if (!this.roleId) {
        this.$message.warning('请选择角色')
        return false
      }
      if (this.tableData.length == 0) {
        this.$message.warning('上传至少一条数据')
        return false
      }
      this.loading = true
      let list = this.tableData.map(data => {
        let obj = { roleId: this.roleId }
        this.tableHeader.forEach(header => {
          obj[this.keys[header]] = data[header]
        })
        return obj
      })
      const params = {
        list
      }
      importUser(params)
        .then(res => {
          let { data } = res
          if (data.errResult) {
            let codeIds = []
            data.errResult.writeErrors.forEach(item => {
              codeIds.push(item.op[this.keys['学号']])
            })
            this.isError = true
            this.tableData = this.tableData.filter(item => {
              let id = '' + item['学号']
              return codeIds.indexOf(id) > -1
            })
            this.$message({
              message: res.message,
              type: 'error'
            })
            this.pageObj = {
              page: 1,
              size: 20,
              total: this.tableData.length
            }
            return false
          }
          this.$message('导入成功')
          this.tableData = []
          this.isError = false
        })
        .finally(res => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/table.scss';
.errMsg {
  color: red;
  line-height: 32px;
  font-size: 16px;
}
</style>
