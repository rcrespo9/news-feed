<template>
  <section>
    <h1>{{ header }}</h1>
    <NewsFeedItem
      v-for="(newsItem, idx) in newsItems"
      :key="idx"
      :headline="newsItem.title"
      :author="newsItem.author"
      :date="newsItem.publishedAt"
      :description="newsItem.description"
      :url="newsItem.url"
      :image="newsItem.urlToImage"
    />
  </section>
</template>

<script>
import NewsFeedItem from './NewsFeedItem'
export default {
  name: 'NewsFeed',
  components: { NewsFeedItem },
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
