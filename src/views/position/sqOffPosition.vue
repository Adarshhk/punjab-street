<template>
    <Modal1 size="lg" :popup = "true" :show = "showSqOffModal" @close="showSqOffModal = false">
      <template #body>
          <div class="text-center">
              <div class="text-3xl text-white mb-6">Are you sure?</div>
              <div class="text-white mt-2 ">
                Do you really want to squre off?  <br />
              </div>
          </div>
          <div class="px-5 py-2 flex justify-center gap-4 mt-4">
              <button type="button" @click="showSqOffModal = false" class="btn-close text-white border-[#FAA63E] border rounded-md px-5 py-2 hover:text-black hover:bg-[#FAA63E] transition-all duration-200">
                  No
              </button>
              <button type="button" @click="confirm" class="btn-danger text-white border-[#272727] border rounded-md px-5 py-2  hover:bg-red-500 transition-all duration-200">Yes</button>
          </div>
      </template>
    </Modal1>
</template>

<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { usePositionsStore } from "@/stores/matrix/position";

  const positionsStore = usePositionsStore();
  const { showSqOffModal } = storeToRefs(positionsStore)
  const { sqOffPosition } = positionsStore
  

  
  async function confirm() {
    let message:any=sqOffPosition();
    if(message){
        showSqOffModal.value = false;
    }
  }
</script>
  