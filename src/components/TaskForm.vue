<template>
  <div class="fixed bottom-20 left-6 right-6 z-10">
    <Transition>
      <div v-show="isTaskEmpty" class="font-semibold italic text-red">
        <p>Task cannot be empty</p>
      </div>
    </Transition>

    <div class="flex justify-center m-auto items-center gap-4">
      <input
        class="h-10 flex-grow rounded-lg border-2 border-black px-4 focus:shadow-lg focus:outline-none"
        v-model="task"
        type="text"
        placeholder="Add a task..."
        @keyup.enter="createTask"
      />

      <button class="rounded-full bg-primary p-2 hover:bg-secondary" @click="createTask">
        <PlusIcon class="size-5 text-white" />
      </button>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import {PlusIcon} from '@heroicons/vue/24/solid'
  import {useTasksStore} from '@/stores/taskStore'

  const isTaskEmpty = ref(false)
  const task = ref('')
  const tasksStore = useTasksStore()

  const createTask = () => {
    if (task.value !== '') {
      tasksStore.addTask(task.value)
      task.value = ''
      isTaskEmpty.value = false

      return
    }

    isTaskEmpty.value = true

    setTimeout(() => {
      isTaskEmpty.value = false
    }, 3000)
  }
</script>

<style scoped>
  .v-enter-from,
  .v-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease-out;
  }
</style>
