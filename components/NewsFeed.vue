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
    <section>
      <NewsFeedItem
        v-for="(newsFeedItem, idx) in newsFeedItems"
        :key="idx"
        :headline="newsFeedItem.title"
        :author="newsFeedItem.author"
        :date="newsFeedItem.publishedAt | validatedDate"
        :url="newsFeedItem.url"
      />
    </section>
    <button v-if="isMoreResults" @click="fetchMoreHeadlines">
      Load More
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NewsFeedItem from './NewsFeedItem'
import countries from '@/assets/countries.json'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'newsFeedItems'
)
export default {
  name: 'NewsFeed',
  components: { NewsFeedItem },
  filters: {
    validatedDate(date) {
      if (!date) return ''
      return new Date(date)
    }
  },
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
  async created() {
    await this.fetchHeadlines()
  },
  methods: {
    ...mapActions([
      'fetchHeadlines',
      'fetchMoreHeadlines',
      'filterHeadlines',
      'resetParams'
    ])
  }
}
</script>

<style></style>
