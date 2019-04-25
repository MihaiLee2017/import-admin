<template>
  <app-main>
    <section style="height:100%;padding:10px 0;">
      <el-table :data="roleList" stripe border style="width: 100%" height="100%">
        <el-table-column v-for="(item,index) in tableHeader" :prop="item.value" :label="item.label" :key="index">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100" v-if="roleList.length">
          <template slot-scope="scope">
            <el-button @click="_delColumn(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </section>
  </app-main>
</template>
<script>
import AppMain from '@/components/AppMain'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UserManage',
  components: {
    AppMain
  },
  data() {
    return {
      tableHeader: [
        {
          label: '角色',
          value: 'role'
        },
        {
          label: 'key',
          value: 'key'
        },
        {
          label: '创建时间',
          value: 'create_date'
        }
      ]
    }
  },
  mounted() {
    if (!this.roleList.length) {
      this.getRoleList()
      console.log('roleList:', this.roleList)
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
  methods: {
    ...mapActions('user', ['getRoleList']),
    _delColumn(scope) {}
  }
}
</script>
