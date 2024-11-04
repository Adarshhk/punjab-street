<template>
    <div class="w-full h-full md:h-full">
      <div class="flex flex-col justify-center ">
        <!-- <div class="flex flex-wrap sm:flex-nowrap justify-end sm:justify-between items-center border-b border-third  px-1 sm:px-4 h-14">
          <div class="flex sm:w-auto justify-between items-center">
            <div class="font-semibold  dark:text-tableText mr-1 sm:mr-2">
            {{ matrixJoiners.length }} Strategy Joined
            </div>
          </div>
        </div> -->
        <div class="pt-2 mb-6 ml-4 ">
        <p class="text-xl font-normal text-white">My Strategy</p>
        <div class="flex mt-4 align-baseline justify-between">
          
          <div class="mr-6 text-white ">
            {{ matrixJoiners.length }} Strategy Joined
          </div>
        </div>
      </div>

        <div class="hidden sm:block">
          <div class="table-container text-nowrap ">
            <table class="mb-2 pb-5 w-full">
              <thead   style="background-color: #1E1E1E;">
                <tr class="text-start">
                  <!-- <th class="text-center whitespace-nowrap">Joiner Id</th> -->
                  <th class="py-4 px-4  text-left text-white font-normal">Strategy</th>
                  <th class="py-4 px-4  text-left text-white font-normal">Broker</th>
                  <!-- <th class="py-4 px-4  text-left text-white font-normal">User</th> -->
                  <th class="py-4 px-4  text-left text-white font-normal">Lot Size</th>
                  <th class="py-4 px-4  text-left text-white font-normal">ReEntry</th>
                  <th class="py-4 px-4  text-left text-white font-normal">ReEntry Triggered</th>
                  <th class="py-4 px-4  text-left text-white font-normal">Active</th>
                  <th class="py-4 px-4  text-left text-white font-normal">Joined At</th>
                  <th class="py-4 px-4  text-left text-white font-normal">ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                <matrixJoinerRow v-if="matrixJoiners.length > 0" v-for="matrixJoiner, i in matrixJoiners" :key="i"
                  :item="matrixJoiner"
                />

                <div v-else-if="!showTableData"
                  class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>

                <div v-else class="flex flex-col items-center mt-8" >
                  <div class="text-center"> Data not found!!</div>
                </div>
                
              </tbody>
            </table>

          </div>
        </div>






        <!-- for mobile device  -->    
        <div class="visible sm:hidden">
          <div class="flex justify-between font-bold text-[0.6rem] xs:text-xs bg-[#272727] text-white py-3 px-4 shadow">
              <div class="min-w-[100px]">Strategy</div>
              <div>Lot Size</div>
              <div class="">Active</div>
          </div>

          <div class="mobile-device-table">
            <matrixJoinerRow v-if="matrixJoiners.length > 0" v-for="matrixJoiner, i in matrixJoiners" :key="i"
              :item="matrixJoiner"
            />

            <div v-else-if="!showTableData" class="flex">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>

            <div v-else class="flex flex-col items-center mt-8" >
              <div class="text-center">Joiners not found!!</div>
            </div>
          </div>
        </div>


      </div>
    </div>
  <AddEditMatrixJoiner />
  <DeleteMatrixJoiner />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'


import AddEditMatrixJoiner from './addEditMatrixJoiner.vue'
import DeleteMatrixJoiner from './deleteMatrixJoiner.vue'
import matrixJoinerRow from './matrixJoinerRow.vue'
const matrixJoinersStore = useMatrixJoinersStore()



// define interface to ignore type warning error
interface MatrixJoiner {
  id: number
  strategy_id: number
  broker_id: number
  broker: any
  user: any
  strategy: any
  quantity: number
  re_entry: number
  re_entry_triggered: number
  is_active: boolean
  created_at: string
}
const matrixJoiners = computed<MatrixJoiner[]>(() => {
  return matrixJoinersStore.matrixJoiners.sort((a: any, b: any) => b.id - a.id)
})

const showTableData = computed<boolean>(() => {
    const state = matrixJoinersStore.state[matrixJoinersStore.endpoint];
    return state && state.loading === false;
});


</script>



<style scoped>
.mobile-device-table{
  @apply h-[100vh] w-full overflow-scroll text-white;
}

</style>