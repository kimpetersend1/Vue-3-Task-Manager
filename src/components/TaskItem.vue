<template>
  <Transition>
    <div
      v-show="true"
      class="group flex h-14 w-full items-center gap-2 rounded-lg bg-white border shadow px-4 hover:bg-primary/15 hover:border-primary"
    >
      <!-- Checkbox mark as complete -->

      <label class="flex w-1/12 cursor-pointer items-center">
        <input
          type="checkbox"
          :checked="task.isCompleted"
          @input="tasksStore.toggleTaskCompletion(task.id)"
          class="hidden"
        />
        <div class="flex size-6 items-center justify-center rounded-full border-2 border-primary">
          <CheckCircleIcon v-if="task.isCompleted" class="pointer-events-none text-primary" />
        </div>
      </label>

      <!-- Task name -->

      <div
        class="flex items-center"
        :class="isConfirmationPending || task.isEditing ? 'w-7/12 overflow-hidden' : 'w-9/12'"
      >
        <input
          v-if="task.isEditing"
          type="text"
          class="flex-grow border-b-2 border-primary bg-transparent focus:outline-none"
          v-model="editedTask"
          @keyup.enter="tasksStore.updateTask(task.id, editedTask)"
        />

        <div v-else :class="task.isCompleted && 'line-through'" class="truncate">
          {{ task.task }}
        </div>

        <div
          v-if="task.isCompleted"
          class="ml-3 text-xs bg-green text-white py-1 px-2 rounded-full"
        >
          Completed
        </div>
      </div>

      <!-- Edit, Delete and Mark as Complete Actions -->

      <div
        class="flex w-2/12 justify-end gap-2"
        :class="
          task.isEditing || isConfirmationPending === true
            ? 'visible w-5/12'
            : 'invisible group-hover:visible'
        "
      >
        <CheckIcon
          v-if="task.isEditing"
          @click="tasksStore.updateTask(task.id, editedTask)"
          class="size-5 cursor-pointer transition-all duration-150 hover:scale-125 text-green"
        />

        <XMarkIcon
          v-if="task.isEditing"
          @click="tasksStore.cancelEdit(task.id), (editedTask = task.task)"
          class="size-5 cursor-pointer hover:text-red"
        />

        <PencilIcon
          v-if="!task.isEditing && !task.isCompleted && isConfirmationPending === false"
          @click="tasksStore.editTask(task.id)"
          class="size-5 cursor-pointer transition-all duration-150 hover:scale-125 hover:text-primary"
        />

        <TrashIcon
          v-if="isConfirmationPending === false"
          @click="isConfirmationPending = true"
          class="size-5 cursor-pointer transition-all duration-150 hover:scale-125 hover:text-red"
        />

        <div v-if="isConfirmationPending === true" class="flex items-center gap-2 rounded-lg p-1">
          <p class="font-semibold">Delete?</p>

          <TrashIcon
            @click="tasksStore.deleteTask(task.id), (isConfirmationPending = false)"
            class="size-5 cursor-pointer transition-all duration-150 hover:scale-125 hover:text-red"
          />

          <ArrowUturnLeftIcon
            @click="isConfirmationPending = false"
            class="size-5 cursor-pointer transition-all duration-150 hover:scale-90 hover:text-secondary"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
  import {ref, watch} from 'vue'
  import {useTasksStore} from '@/stores/taskStore'
  import {
    PencilIcon,
    TrashIcon,
    CheckIcon,
    XMarkIcon,
    CheckCircleIcon,
    ArrowUturnLeftIcon
  } from '@heroicons/vue/24/solid'

  const isConfirmationPending = ref(false)
  const tasksStore = useTasksStore()

  const props = defineProps({
    task: {
      type: Object,
      required: true
    }
  })

  const editedTask = ref(props.task.task)

  watch(tasksStore.tasks, () => {
    tasksStore.saveTasks()
    tasksStore.fetchTasks()
  })
</script>
