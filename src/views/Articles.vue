<template>
  <v-card>
    <div v-if="isLoading">Loading players...</div>
    <div v-else>
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
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
          :custom-filter="filterByName"
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
          value:    'name',
        },
        {text: 'EAN', value: 'identifier'},
        {text: 'ID', value: 'article_id'},
        {text: 'Tariff Price', value: 'tariff_price'},
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
      this.response = axios.get(API_BASE_URL + '/articles?page=' + this.page)
          .then(({data}) => {
            this.items = data.data;
            this.lastPage = data.last_page;
            this.totalItems = data.total;
            this.articles = data.data;
            this.page = data.current_page;
            this.itemsPerPage = data.per_page;
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
    filterByName(value, search, item) {
      console.log(value + " " + search + " " + item)
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    setNavTitle() {
      this.$emit('nav-title', this.navTitle);
    }
  },
  computed: {},
  watch:    {
    search() {
      //this.filterByName(value, search, item);
    },
    // options: {
    //   handler() {
    //     this.fetchData()
    //   },
    //   deep: true,
    // },
  },
}
</script>

<style scoped>

</style>
