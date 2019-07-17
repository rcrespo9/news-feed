const NewsAPI = require('newsapi')
const newsapi = new NewsAPI(process.env.newsApiKey)

export const state = () => ({
  newsFeedItems: [],
  page: 1,
  totalResults: '',
  query: '',
  category: '',
  country: 'us',
  language: 'en',
  isMoreResults: false
})

export const mutations = {
  setNewsFeedItems(state, items) {
    state.newsFeedItems = items
  },
  incrementPageNum(state) {
    state.pageNum++
  }
}

export const actions = {
  fetchNewsItems({ commit, state }) {
    const { category, country, page } = state

    newsapi.v2
      .topHeadlines({
        category: category,
        country: country,
        page: page
      })
      .then((response) => {
        console.log(response) // eslint-disable-line
        commit('setNewsFeedItems', response.articles)
      })
  }
}
