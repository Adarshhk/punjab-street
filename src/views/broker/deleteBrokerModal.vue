<template>
  <Modal1 size="lg" :popup = "true" :show = "showDeleteConfirmationModal" @close="showDeleteConfirmationModal = false">
      
      <template #body>
          <div class="text-center text-white">
              <div class="text-3xl">Are you sure?</div>
              <div class="text-slate-500 dark:text-slate-200 mt-2">
                  Do you really want to delete these records? <br />This process cannot
                  be undone.
              </div>
          </div>
          <div class="px-5 py-2 mt-5 text-center flex gap-4 justify-center">
              <button type="button" @click="showDeleteConfirmationModal = false" class="btn-close text-white border-[#FAA63E] border rounded-md px-5 py-2 hover:text-black hover:bg-[#FAA63E] transition-all duration-200">
                  Cancel
              </button>
              <button type="button" @click="confirm" class="btn-danger text-white border-[#272727] border rounded-md px-5 py-2  hover:bg-red-500 transition-all duration-200">Delete</button>
          </div>
      </template>
      
  </Modal1>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBrokersStore } from '@/stores/matrix/broker'

const brokersStore = useBrokersStore()

const { showDeleteConfirmationModal, idForDelete } = storeToRefs(brokersStore)

const { deleteBroker } = brokersStore

async function confirm() {
  await deleteBroker(idForDelete.value)
  showDeleteConfirmationModal.value = false
  idForDelete.value = 0
}
</script>
