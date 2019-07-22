<template>
  <div>
    <input v-model="queryParam" type="text" />

    <label>
      Category
      <select v-model="categoryParam">
        <option value="">All categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </label>
    <label>
      Countries
      <select v-model="countryParam">
        <option
          v-for="country in countries"
          :key="country.abbr"
          :value="country.abbr"
        >
          {{ country.name }}
        </option>
      </select>
    </label>
    <button v-if="isFiltersActive" @click="resetParams">
      Reset Filters
    </button>
    <NewsFeed header="Latest Headlines" :news-items="newsFeedItems" />
    <button v-if="isMoreResults" @click="fetchMoreHeadlines">
      Load More
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NewsFeed from '@/components/NewsFeed'
import countries from '@/assets/countries.json'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'newsFeedItems'
)

export default {
  components: { NewsFeed },
  data: () => ({
    categories: [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology'
    ],
    countries
  }),
  computed: {
    queryParam: {
      get() {
        return this.params.q
      },
      set(newVal) {
        this.filterHeadlines({ param: 'q', val: newVal })
      }
    },
    categoryParam: {
      get() {
        return this.params.category
      },
      set(newVal) {
        this.filterHeadlines({ param: 'category', val: newVal })
      }
    },
    countryParam: {
      get() {
        return this.params.country
      },
      set(newVal) {
        this.filterHeadlines({ param: 'country', val: newVal })
      }
    },
    ...mapGetters(['isMoreResults', 'isFiltersActive']),
    ...mapState(['newsFeedItems', 'params'])
  },
  async fetch({ store }) {
    await store.dispatch('newsFeedItems/fetchHeadlines')
  },
  methods: {
    ...mapActions(['fetchMoreHeadlines', 'filterHeadlines', 'resetParams'])
  }
}
</script>
