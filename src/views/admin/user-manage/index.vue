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
    <section>
      <el-table :data="tablePageData" stripe border style="width: 100%" height="100%">
        <el-table-column v-for="(item,index) in tableHeader" :prop="item" :label="item" :key="index">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" v-if="tablePageData.length">
          <template slot-scope="scope">
            <!-- <el-button @click="_delColumn(scope)" type="text" size="small">删除</el-button> -->
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
import { getUserList } from '@/api/userAction'
export default {
  name: 'UserManage',
  components: {
    AppMain
  },
  data() {
    return {
      roleId: '',
      username: '',
      codeId: '',
      tableHeader: ['username', 'email', 'codeId', 'roleId'],
      tablePageData: [],
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
      const params = {
        roleId: this.roleId,
        username: this.username,
        codeId: this.codeId,
        page: this.pageObj.page,
        size: this.pageObj.size
      }
      getUserList(params).then(res => {})
    },
    handleSizeChange(value) {
      this.pageObj.size = value
    },
    handleCurrentChange(value) {
      this.pageObj.page = value
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/table.scss';
</style>
