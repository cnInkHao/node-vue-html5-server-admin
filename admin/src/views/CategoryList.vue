<template>
  <div>
    <h1>列表页面</h1>
    <el-table :data="items">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="_id" label="id" width="240"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetch () {
      const { data } = await this.$http.get('categories')
      console.log(data);
      this.items = data

    }
  },
  created () {
    this.fetch()
  },
}
</script>

<style lang="scss" scoped>
</style>