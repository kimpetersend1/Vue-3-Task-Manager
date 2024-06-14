<template>
  <div class="flex h-10 items-center justify-end">
    <RouterLink to="/">
      <ArrowUturnLeftIcon class="size-6 text-primary hover:text-secondary xl:size-8" />
    </RouterLink>
  </div>

  <div class="flex flex-col items-center justify-center text-center">
    <h1
      class="mb-12 bg-gradient-to-br from-primary from-45% to-secondary bg-clip-text text-7xl font-semibold text-transparent"
    >
      Task Manager.
    </h1>

    <div class="prose xl:prose-xl 2xl:prose-2xl">
      <h3>
        <span class="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          Task Manager
        </span>
        is a simple tool to keep your daily tasks organized.
      </h3>

      <p>Easily add, edit, check off, and delete tasks to stay on top of what you need to do.</p>
    </div>
  </div>
</template>

<script setup>
  import {ArrowUturnLeftIcon} from '@heroicons/vue/24/solid'
</script>
