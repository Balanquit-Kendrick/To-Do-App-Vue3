<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <h2 class="text-xl font-bold mb-4">Edit Task</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            v-model="editedTitle"
            class="w-full p-2 border rounded"
            placeholder="Edit task title"
            required
          />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="$emit('close')" class="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedTitle: this.todo.title
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('update-todo', { ...this.todo, title: this.editedTitle });
    }
  },
};
</script>

<style scoped>
</style>
