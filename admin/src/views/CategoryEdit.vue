<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item>
        <el-select v-model="model.parent">
          <el-option v-for="item in perents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {},
      perents: []
    }
  },
  methods: {
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/categories', this.model)
      }
      console.log(res)

      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch () {
      const { data } = await this.$http.get(`rest/categories/${this.id}`)
      this.model = data
    },
    async fetchParent () {
      const { data } = await this.$http.get('rest/categories')
      console.log(data);
      this.perents = data
    }
  },
  created () {
    this.fetchParent()
    this.id && this.fetch()
  }
}
</script>

<style scoped></style>
