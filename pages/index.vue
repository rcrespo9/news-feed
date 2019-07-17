<template>
  <div />
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('news-feed-items/fetchNewsItems')
  }
}
</script>
