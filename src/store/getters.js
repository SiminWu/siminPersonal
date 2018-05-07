export const moduleA = {
  doneTodos(state,getters) {
    return state.todos.filter(todo => todo.done)
  }
}