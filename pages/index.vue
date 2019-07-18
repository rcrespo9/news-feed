<template>
  <div>
    <NewsFeed header="Latest Headlines" :news-items="newsFeedItems" />
    <button v-if="isMoreResults" @click="fetchMoreHeadlines">
      Load More
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NewsFeed from '@/components/NewsFeed'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'newsFeedItems'
)

export default {
  components: { NewsFeed },
  computed: {
    ...mapGetters(['isMoreResults']),
    ...mapState(['newsFeedItems'])
  },
  async fetch({ store }) {
    await store.dispatch('newsFeedItems/fetchHeadlines')
  },
  methods: {
    ...mapActions(['fetchMoreHeadlines'])
  }
}
</script>
