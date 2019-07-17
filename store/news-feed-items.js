export const state = () => ({
  newsFeedItems: [],
  pageNum: 1
})

export const mutations = {
  setNewsFeedItems(state, items) {
    state.newsFeedItems = items
  },
  incrementPageNum(state) {
    state.pageNum++
  }
}
