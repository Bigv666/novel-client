export const UserApi = {
  LOGIN: 'user/login',
  LOGIN_BY_PHONE: 'user/login_by_phone',
  REGISTER: 'user/register',
  LOGOUT: 'user/logout',
  GET_CURRENT_USER: 'user/get_current_user',
  EDIT_CURRENT_USER: 'system/edit_current_user',
  EDIT_USER_PASSWORD: 'user/edit_user_password',
  UPLOAD_AVATAR: 'system/upload_image',
  // 消息
  GET_USER_MESSAGE: 'system/get_user_message',
  EDIT_MESSAGE: 'system/edit_message',
  // 书架
  GET_USER_BOOK_SHELF: 'user/get_user_book_shelf',
  ADD_USER_BOOK_SHELF: 'user/create_user_book_shelf',
  DEL_USER_BOOK_SHELF: 'user/del_user_book_shelf',
  // 历史阅读
  GET_USER_READ_RECORD: 'user/get_user_read_record',
  ADD_USER_READ_RECORD: 'user/create_read_record',
  DEL_USER_READ_RECORD: 'user/del_user_read_record',
  // 礼物
  GET_USER_PRESENT_RECORD: 'user/get_user_present_record',
  ADD_USER_PRESENT: 'user/create_user_present_record',

  // 评论
  GET_USER_COMMENT: 'user/get_user_comment',
  ADD_USER_COMMENT: 'user/create_user_comment',
  LIKE_USER_COMMENT: 'user/like_user_comment',
  DEL_USER_COMMENT: 'user/del_user_comment',

  // 等级
  GET_USER_GRADE: 'user/get_user_grade',
  // 充值
  GET_USER_RECHARGE: 'user/get_user_recharge',
  ADD_USER_RECHARGE: 'user/create_user_recharge',
  // 订阅
  GET_USER_SUBSCRIBE: 'user/get_user_subscribe',
  ADD_USER_SUBSCRIBE: 'user/create_user_subscribe',
  // 获取用户
  GET_USER: 'user/get_user',
  GET_AUTHOR: 'user/get_author',

  // 背包
  GET_USER_INVENTORY: 'user/get_user_inventory',
  ADD_USER_INVENTORY: 'user/create_user_inventory',
  EDIT_USER_INVENTORY: 'user/edit_user_inventory'
}
export const ListApi = {
  GET_SWIPER_LIST: 'list/get_swipers',
  GET_RECOMMEND_LIST: 'list/get_recommends',
  GET_HONOR_LIST: 'list/get_honors',
  GET_CHAPTER_LIST: 'list/get_chapters',
  GET_AUTHOR_LIST: 'list/get_authors',
  GET_BOOK_LIST: 'list/get_books',
  GET_PRESENT_LIST: 'list/get_presents',
  GET_DICTIONARY_LIST: 'book/get_dictionarys',
  GET_COMMENT_LIST: 'list/get_comments',
  GET_CURRENT_BOOK_RANKING: 'list/get_current_book_ranking',
  GET_PRESENT_RECORD_LIST: 'list/get_present_records',
  GET_RANKING_LIST: 'list/get_rankings',
  GET_GRADE_LIST: 'list/get_grades',
  GET_AWARD_LIST: 'list/get_awards',
  GET_FAN_LIST: 'list/get_fans'
}
export const BookApi = {
  //
  GET_BOOK: 'book/get_book',
  GET_CHAPTER: 'book/get_chapter_content',
  ADD_BOOK_DATA: 'book/add_data'
}
