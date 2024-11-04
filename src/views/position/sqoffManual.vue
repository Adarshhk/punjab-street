<template>
    <Modal1 size="lg" :popup = "true" :show = "showManualSqOffModal" @close="showManualSqOffModal = false">
      <template #body>
          <div class="text-center">
              <div class="text-3xl">Are you sure?</div>
              <div class="text-slate-500 dark:text-slate-200 mt-2">
                Do you really want to squre off?  <br />
              </div>
          </div>
          <div class="px-5 py-2 text-center">
              <button type="button" @click="showManualSqOffModal = false" class="btn-close">
                  No
              </button>
              <button type="button" @click="confirm" class="btn-danger">Yes</button>
          </div>
      </template>
    </Modal1>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useManualPositionsStore } from '@/stores/groups/manualPosition'

  const manualPositionsStore = useManualPositionsStore();
  const { showManualSqOffModal } = storeToRefs(manualPositionsStore)
  const { sqOffManualPosition } = manualPositionsStore
  

  
  async function confirm() {
    let message:any=sqOffManualPosition();
    if(message){
        showManualSqOffModal.value = false;
    }
  }
  </script>
  