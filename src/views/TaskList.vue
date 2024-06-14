<template>
  <div class="pb-10 flex">
    <p class="bg-gradient-to-br from-primary from-45% to-secondary bg-clip-text">Filter tasks</p>

    <select name="sortBy" id="select" v-model="sortBy" class="border ml-4 rounded-md px-4">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="incompleted">Incomplete</option>
    </select>

    <div class="border rounded-md px-2 ml-auto">
      <div class="relative">
        <input
          types="text"
          placeholder="Search for a task..."
          v-model="searchValue"
          class="focus:outline-none"
        />

        <MagnifyingGlassIcon class="size-4 text-primary absolute right-0 top-1" />
      </div>
    </div>
  </div>

  <div class="h-10"><nav-bar /></div>

  <main class="flex-1">
    <div
      v-if="showTaskInput"
      @click="showTaskInput = false"
      class="fixed bottom-6 right-6 flex justify-end"
    >
      <button class="rounded-full bg-primary p-2 shadow hover:bg-secondary">
        <XMarkIcon class="size-5 text-white" />
      </button>
    </div>

    <div
      v-if="!showTaskInput"
      @click="showTaskInput = true"
      class="fixed bottom-6 right-6 flex justify-end"
    >
      <button
        class="rounded-full bg-primary p-2 shadow-lg hover:bg-secondary hover:shadow-secondary"
      >
        <PlusIcon class="size-5 text-white" />
      </button>
    </div>

    <task-form v-else />

    <div v-if="tasksLoaded && tasksStore.tasks.length > 0" class="flex flex-col gap-2 pb-20 mt-8">
      <TransitionGroup name="task-list" appear>
        <task-item v-for="task in filteredTasks" :key="task.id" :task="task" />
      </TransitionGroup>
    </div>

    <currently-no-tasks v-else />

    <NoTasksCompleted v-if="sortBy === 'completed' && filteredTasks.length === 0" />

    <tasks-are-complete v-if="sortBy === 'incompleted' && filteredTasks.length === 0" />
  </main>
</template>

<script setup>
  import {onMounted, computed, ref, watch} from 'vue'
  import {PlusIcon, XMarkIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/solid'
  import {onBeforeRouteLeave} from 'vue-router'

  import {useTasksStore} from '@/stores/taskStore'

  import NavBar from '@/components/NavBar.vue'
  import TaskItem from '@/components/TaskItem.vue'
  import TaskForm from '@/components/TaskForm.vue'
  import CurrentlyNoTasks from '@/components/CurrentlyNoTasks.vue'
  import NoTasksCompleted from '@/components/NoTasksCompleted.vue'
  import TasksAreComplete from '@/components/TasksAreComplete.vue'

  const sortBy = ref('all')
  const searchValue = ref('')
  const showTaskInput = ref(false)
  const tasksStore = useTasksStore()
  const tasksLoaded = ref(false)

  const filteredTasks = computed(() => {
    if (sortBy.value === 'completed') {
      return tasksStore.tasks.filter(task => task.isCompleted)
    }

    if (sortBy.value === 'incompleted') {
      return tasksStore.tasks.filter(task => !task.isCompleted)
    }

    if (searchValue.value) {
      return tasksStore.tasks.filter(({task}) => {
        return task.toUpperCase().includes(searchValue.value.toUpperCase())
      })
    }

    return tasksStore.tasks
  })

  onBeforeRouteLeave(() => {
    tasksStore.tasks.forEach(task => (task.isEditing = false))
  })

  onMounted(() => {
    tasksStore.fetchTasks()
    tasksLoaded.value = true
  })

  watch(tasksStore.tasks, () => {
    tasksStore.saveTasks()
    tasksStore.fetchTasks()
  })
</script>

<style scoped>
  .task-list-enter-active,
  .task-list-leave-active {
    transition: all 0.4s ease-in-out;
  }

  .task-list-enter-from {
    transform: translateY(20%);
    opacity: 0;
  }

  .task-list-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
</style>
