// mutations
export const moduleA = {
  increment (state,v) {
    state.count = v;
  },
  setTodos(state,v) {
    state.todos = v;
  }
};

export const moduleB = {
  changeName (state,v) {
    state.name = v;
  },
  changeTime (state,v) {
    console.log('v',v)
    state.time = v;
  }
};