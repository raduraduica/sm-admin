<template>
  <v-container>
    <h1>Articles</h1>
    <div v-if="isLoading">Loading players...</div>
    <div v-else>
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Answers</th>
          <th>Points</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.article_id">
            <td>{{ article.article_id }}</td>
            <td>{{ article.name }}</td>
            <td>{{ article.identifier }}</td>
            <td>{{ article.tariff_price }}</td>
            <td>Action buttons</td>
          </tr>
        </tbody>
      </table>
      <ul class="pagination pagination-md justify-content-center text-center">
        <li class="page-item"
            :class="page === 1 ? 'disabled' : ''"
        >
          <a
              class="page-link"
              @click="prevPage"
          >
            Previous
          </a>
        </li>
        <li class="page-link" style="background-color: inherit">
          {{ page }} of {{ lastPage }}
        </li>
        <li class="page-item"
            :class="page === lastPage ? 'disabled' : ''"
        >
          <a class="page-link"
             @click="nextPage"
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import {API_BASE_URL} from '../config'

export default {
  name:    "Articles",
  data() {
    return {
      isLoading: true,
      page:      1,
      lastPage:  1,
      perPage:   10,
      articles:  {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.response = axios.get(API_BASE_URL + '/articles?page=' + this.page)
          .then(({data}) => {
            this.lastPage = data.last_page;
            this.articles = data.data;
          })
          .catch((err) => {
            console.log(err)
          });

      // this.articles = this.response.data.data
      this.isLoading = false
    },

    nextPage() {
      this.loading = true
      this.page++;
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.fetchData();
    },

    prevPage() {
      this.loading = true
      this.page--;
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.fetchData();
    }
  },
  computed: {
    isLastPage () {
      let length = this.data.last_page;
      return length / this.perPage
    }
  }
}
</script>

<style scoped>

</style>