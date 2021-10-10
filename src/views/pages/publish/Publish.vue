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
          <!--封面  -->
        <el-form-item>
          <div class="cover-wrapper" @click="onCoverClick">
            <img :src="article.cover" alt="" ref="cover-ref">
          </div>
        </el-form-item>

        <el-form-item>
        <el-button type="primary" @click="onPublish">{{ $route.query.id ? '修改文章' : '发布文章'}}</el-button>
        <el-button type="plain" @click="onDraft" v-show="!$route.query.id">存入草稿</el-button>
      </el-form-item>
      </el-form>
    </el-card>

 <!--  弹出层  -->
      <el-dialog
      :visible.sync="dialogVisible"
      width="74%"
      top="4vh"
      append-to-body
      >
      <ImageList :isShowUpload="false" :isShowIcons="false" :isShowPreview="[]" :isShowTick="true" ref="imageList-ref"></ImageList>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverSure">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import ImageList from '../material/components/imageList.vue'
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
    'el-tiptap': ElementTiptap,
    ImageList
  },
  data () {
    return {
      dialogVisible: false, // 弹出层控制
      article: {
        title: '',
        content: '',
        channel: '',
        state: 1,
        cover: null
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
      this.$refs.publishFormRef.validate(valid => {
      // 验证失败
        if (!valid) {
          return
        }
        this.article.state = 0
        // console.log(this.article)
        request.post('api/blog/draw', { blogData: this.article })
          .then((val) => {
            this.$message({
              message: '存入草稿成功',
              type: 'success'
            })
            this.$router.push('/content')
          })
      })
    },

    // 加载修改的文章
    loadBlog (id) {
      request.get(`api/blog/detail/${id}`)
        .then(val => {
          // console.log(val)
          this.article = val.data.data[0]
        })
    },
    onCoverClick () {
      // console.log(1)
      this.dialogVisible = true
    },
    // 选好图片确定按钮事件
    onCoverSure () {
      const imageList = this.$refs['imageList-ref']
      const ticked = imageList.ticked
      if (ticked === null) {
        this.$message('请选择图片')
        return
      }
      // console.log(imageList.images[ticked])
      // 展示图片到框内
      // this.$refs['cover-ref'].src = imageList.images[ticked].url
      this.article.cover = imageList.images[ticked].url
      imageList.ticked = null
      this.dialogVisible = false
      //
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
  /* 卡片 */
  .publish-card {
    width: 84%;
    margin-left: 22px;
  }
  /* 封面 */
  .cover-wrapper{
    height: 160px;
    width: 160px;
    /* height: 15px;
    width: 150px;
    border: 1px solid black; */
    /* background-color: beige; */
    border: 1px solid black;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
      vertical-align: top;
      background-image: url('./none.png');
      background-size: cover;
      /* background-size: contain; */
    }
  }

</style>
