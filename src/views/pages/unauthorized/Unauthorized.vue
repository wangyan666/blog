<template>
  <div>登录以获取更多操作</div>
</template>

<script>
export default {
  name: 'Unauthorized',
  // beforeEnter: (to, from, next) => {
  //   console.log('tiao')
  //   if (token) {
  //     console.log('跳咯')
  //     next('/')
  //   }
  // },
  created () {
    const token = JSON.parse(window.localStorage.getItem('token'))
    if (token) {
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>
