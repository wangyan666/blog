<template>
  <div class="publish-container">
    <el-card class="publish-card">
      <!-- 面包屑 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- FORM  -->
      <el-form
        label-width="80px"
        :model="article"
        :rules="rules"
        ref="publishFormRef"
      >
        <el-form-item label="标题 :ㅤ" prop="title">
          <el-input v-model="article.title" autofocus></el-input>
        </el-form-item>
        <el-form-item label="内容 :ㅤ" prop="content">
          <el-tiptap
          v-model="article.content"
          :extensions="extensions"
          lang="zh"
          :height="320"
          >
          </el-tiptap>
        </el-form-item>
        <el-form-item label="分类 :ㅤ" prop="channel">
        <el-select v-model="article.channel" placeholder="请选择分类">
          <el-option label="前端" :value="1"></el-option>
          <el-option label="后端" :value="2"></el-option>
          <el-option label="算法" :value="3"></el-option>
          <el-option label="阅读" :value="4"></el-option>
          <el-option label="其他" :value="5"></el-option>
        </el-select>
      </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="onPublish">{{ $route.query.id ? '修改文章' : '发布文章'}}</el-button>
        <el-button type="plain" @click="onDraft" v-show="!$route.query.id">存入草稿</el-button>
      </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadImage } from '@/api/upload.js'
import request from '@/utils/request'
// 引入富文本编辑器
import 'element-tiptap/lib/index.css'
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  // Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  Fullscreen,
  Preview,
  TextColor,
  TextHighlight
} from 'element-tiptap'

export default {
  name: 'Publish',
  components: {
    'el-tiptap': ElementTiptap
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        channel: '',
        state: 1
      },

      // 校验规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
          { min: 0, max: 40, message: '长度至多40字符', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      // 富文本编辑器配置
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Strike(),
        new TextColor(),
        new TextHighlight(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(val => { return val.data })
          }
        }),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Fullscreen(),
        new Preview()
      ]
    }
  },

  methods: {
    onPublish () {
      this.$refs.publishFormRef.validate(valid => {
        // 验证失败
        if (!valid) {
          return
        }

        // 验证通过提交
        // 发送请求
        if (this.$route.query.id) {
          request.post('api/blog/update', { blogData: this.article })
            .then((val) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
        } else {
          request.post('api/blog/draw', { blogData: this.article })
            .then((val) => {
              this.$message({
                message: '发布成功',
                type: 'success'
              })
              this.$router.push('/content')
            })
        }
      })
    },
    onDraft () {
      this.article.state = 0
      console.log(this.article)
      request.post('api/blog/draw', { blogData: this.article })
        .then((val) => {
          this.$message({
            message: '存入草稿成功',
            type: 'success'
          })
          this.$router.push('/content')
        })
    },
    // 加载修改的文章
    loadBlog (id) {
      request.get(`api/blog/detail/${id}`)
        .then(val => {
          // console.log(val)
          this.article = val.data.data[0]
        })
    }
  },
  // 监视
  watch: {
    $route: function () {
      this.loadBlog(this.$route.query.id)
    }
  },
  created () {
    if (this.$route.query.id) {
      // console.log(this.$route.query.id)
      this.loadBlog(this.$route.query.id)
    }
  }
}
</script>

<style lang = "less" scoped>

  .publish-card {
    width: 84%;
    margin-left: 22px;
  }

</style>
