<template>
  <div>
    <div>index</div>
    <div>
      {{count}}
      <button @click="add">add</button>
    </div>
    <div>
      {{doneTodos}}
      <button @click="setTodos">todos</button>
    </div>
    <div>
      {{name}}
      <button @click="change">change</button>
    </div>
    <div>
      {{time}}
      <button @click="setTime">setTime</button>
    </div>
  </div>  
</template>

<script>
import { mapState,mapGetters } from 'vuex'

export default {
  components: {  },
  data () {
    return {
        test: 0,
    }
  },
  mounted() {
    this.init(); 
  },
  computed: {
    ...mapState({
      count: state => state.moduleA.count,
      todos: state => state.moduleA.todos,
      name: state => state.moduleB.name,
      time: state => state.moduleB.time,
    }),
    ...mapGetters(['doneTodos']),
  },
  methods: {
    init(){
      console.log(this.$store.getters)
    },
    add() {
      this.test++;
      this.$store.commit('increment',this.test);
    },
    setTodos() {
      let arr = this.$store.state.moduleA.todos;
      arr.push({
        id: 4,
        text: '4444',
        done: true
      })
      this.$store.commit('setTodos',arr);
    },
    change() {
      this.$store.commit('changeName','李四');
    },
    setTime() {
      this.$store.dispatch('changeTime');
    }
  }
}
</script>

<style lang="less" scoped>

</style>