import debounce from 'lodash.debounce'

const initialParams = {
  q: '',
  category: '',
  country: 'us'
}

export const state = () => ({
  newsFeedItems: [],
  pageSize: 20,
  totalResults: '',
  page: 1,
  params: initialParams
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
  SET_INITIAL_PARAMS(state) {
    state.params = initialParams
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

  async filterHeadlines({ commit, dispatch }, { param, val }) {
    commit('RESET_PAGE')
    commit('SET_PARAM', { param, val })

    try {
      const debouncedFilter = debounce(() => dispatch('fetchHeadlines'), 500)

      await debouncedFilter()
    } catch (error) {
      throw new Error(error)
    }
  },

  resetFilters({ commit }) {
    commit('RESET_PAGE')
    commit('SET_INITIAL_PARAMS')
  }
}
