<template>
  <label
    :for="id"
    class="form-button inline-flex items-center max-w-20 z-0 mt-4"
    :class="{
      'brightness-90 dark:brightness-75 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled
    }"
  >
    <input
      :id="id"
      :disabled="disabled"
      type="checkbox"
      :name="name"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked)"
      class="hidden w-0 opacity-0"
    />
    <div
      class="form-switch  rounded-full w-9 h-5 peer-checked:bg-[#5847f7]"
      :class="{
        'bg-primary border-primary shadow': modelValue,
        'bg-white dark:border-white': !modelValue
      }"
    >
      <div
        class="absolute top-[1px] left-[2px] h-4 w-4 bg-[#272727] rounded-full transform transition-transform duration-300 ease-in-out"
        :class="{
          'translate-x-3': modelValue,
          'translate-x-0': !modelValue
        }"
      ></div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default() {
      return `switch-${Math.random().toString(16).slice(2)}`;
    },
  },
  name: String,
  modelValue: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const id = computed(() => {
  return `${props.id}-${Math.random().toString(16).slice(2)}`;
});
</script>

<style scoped>
/* Primary background color when switch is active */
.bg-primary {
  background-color: #F9A43C; /* matching the indigo color */
}

.form-switch {
  position: relative;
  display: inline-block;
}

.form-switch div {
  position: absolute;
  transition: transform 0.3s;
}
</style>
