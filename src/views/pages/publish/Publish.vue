<template>
  <div class="publish-container">
    <el-card class="box-card top-card">
      <!-- 面包屑 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- FORM  -->
      <el-form
        label-width="80px"
        :model="article"
      >
        <el-form-item label="标题 :ㅤ">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容 :ㅤ">
          <el-tiptap
          v-model="article.content"
          :extensions="extensions"
          lang="zh"
          >
          </el-tiptap>
        </el-form-item>
        <el-form-item label="频道 :ㅤ">
        <el-select v-model="article.channel" placeholder="请选择频道">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="onPublish">发表</el-button>
        <el-button type="plain" @click="onDraft">存入草稿</el-button>
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
        channel: ''
      },

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
      request.post('api/blog/draw', { blogData: this.article })
    },
    onDraft () {

    }
  }
}
</script>

<style>
</style>
