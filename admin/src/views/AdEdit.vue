<template>
  <div>
    <h1>{{ id ? '编辑' : '新增' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="primary"
          plain
          size="small"
          @click="model.items.push({})"
        >
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap" class="el-row">
          <el-col
            :xs="12"
            :sm="12"
            :md="12"
            v-for="(item, index) in model.items"
            :key="index"
          >
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                style="margin-left: 120px"
                type="danger"
                size="mini"
                plain
                @click="model.items.splice(index, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
  data() {
    return {
      model: {
        items: []
      },
      perents: []
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/ads', this.model)
      }
      console.log(res)

      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch() {
      const { data } = await this.$http.get(`rest/ads/${this.id}`)
      this.model = data
    },
    async fetchParent() {
      const { data } = await this.$http.get('rest/ads')
      this.perents = data
    }
  },
  created() {
    this.fetchParent()
    this.id && this.fetch()
  }
}
</script>

<style scoped>
.el-row .el-form-item {
  margin: 0 0 22px -50px;
}
.el-row {
  margin-top: 22px;
}
</style>
