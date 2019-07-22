<template>
  <article>
    <a :href="url" target="_blank" rel="nofollow noopener noreferrer">
      <div>
        <time :datetime="date" :title="formattedDate">{{ formattedDate }}</time>
        <h2>{{ headline }}</h2>
        <address>{{ author }}</address>
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
    headline: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    formattedDate() {
      return format(this.date, 'MMMM Do, YYYY')
    }
  }
}
</script>

<style></style>
