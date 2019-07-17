export const state = () => ({
  newsFeedItems: [],
  page: 1,
  pageSize: 20,
  totalResults: '',
  params: {
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
  SET_NEWS_ITEMS(state, items) {
    state.newsFeedItems = items
  },
  ADD_MORE_NEWS_ITEMS(state, items) {
    state.newsFeedItems = [...state.newsFeedItems, ...items]
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
    const { page } = state.params

    try {
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

  loadMoreHeadlines({ commit, dispatch, getters }) {
    if (getters.isMoreResults) {
      dispatch('fetchHeadlines')
      commit('INCREMENT_PAGE_NUM')
    }
  }
}
