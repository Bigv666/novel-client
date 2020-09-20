import { GET, POST } from '@/utils/request'
import { BookApi } from '@/config/api'
export default {
  getBook: (param) => {
    return GET(BookApi.GET_BOOK, param)
  },
  getChapter: (param) => {
    return GET(BookApi.GET_CHAPTER, param)
  },
  AddBookData: (param) => {
    return POST(BookApi.ADD_BOOK_DATA, param)
  }
}
