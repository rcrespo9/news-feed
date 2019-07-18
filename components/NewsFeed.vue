<template>
  <section>
    <h1>{{ header }}</h1>
    <NewsFeedItem
      v-for="(newsItem, idx) in newsItems"
      :key="idx"
      :headline="newsItem.title"
      :author="newsItem.author"
      :date="newsItem.publishedAt | validatedDate"
      :description="newsItem.description"
      :url="newsItem.url"
    />
  </section>
</template>

<script>
import NewsFeedItem from './NewsFeedItem'
export default {
  name: 'NewsFeed',
  components: { NewsFeedItem },
  filters: {
    validatedDate(date) {
      if (!date) return ''
      return new Date(date)
    }
  },
  props: {
    header: {
      type: String,
      required: true
    },
    newsItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
