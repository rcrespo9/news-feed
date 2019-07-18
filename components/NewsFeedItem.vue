<template>
  <article>
    <a :href="url" target="_blank" rel="nofollow noopener noreferrer">
      <div>
        <time :datetime="date" :title="humanReadableDate">{{
          formattedDate
        }}</time>
        <h2>{{ headline }}</h2>
        <address>{{ author }}</address>
        <p>{{ description }}</p>
      </div>
      <!-- <img :src="image" :alt="description" /> -->
    </a>
  </article>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'NewsFeedItem',
  props: {
    headline: String,
    author: String,
    url: String,
    date: Date,
    image: String,
    description: String
  },
  computed: {
    formattedDate() {
      return format(this.date, 'MM-DD-YYYY')
    },
    humanReadableDate() {
      return format(this.date, 'MMMM Do, YYYY')
    }
  }
}
</script>

<style></style>
