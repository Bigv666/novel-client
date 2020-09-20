import { GET, POST, POST_RES } from '@/utils/request'
import { UserApi } from '@/config/api'
export default {
  // 登录
  login: (param) => {
    return POST_RES(UserApi.LOGIN, param)
  },
  loginByPhone: (param) => {
    return POST(UserApi.LOGIN_BY_PHONE, param)
  },
  // 注册
  register: (param) => {
    return POST(UserApi.REGISTER, param)
  },
  // 退出
  logout: (param) => {
    return GET(UserApi.LOGOUT, param)
  },
  // 获取当前信息
  getCurrentUser: (param) => {
    return GET(UserApi.GET_CURRENT_USER, param)
  },
  // 修改用户信息
  editUserInfo: (param) => {
    return POST(UserApi.EDIT_CURRENT_USER, param)
  },
  editUserPassword: (param) => {
    return POST(UserApi.EDIT_USER_PASSWORD, param)
  },
  // 消息
  getUserMessage: (param) => {
    return GET(UserApi.GET_USER_MESSAGE, param)
  },
  editUserMessage: (param) => {
    return POST(UserApi.EDIT_MESSAGE, param)
  },
  // 书架
  getUserBookShelf: (param) => {
    return GET(UserApi.GET_USER_BOOK_SHELF, param)
  },
  insertUserBookShelf: (param) => {
    return POST(UserApi.ADD_USER_BOOK_SHELF, param)
  },
  delUserBookShelf: (param) => {
    return POST(UserApi.DEL_USER_BOOK_SHELF, param)
  },

  // 历史阅读
  getUserReadRecord: (param) => {
    return GET(UserApi.GET_USER_READ_RECORD, param)
  },
  insertUserReadRecord: (param) => {
    return POST(UserApi.ADD_USER_READ_RECORD, param)
  },
  delUserReadRecord: (param) => {
    return POST(UserApi.DEL_USER_READ_RECORD, param)
  },
  // 打赏
  getUserPresentRecord: (param) => {
    return GET(UserApi.GET_USER_PRESENT_RECORD, param)
  },
  insertUserPresent: (param) => {
    return POST(UserApi.ADD_USER_PRESENT, param)
  },

  // 订阅
  getUserSubscribe: (param) => {
    return GET(UserApi.GET_USER_SUBSCRIBE, param)
  },
  insertUserSubscribe: (param) => {
    return POST(UserApi.ADD_USER_SUBSCRIBE, param)
  },
  // 评论
  getUserComment: (param) => {
    return GET(UserApi.GET_USER_COMMENT, param)
  },
  insertUserComment: (param) => {
    return POST_RES(UserApi.ADD_USER_COMMENT, param)
  },
  likeUserComment: (param) => {
    return POST(UserApi.LIKE_USER_COMMENT, param)
  },
  delUserComment: (param) => {
    return POST(UserApi.DEL_USER_COMMENT, param)
  },

  // 用户等级
  getUserGrade: (param) => {
    return GET(UserApi.GET_USER_GRADE, param)
  },

  // 新增充值
  getUserRecharge: (param) => {
    return GET(UserApi.GET_USER_RECHARGE, param)
  },
  insertUserRecharge: (param) => {
    return POST(UserApi.ADD_USER_RECHARGE, param)
  },

  // 获取作者详情
  getAuthor: (param) => {
    return GET(UserApi.GET_AUTHOR, param)
  },

  // 获取用户库存
  getUserInventory: (param) => {
    return GET(UserApi.GET_USER_INVENTORY, param)
  },
  // 购买礼物
  insertUserInventory: (param) => {
    return POST(UserApi.ADD_USER_INVENTORY, param)
  },
  // 库存赠送礼物
  editUserInventory: (param) => {
    return POST(UserApi.EDIT_USER_INVENTORY, param)
  }
}
