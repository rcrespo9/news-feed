export const state = () => ({
  newsFeedItems: [],
  pageSize: 20,
  totalResults: '',
  page: 1,
  params: {
    q: '',
    category: '',
    country: 'us'
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
    state.page++
  },
  RESET_PAGE(state) {
    state.page = 1
  },
  SET_PARAM(state, { param, val }) {
    const { params } = state

    if (Object.prototype.hasOwnProperty.call(params, param)) {
      params[param] = val
    }
  }
}

export const actions = {
  async fetchHeadlines({ commit, state }) {
    try {
      const { page, params } = state

      const { articles, totalResults } = await this.$axios.$get(
        '/top-headlines',
        {
          params: { page, ...params },
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

  async fetchMoreHeadlines({ commit, dispatch, getters }) {
    try {
      if (getters.isMoreResults) {
        commit('INCREMENT_PAGE')
        await dispatch('fetchHeadlines')
      }
    } catch (error) {
      throw new Error(error)
    }
  },

  async fetchHeadlinesQuery({ commit, dispatch }, { param, val }) {
    commit('RESET_PAGE')
    commit('SET_PARAM', { param, val })

    try {
      await dispatch('fetchHeadlines')
    } catch (error) {
      throw new Error(error)
    }
  }
}
