export const state = () => ({
  newsFeedItems: [],
  page: 1,
  pageSize: 20,
  totalResults: '',
  query: '',
  category: '',
  country: 'us',
  language: 'en',
  isMoreResults: false
})

export const mutations = {
  SET_NEWS_ITEMS(state, items) {
    state.newsFeedItems = items
  },
  SET_TOTAL_RESULTS(state, totalResults) {
    state.totalResults = totalResults
  },
  INCREMENT_PAGE_NUM(state) {
    state.pageNum++
  }
}

export const actions = {
  async fetchHeadlines({ commit, state }) {
    const { category, country, page } = state
    try {
      const { articles, totalResults } = await this.$axios.$get(
        '/top-headlines',
        {
          params: { category, country, page },
          headers: { 'X-Api-Key': process.env.newsApiKey }
        }
      )

      commit('SET_NEWS_ITEMS', articles)
      commit('SET_TOTAL_RESULTS', totalResults)
    } catch (error) {
      throw new Error(error)
    }
  }
}
