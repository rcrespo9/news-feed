<template>
  <div>
    <input type="text" data-param="q" @input="setQueryParam" />

    <label v-for="category in categories" :key="category">
      <input
        :id="category"
        v-model="categoryParam"
        :value="category"
        type="radio"
        name="category"
      />{{ category }}
    </label>
    <NewsFeed header="Latest Headlines" :news-items="newsFeedItems" />
    <button v-if="isMoreResults" @click="fetchMoreHeadlines">
      Load More
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import debounce from 'lodash.debounce'
import NewsFeed from '@/components/NewsFeed'

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
    ]
  }),
  computed: {
    categoryParam: {
      get() {
        return this.params.category
      },
      set(newVal) {
        console.log(newVal) // eslint-disable-line
        this.fetchHeadlinesQuery({ param: 'category', val: newVal })
      }
    },
    ...mapGetters(['isMoreResults']),
    ...mapState(['newsFeedItems', 'params'])
  },
  async fetch({ store }) {
    await store.dispatch('newsFeedItems/fetchHeadlines')
  },
  methods: {
    setQueryParam(e) {
      const debouncedQuery = debounce(
        () => this.fetchHeadlinesQuery({ param: 'q', val: e.target.value }),
        500
      )

      debouncedQuery()
    },
    ...mapActions(['fetchMoreHeadlines', 'fetchHeadlinesQuery'])
  }
}
</script>
