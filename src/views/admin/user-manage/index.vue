<template>
  <app-main>
    <section class="table-filter" slot="app-header">
      <dl>
        <dt>角色：</dt>
        <dd>
          <el-select v-model="roleId" placeholder="请选择" size="mini" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <dl>
        <dt>姓名：</dt>
        <dd>
          <el-input v-model="username" size="mini" placeholder="请输入内容"></el-input>
        </dd>
      </dl>
      <dl>
        <dt>学号：</dt>
        <dd>
          <el-input v-model="codeId" size="mini" placeholder="请输入内容"></el-input>
        </dd>
      </dl>
      <dl>
        <dt>操作：</dt>
        <dd>
          <el-button type="primary" size="mini" @click.native="_getUserList">查询</el-button>
        </dd>
      </dl>
    </section>
    <!-- <section> -->
    <el-table :data="tablePageData" stripe border style="width: 100%" height="100%" v-loading="loading">
      <el-table-column v-for="(item,index) in tableHeader" :prop="item.value" :label="item.label" :key="index">
        <template slot-scope="scope">
          <span v-if="item.value=='roleId'">{{scope.row.roleId.role}}</span>
          <span v-else>{{scope.row[item.value]}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" v-if="tablePageData.length">
        <template slot-scope="scope">
          <el-button @click="_delColumn(scope)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </section> -->
    <section slot="app-footer" v-if="tablePageData.length>0">
      <div class="table-page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageObj.page" :page-sizes="pageSizes" :page-size="pageObj.size" layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total">
        </el-pagination>
      </div>
    </section>
  </app-main>
</template>
<script>
import AppMain from '@/components/AppMain'
import { mapGetters, mapActions } from 'vuex'
import { getUserList, delUser } from '@/api/userAction'
import { tablePage } from '@/mixins/table'
export default {
  name: 'UserManage',
  mixins: [tablePage],
  components: {
    AppMain
  },
  data() {
    return {
      loading: false,
      roleId: '',
      username: '',
      codeId: '',
      tableHeader: [
        { label: '姓名', value: 'username' },
        { label: '邮箱', value: 'email' },
        { label: '学号', value: 'codeId' },
        { label: '角色', value: 'roleId' }
      ],
      tablePageData: []
      // pageObj: {
      //   page: 1,
      //   size: 20,
      //   total: 0
      // }
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
    }
  },
  mounted() {
    if (!this.roleList.length) {
      this.getRoleList()
    }
    this._getUserList()
  },
  methods: {
    ...mapActions('user', ['getRoleList']),
    _getUserList() {
      if (this.loading) return false
      const params = {
        roleId: this.roleId,
        username: this.username,
        codeId: this.codeId,
        page: this.pageObj.page,
        size: this.pageObj.size
      }
      this.loading = true
      getUserList(params)
        .then(res => {
          const { data: { result } } = res
          this.tablePageData = result
          this.pageObj.total = this.tablePageData.length
          // console.log(this.tablePageData)
        })
        .finally(res => {
          this.loading = false
        })
    },
    // handleSizeChange(value) {
    //   this.pageObj.size = value
    //   this._getUserList()
    // },
    // handleCurrentChange(value) {
    //   this.pageObj.page = value
    //   this._getUserList()
    // },
    async _delColumn(scope) {
      const params = {
        _id: scope.row._id
      }
      await delUser(params).then(res => {
        this.handleCurrentChange(1)
      })
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/table.scss';
</style>
