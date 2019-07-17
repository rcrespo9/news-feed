export const state = () => ({
  newsFeedItems: [],
  pageNum: 1,
  query: '',
  category: '',
  country: 'us',
  language: 'en'
})

export const mutations = {
  setNewsFeedItems(state, items) {
    state.newsFeedItems = items
  },
  incrementPageNum(state) {
    state.pageNum++
  }
}
