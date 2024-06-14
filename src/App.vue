<template>
  <div class="flex justify-center font-nunito text-slate-800">
    <div class="h-screen w-full p-5 md:w-2/3"><router-view /></div>
  </div>
</template>

<script setup>
  import {RouterView} from 'vue-router'
</script>
