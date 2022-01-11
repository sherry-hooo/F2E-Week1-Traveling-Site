<template>
  <div class="pagination">
    <div class="first_page_btn" @click="currentPage = 1">
      <i class="fa-fw fas fa-angle-double-left"></i>
    </div>
    <div class="previous_page_btn" @click="changePreviousPage">
      <i class="fa-fw fas fa-angle-left"></i>
    </div>
    <ul class="page_group">
      <li
        v-for="page in totalPageArray"
        :key="page"
        :class="{ target_page: page === currentPage }"
        @click="currentPage = page"
      >
        {{ page }}
      </li>
    </ul>
    <div class="next_page_btn" @click="changeNextPage">
      <i class="fa-fw fas fa-angle-right"></i>
    </div>
    <div class="last_page_btn" @click="currentPage = totalPage">
      <i class="fa-fw fas fa-angle-double-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["totalPage"],
  emits: ["sentCurrentPage"],
  data() {
    return {
      currentPage: 1,
      displayPages: 5,
    };
  },
  methods: {
    changePreviousPage() {
      this.currentPage <= 1 ? this.currentPage : this.currentPage--;
    },
    changeNextPage() {
      this.currentPage >= this.totalPage
        ? this.currentPage
        : this.currentPage++;
    },
    scrollToTop() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    totalPageArray() {
      const pageTimes = Math.floor((this.currentPage - 1) / this.displayPages);
      return Array(this.totalPage)
        .fill(1)
        .map((number, index) => number + index)
        .slice(
          this.displayPages * pageTimes,
          this.displayPages * (pageTimes + 1)
        );
    },
    pathCity() {
      return this.$route.params.cityLink;
    },
  },
  watch: {
    currentPage() {
      this.$emit("sentCurrentPage", this.currentPage);
    },
    pathCity() {
      this.currentPage = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0 0;
  padding: 5px 0;
  .first_page_btn,
  .previous_page_btn,
  .next_page_btn,
  .last_page_btn {
    // outline: 1px solid black;
    width: 25px;
    height: fit-content;
    cursor: pointer;
  }
}
.page_group {
  display: flex;
  margin: 0 10px;
  li {
    width: 25px;
    aspect-ratio: 1 / 1;
    line-height: 25px;
    margin: 0 5px;
    padding: 3px;
    box-sizing: content-box;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      background: rgb(9, 9, 49);
      border-radius: 50px;
      color: white;
    }
  }
}
.target_page {
  background: rgb(9, 9, 49);
  border-radius: 50px;
  color: white;
}
</style>
