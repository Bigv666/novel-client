export default {
  loading: state => state.app.loading,
  kindOptions: state => state.list.kindOptions,
  isLogin: (state) => state.user.isLogin,
  userInfo: (state) => state.user.userInfo,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  money: state => state.user.money
}
