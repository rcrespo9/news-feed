<template>
  <div>
    <input type="text" data-param="q" @input="filterWatcher" />
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
  computed: {
    ...mapGetters(['isMoreResults']),
    ...mapState(['newsFeedItems', 'params'])
  },
  async fetch({ store }) {
    await store.dispatch('newsFeedItems/fetchHeadlines')
  },
  methods: {
    ...mapActions(['fetchMoreHeadlines', 'fetchHeadlinesQuery']),
    filterWatcher(e) {
      const { value, dataset } = e.target

      const debouncedQuery = debounce(
        () => this.fetchHeadlinesQuery({ param: dataset.param, val: value }),
        500
      )

      debouncedQuery()
    }
  }
}
</script>
