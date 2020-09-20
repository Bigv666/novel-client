<template>
  <div class="table-container">
    <el-table :data="tableData" size="small" @row-click="linkToReader">
      <el-table-column label="类型" prop="book.type"></el-table-column>
      <el-table-column label="书名" prop="book.name"></el-table-column>
      <el-table-column label="最新章节" prop="title"></el-table-column>
      <el-table-column label="作者" prop="book.author.nickname"></el-table-column>
      <el-table-column label="更新时间" prop="create_time"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'updateTable',
  props: {
    tableData: Array
  },
  mounted () {
    console.log(this.tableData)
  },
  methods: {
    linkToReader (row) {
      console.log(row)
      this.$router.push({
        path: '/read',
        query: {
          book_id: row.book_id,
          chapter_id: row._id
        }
      })
    }
  },
  watch: {
    tableData (eee) {
      console.log(eee)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
