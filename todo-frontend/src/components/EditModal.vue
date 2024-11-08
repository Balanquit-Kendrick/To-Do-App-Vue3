<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ">
    <div class="bg-[#3C424A] rounded-lg shadow-lg p-6 w-1/4 ">
      <h2 class="text-xl text-gray-300 font-bold raleway-large">Edit Task</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="title" class="block text-gray-400 raleway-medium my-1">Title</label>
          <input
            type="text"
            id="title"
            v-model="editedTitle"
            class="w-full p-2 border bg-[#343A40] text-gray-300 border-[#2E3238] rounded-md focus:outline focus:outline-slate-400 raleway-medium"
            placeholder="Add Title"
            required
          />
        </div>
        <div class="mb-4">
          <label for="memo" class="block text-gray-400 raleway-medium my-1">Memo</label>
          <input
            type="text"
            id="memo"
            v-model="editedMemo"
            class="w-full p-2 border bg-[#343A40] text-gray-300 border-[#2E3238] rounded-md focus:outline focus:outline-slate-400 raleway-medium"
            placeholder="Add Memo"
            required
          />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="$emit('close')" class="mr-2 px-4 py-2 bg-gray-400 rounded raleway-medium">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded raleway-medium">Save</button>
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
      editedTitle: this.todo.title,
      editedMemo: this.todo.memo
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('update-todo', { ...this.todo, title: this.editedTitle , memo: this.editedMemo });
    }
  },
};
</script>

<style scoped>
</style>
