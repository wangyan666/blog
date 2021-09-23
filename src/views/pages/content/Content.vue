<template>
<div>
  <!-- 上部分 -->
  <el-card class="box-card top-card">
    <!-- 面包屑 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 筛选 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="状态 :">
        <el-radio-group v-model="form.state">
          <el-radio label="">全部</el-radio>
          <el-radio label="0">草稿</el-radio>
          <el-radio label="1">待审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核失败</el-radio>
          <el-radio label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道 :">
        <el-select v-model="form.channel" placeholder="请选择频道">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间 :">
        <el-col :span="7">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" value-format="timestamp" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">&nbsp;</el-col>
        <el-col :span="7">
          <el-date-picker type="date" placeholder="结束日期" v-model="form.date2" value-format="timestamp" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="loading">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 下部分 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>共有{{this.blogNumber}}条数据</span>
    </div>
    <!-- 表格 -->
    <el-table
    v-loading="loading"
      class="table"
      :data="tableData"
      style="width: 100%"
      >
      <el-table-column
        prop=""
        label="封面"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="180">
        <template slot-scope="scope">
          <el-tag
          :type="blogState[scope.row.state].type"
          >{{blogState[scope.row.state].text}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :disabled="loading"
      :page-size= this.blogConfig.pagesize
      layout="prev, pager, next"
      :total= this.blogNumber
      @current-change="onPageChange">
    </el-pagination>
  </el-card>
  <!-- 下部分end -->
</div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'Content',

  data () {
    return {
      loading: true, // loading动画
      tableData: [],
      form: {
        channel: '',
        date1: '',
        date2: '',
        state: ''
      },
      blogState: [
        { state: 0, text: '草稿', type: 'info' },
        { state: 1, text: '待审核', type: '' },
        { state: 2, text: '审核通过', type: 'success' },
        { state: 3, text: '审核失败', type: 'warning' },
        { state: 4, text: '已删除', type: 'danger' }
      ],
      // 博客筛选的配置
      blogConfig: {
        page: 1,
        pagesize: 6,
        state: null,
        date1: null,
        date2: null
      },
      blogNumber: 0
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.blogConfig.state = this.form.state
      this.blogConfig.date1 = this.form.date1
      this.blogConfig.date2 = this.form.date2
      this.initBlog(this.blogConfig)
      this.getTotel(this.blogConfig)
    },
    onPageChange (page) {
      this.blogConfig.page = page
      this.initBlog(this.blogConfig)
    },
    // 加载表格数据
    initBlog (config) {
      this.loading = true
      request.get('api/blog/list', { params: config })
        .then((response) => {
          // console.log(response.data)
          this.tableData = response.data.data
          this.loading = false
        })
    },
    // 获取博客总数
    getTotel (config) {
      request.get('api/blog/blogNumber', { params: config })
        .then((val) => {
          // console.log(val.data.data['COUNT(*)'])
          this.blogNumber = val.data.data['COUNT(*)']
        })
    }
  },

  created () {
    this.initBlog(this.blogConfig)
    this.getTotel()
  }

}
</script>

<style lang = "less" scoped>

  /* .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  } */

  .box-card {
    width: 82%;
    margin-left: 18px;
  }

  .top-card{
    margin-bottom: 34px;
  }

  .table{
    margin-bottom: 20px;
  }
</style>
