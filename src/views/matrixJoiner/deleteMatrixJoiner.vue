<template>
  <Modal1 size="lg" :popup = "true" :show = "showDeleteConfirmationModal" @close="showDeleteConfirmationModal = false">
      
      <template #body>
          <div class="text-center">
              <div class="text-3xl text-white mb-6">Are you sure?</div>
              <div class="text-white mt-2">
                  Do you really want to delete these records? <br />This process cannot
                  be undone.
              </div>
          </div>
          <div class="px-5 py-2 flex justify-center gap-4 mt-4">
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
  import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'
  const matrixJoinersStore = useMatrixJoinersStore()

  const { showDeleteConfirmationModal, idForDelete } = storeToRefs(matrixJoinersStore)

  const { deleteMatrixJoiner } = matrixJoinersStore

  async function confirm() {
    await deleteMatrixJoiner(idForDelete.value)
    showDeleteConfirmationModal.value = false
    idForDelete.value = 0
  }
</script>
