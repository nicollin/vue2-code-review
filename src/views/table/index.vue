<template>
  <div class="main-container">
    <el-button type="primary" @click="searchFirstPage" float="left">
      查询第一页
    </el-button>
    <el-table
      :data="pageData"
      max-height="500px"
      v-loading="page.loading"
      ref="elTable"
      class="table"
    >
      <el-table-column
        type="index"
        label="No."
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        label="name"
        prop="name"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        label="id"
        prop="id"
        width="400"
        align="center"
      ></el-table-column>
      <el-table-column
        label="signature"
        prop="signature"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Mockjs from "mockjs";
export default {
  data() {
    return {
      page: {
        pageNo: 1,
        pageSize: 10,
        totalSize: 0,
        loading: false
      },
      pageData: []
    };
  },
  async created() {
    await this.searchFirstPage();
    await this.$nextTick(async () => {
      const element = this.$refs.elTable.bodyWrapper;
      element.addEventListener("scroll", await this.infiniteScroll);
    });
  },

  methods: {
    /**
     * 无限滚动
     */
    async infiniteScroll() {
      const element = this.$refs.elTable.bodyWrapper;
      const scrollDistance =
        element.scrollHeight - element.scrollTop - element.clientHeight;
      if (scrollDistance <= 0 && !this.firstPageLoadFlag) {
        if (this.pageData.length >= this.page.totalSize) {
          this.$message.warning("没有更多数据");
        } else {
          this.page.pageNo++;
          await this.loadMoreData();
        }
      }
    },

    /**
     *  【滚动加载】加载数据
     */
    async loadMoreData() {
      this.page.loading = true;
      try {
        const origin = this.pageData.slice();
        const result = await this.getPageData(this.page);
        this.pageData = [...origin, ...result];
      } catch (e) {
        console.log(e);
      } finally {
        this.page.loading = false;
      }
    },

    /**
     * 【分页加载】加载数据
     */
    async queryPageData() {
      this.page.loading = true;
      try {
        this.pageData = [];
        this.pageData = await this.getPageData(this.page);
      } catch (e) {
        console.log(e);
      } finally {
        this.page.loading = false;
      }
    },

    /**
     * 【Mock】获取分页数据
     */
    async getPageData(page) {
      const totalSize = 25;
      page.totalSize = totalSize;
      const arr = [];
      for (let i = 0; i < totalSize; i++) {
        const item = {};
        item.name = Mockjs.Random.cname();
        item.id = Mockjs.Random.guid();
        item.signature = Mockjs.Random.csentence(30);
        arr.push(item);
      }
      const result = arr.slice(
        (page.pageNo - 1) * page.pageSize,
        page.pageNo * page.pageSize
      );
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(result);
        }, 1000);
      });
    },

    /**
     * 查询第一页
     */
    async searchFirstPage() {
      this.firstPageLoadFlag = true;
      this.page.pageNo = 1;
      await this.queryPageData();
      this.firstPageLoadFlag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  margin: auto;
}
</style>
