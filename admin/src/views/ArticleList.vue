<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column
        type="index"
        label="序号"
        min-width="50"
      ></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/Articles/edit/${scope.row._id}`)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const { data } = await this.$http.get('rest/Articles')
      this.items = data
    },
    remove(row) {
      this.$confirm(`是否确定删除分类 【${row.title}】`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/Articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.fetch()
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
