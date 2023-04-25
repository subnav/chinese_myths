// 判断是否登录
function IsLogin () {
  // 判断用户是否登录
  if (window.localStorage.getItem('token')) {
    return true
  }
  this.$confirm('您当前还没有登录哦，快去登录吧！', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    this.$router.push('/login')
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消'
    })
  })
}
export default IsLogin
