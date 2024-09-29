<template>
  <div>
    <label class="bg-green-500 m-2 text-white"> Victorias: {{ wins }}</label>
    <label class="bg-red-500 m-2 text-white"> Derrotas: {{ loses }}</label>
  </div>
</template>

<script setup lang="ts">
interface props {
  wins: number;
  loses: number;
}

defineProps<props>();
</script>

<style lang="scss" scoped></style>
