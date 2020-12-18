<template>
  <v-card>
    <div v-if="isLoading">Loading players...</div>
    <div v-else>
      <v-card-title>
        Search
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="eq. 2055516 91H VRE"
            single-line
            hide-details
            @keyup.enter="filterBySearch"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="articles"
          :options="options"
          :server-items-length="totalItems"
          :loading="isLoading"
          class="elevation-1"
          :items-per-page="itemsPerPage"
          item-key="identifier"
          @update:page="updatePagination"
          @update:items-per-page="updateItemsPerPage"
          :search="search"
      >
      </v-data-table>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import {API_BASE_URL} from '../config'

export default {
  name:     "Articles",
  data() {
    return {
      headers:      [
        {
          text:     'Article Name',
          align:    'start',
          sortable: true,
          value:    'description.description',
        },
        {text: 'EAN', value: 'identifier'},
        {text: 'ID', value: 'article_id'},
        {text: 'Tariff Price', value: 'tariff_price', },
      ],
      search:       '',
      isLoading:    true,
      totalItems:   0,
      page:         1,
      lastPage:     1,
      itemsPerPage: 10,
      articles:     [],
      options:      {},
      navTitle:     "Articles"
    }
  },
  mounted() {
    this.fetchData();
    this.setNavTitle();
  },
  methods:  {
    fetchData() {
      this.response = axios.get(API_BASE_URL + '/articles?page=' + this.page + '&items_per_page=' + this.itemsPerPage + '&family=10081000&status=10011001&search=' + this.search)
          .then(({data}) => {
            this.items = data.data;
            this.lastPage = data.meta.last_page;
            this.totalItems = data.meta.total;
            this.articles = data.data;
            this.page = data.meta.current_page;
            this.itemsPerPage = parseInt(data.meta.per_page);
            this.sortBy = null;
            this.sortDesc = null;
          })
          .catch((err) => {
            console.log(err)
          });

      this.isLoading = false
    },
    updatePagination(page) {
      this.page = page;
      this.fetchData();
    },
    updateItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      // todo add items per page to API query
      this.fetchData();
    },
    filterBySearch() {
      this.fetchData();
    },
    setNavTitle() {
      this.$emit('nav-title', this.navTitle);
    }
  },
  computed: {},
  watch:    {

  },
}
</script>

<style scoped>

</style>
