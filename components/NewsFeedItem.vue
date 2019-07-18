<template>
  <article>
    <a :href="url" target="_blank" rel="nofollow noreferrer">
      <div>
        <time pubdate :datetime="date">{{ date }}</time>
        <h2>{{ headline }}</h2>
        <address>{{ author }}</address>
        <p>{{ description }}</p>
      </div>
      <img :src="image" :alt="description" />
    </a>
  </article>
</template>

<script>
export default {
  name: 'NewsFeedItem',
  props: {
    headline: String,
    author: String,
    url: String,
    date: Date,
    image: String,
    description: String
  }
}
</script>

<style></style>
