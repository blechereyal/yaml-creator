<template>
<div class="w-full">
    <label v-if="props.label" class="block text-sm font-medium leading-6 text-gray-900">{{ props.label }}</label>
    <div class="mt-2">
      <input v-model="model" :type="props.type || 'text'" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
</div>
</template>
<script setup lang="ts" >
const props = defineProps<{
  label?: string,
  type?: string,
}>();


const model = defineModel();
</script>