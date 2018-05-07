export const moduleB = {
  changeTime ({ commit, state }) {
    let n = state.time > 0? state.time - 1 : 60;
    setTimeout(() => {
      commit('changeTime', n)
    }, 1000)
  }
}