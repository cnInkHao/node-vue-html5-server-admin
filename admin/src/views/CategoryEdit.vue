<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="name"></el-input>
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
      name: ''
    };
  },
  methods: {
    async save () {
      console.log(123123);
      await this.$http.post('categories', {name: this.name})
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    }
  }
};
</script>

<style scoped>
</style>