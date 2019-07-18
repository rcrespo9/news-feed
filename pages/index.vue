<template>
  <div>
    <button v-if="isMoreResults" @click="fetchMoreHeadlines">
      Load More
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'newsFeedItems'
)

export default {
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
