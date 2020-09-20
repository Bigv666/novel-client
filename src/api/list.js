import { GET } from '@/utils/request'
import { ListApi } from '@/config/api'
export default {
  getSwiperList: (param) => {
    return GET(ListApi.GET_SWIPER_LIST, param)
  },
  getRecommendList: (param) => {
    return GET(ListApi.GET_RECOMMEND_LIST, param)
  },
  getHonorList: (param) => {
    return GET(ListApi.GET_HONOR_LIST, param)
  },
  getChapterList: (param) => {
    return GET(ListApi.GET_CHAPTER_LIST, param)
  },
  getAuthorList: (param) => {
    return GET(ListApi.GET_AUTHOR_LIST, param)
  },
  getBookList: (param) => {
    return GET(ListApi.GET_BOOK_LIST, param)
  },
  getDictionaryList: (param) => {
    return GET(ListApi.GET_DICTIONARY_LIST, param)
  },
  getPresentList: (param) => {
    return GET(ListApi.GET_PRESENT_LIST, param)
  },
  getCommentList: (param) => {
    return GET(ListApi.GET_COMMENT_LIST, param)
  },
  getCurrentBookRanking: (param) => {
    return GET(ListApi.GET_CURRENT_BOOK_RANKING, param)
  },
  getPresentRecordList: (param) => {
    return GET(ListApi.GET_PRESENT_RECORD_LIST, param)
  },
  getRankingList: (param) => {
    return GET(ListApi.GET_RANKING_LIST, param)
  },
  getGradeList: (param) => {
    return GET(ListApi.GET_GRADE_LIST, param)
  },
  getAwardList: (param) => {
    return GET(ListApi.GET_AWARD_LIST, param)
  },
  getFanList: (param) => {
    return GET(ListApi.GET_FAN_LIST, param)
  }
}
