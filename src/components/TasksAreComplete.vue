<template>
  <div class="flex flex-col items-center gap-4">
    <p
      class="flex items-center text-3xl font-semibold lg:my-24 lg:text-center bg-gradient-to-br from-primary from-45% to-secondary bg-clip-text text-transparent"
    >
      Looks like all your tasks are complete
      <CheckBadgeIcon class="size-7 text-green ml-3" />
    </p>
  </div>
</template>

<script setup>
  import {CheckBadgeIcon} from '@heroicons/vue/24/solid'
</script>
