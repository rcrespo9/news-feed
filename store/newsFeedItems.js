export const state = () => ({
  newsFeedItems: [],
  pageSize: 20,
  totalResults: '',
  params: {
    page: 1,
    query: '',
    category: '',
    country: 'us',
    language: 'en'
  }
})

export const getters = {
  isMoreResults: (state) => {
    return state.totalResults !== state.newsFeedItems.length
  }
}

export const mutations = {
  SET_NEWS_ITEMS(state, newsFeedItems) {
    state.newsFeedItems = newsFeedItems
  },
  ADD_MORE_NEWS_ITEMS(state, newsFeedItems) {
    state.newsFeedItems = [...state.newsFeedItems, ...newsFeedItems]
  },
  SET_TOTAL_RESULTS(state, totalResults) {
    state.totalResults = totalResults
  },
  INCREMENT_PAGE(state) {
    state.params.page++
  }
}

export const actions = {
  async fetchHeadlines({ commit, state }) {
    try {
      const { page } = state.params
      const { articles, totalResults } = await this.$axios.$get(
        '/top-headlines',
        {
          params: { ...state.params },
          headers: { 'X-Api-Key': process.env.newsApiKey }
        }
      )

      if (page > 1) {
        commit('ADD_MORE_NEWS_ITEMS', articles)
      } else {
        commit('SET_NEWS_ITEMS', articles)
        commit('SET_TOTAL_RESULTS', totalResults)
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  fetchMoreHeadlines({ commit, dispatch, getters }) {
    if (getters.isMoreResults) {
      commit('INCREMENT_PAGE')
      dispatch('fetchHeadlines')
    }
  }
}
