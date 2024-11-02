<template>
    <div class="flex min-h-screen min-w-full justify-center items-center">
        <div class="min-w-full justify-center">
            <div class="max-w-md h-[600px] mx-auto p-6 bg-[#3C424A] shadow-md rounded-lg overflow-hidden">
                <h1 class="text-2xl font-bold mb-4 text-center text-gray-400">To-Do List</h1>
                <form @submit.prevent="addTodo" class="flex mb-4 relative">
                    <SVGAlign class="absolute top-3 left-3" />
                    <input
                        v-model="newTodo"
                        placeholder="Add a task..."
                        class="min-w-full pl-8 p-2 border text-slate-300 bg-[#343A40] border-[#2E3238] rounded-md focus:outline focus:outline-slate-400 raleway-medium"
                    />
                </form>
                <ul id="style-1" class="overflow-y-auto max-h-[450px] min-h-[450px] pr-2">
                    <li v-for="todo in todos" :key="todo.id" class="flex items-center mb-2">
                        <div class="checkbox-wrapper-4 flex-grow">
                            <input
                                class="inp-cbx"
                                :id="'todo-' + todo.id"
                                v-model="todo.completed"
                                @change="toggleCompleted(todo)"
                                type="checkbox"
                            />
                            <label class="cbx" :for="'todo-' + todo.id">
                                <span class="min-w-[18px]">
                                    <svg width="12px" height="10px">
                                        <use xlink:href="#check-4"></use>
                                    </svg>
                                </span>
                                <span class="text-slate-300 raleway-small">{{ todo.title }}</span>
                            </label>
                            <svg class="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        <div class="relative mr-4">
                            <button @click="toggleDropdown(todo.id)" class="text-white focus:outline-none">
                                <SVGThreeDots/>
                            </button>
                            <div v-if="dropdownOpen === todo.id" class="absolute right-0 w-40 mt-2 bg-[#343A40] rounded-md shadow-lg z-10 raleway-medium">
                                <ul class="text-gray-300">
                                    <li @click="pinTodo(todo)" class="flex items-center px-4 py-2 hover:bg-[#3C424A] hover:rounded-t-md cursor-pointer ">
                                        <SVGPin />
                                        Pin on the top
                                    </li>
                                    <li @click="addMemo(todo)" class="flex items-center px-4 py-2 hover:bg-[#3C424A] cursor-pointer">
                                        <SVGMemo />
                                        Add a memo
                                    </li>
                                    <li @click="deleteTodo(todo.id)" class="flex items-center px-4 py-2 hover:bg-[#3C424A] hover:rounded-b-md text-red-500 cursor-pointer">
                                        <SVGTrash />
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import SVGPin from '../assets/pin.svg'
import SVGMemo from '../assets/memo.svg'
import SVGTrash from '../assets/trash.svg'
import SVGAlign from '../assets/align-left.svg'
import SVGThreeDots from '../assets/three-dots.svg'

export default {
    data() {
        return {
            todos: [],
            newTodo: '',
            dropdownOpen: null,
            clickOutside: false,
        };
    },

    components: {
        SVGPin,
        SVGMemo,
        SVGTrash,
        SVGAlign,
        SVGThreeDots
    },
    methods: {
        async fetchTodos() {
            try {
                const response = await axios.get('http://localhost:5000/todos');
                this.todos = response.data.map(todo => ({
                    ...todo,
                    completed: Boolean(todo.completed)
                }));
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        },
        async addTodo() {
            if (!this.newTodo) return;
            try {
                const response = await axios.post('http://localhost:5000/todos', {
                    title: this.newTodo,
                    completed: false
                });
                this.todos.push(response.data);
                this.newTodo = '';
            } catch (error) {
                console.error("Failed to add todo:", error);
            }
        },
        async updateTodo(todo) {
            try {
                await axios.put(`http://localhost:5000/todos/${todo.id}`, {
                    title: todo.title,
                    completed: todo.completed
                });
            } catch (error) {
                console.error("Failed to update todo:", error);
            }
        },
        async deleteTodo(id) {
            try {
                await axios.delete(`http://localhost:5000/todos/${id}`);
                this.todos = this.todos.filter(todo => todo.id !== id);
            } catch (error) {
                console.error("Failed to delete todo:", error);
            }
        },
        toggleCompleted(todo) {
            this.updateTodo(todo);
        },
        toggleDropdown(id) {
            this.dropdownOpen = this.dropdownOpen === id ? null : id;
        },
        pinTodo(todo) {
            alert(`Pinned: ${todo.title}`);
            this.dropdownOpen = null; 
        },
        addMemo(todo) {
            alert(`Add a memo to: ${todo.title}`);
            this.dropdownOpen = null; 
        }
    },
    mounted() {
        this.fetchTodos();
    }
};
</script>

<style scoped>

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
