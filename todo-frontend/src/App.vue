<template>
  <div id="app" >
      <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import './assets/main.css';

export default {
  components: {
      TodoList,
  },
};
</script>
