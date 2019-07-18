<template>
  <div>
    <p>{{ pageCount }}</p>
    <button @click="fetchMoreHeadlines">
      Load More
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    pageCount() {
      return this.$store.state.newsFeedItems.params.page
    }
  },
  async fetch({ store }) {
    await store.dispatch('newsFeedItems/fetchHeadlines')
  },
  methods: {
    ...mapActions({ fetchMoreHeadlines: 'newsFeedItems/fetchMoreHeadlines' })
  }
}
</script>
