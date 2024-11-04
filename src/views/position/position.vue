<template>
  <div class="w-full h-full md:h-full bg-[#141313] p-2">

    <div class=" flex flex-col justify-center">
      <!-- <div class="flex flex-wrap sm:flex-nowrap justify-between border-b border-third shadow shadow-third items-center px-1 sm:px-4 h-14">
          <div class="flex px-1 dark:text-tableText text-lg font-semibold">
              Today's Profit :&nbsp; 
                
          </div>
        
        <div class="flex sm:w-auto justify-between items-center">
          <div class="font-semibold text-gray-700 dark:text-tableText mr-1 sm:mr-2">
            
          </div>
          
        </div>
      </div> -->
      <div class="pt-2 mb-6 ml-4 ">
        <p class="text-xl font-normal text-white">Positions</p>
        <div class="flex mt-4 align-baseline justify-between">
          <div class="flex">
            <span class="mr-3 text-sm text-white font-extralight self-center ">Today's Profit: </span>
            <TotalProfit greenColor="text-green-600" />
          </div>
          <div class="mr-6 text-white ">
            {{ mergedPositions.length }}  Positions
          </div>
        </div>
      </div>

      <div class="hidden sm:block">
        <div class="table-container text-nowrap overflow-x-auto w-full">

          <table class="mb-2 pb-5">
            <thead class="bg-[#1E1E1E] ">
              <tr class="text-start">
                <th class="py-4 px-4  text-left text-white font-normal">Strategy</th>
                <th v-if="profile && profile.user_role !== 'Paper'" class="py-4 px-4  text-left text-white font-normal">Broker</th>
                <th class="py-4 px-4  text-left text-white font-normal">Script</th>
                <th class="py-4 px-4  text-left text-white font-normal">Product</th>
                <th class="py-4 px-4  text-left text-white font-normal">Side</th>
                <th class="py-4 px-4  text-left text-white font-normal">Quantity</th>
                <th class="py-4 px-4  text-left text-white font-normal">Buy Price</th>
                <th class="py-4 px-4  text-left text-white font-normal">Sell Price</th>
                <th class="py-4 px-4  text-left text-white font-normal">Position Status</th>
                <th class="py-4 px-4  text-left text-white font-normal">P&L</th>
                <th v-if="profile && profile.user_role !== 'Paper'" class="py-4 px-4  text-left text-white font-normal">ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              <template v-if="profile && profile.user_role !== 'Paper'">
                <template
                  v-if="(showTableData && positions.length > 0) || (showManualTableData && manualPositions.length > 0)">
                  <positionRow v-if="showTableData && mergedPositions.length > 0" v-for="position in mergedPositions"
                    :item="position" />
                </template>
                <div v-else-if="!showTableData || !showManualTableData"
                  class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>

                <tr v-else>
                  <td class="text-center">
                    Data not found!!
                  </td>
                </tr>
              </template>

              <template v-else>
                <paperTradeRow v-if="showPaperPositions && paperPositions.length > 0" v-for="position in paperPositions"
                  :item="position" />

                <div v-else-if="!showPaperPositions"
                  class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <LoadingIcon icon="puff" class="w-8 h-8" />
                </div>

                <tr v-else>
                  <td class="text-center">
                    Data not found!!
                  </td>
                </tr>
              </template>

            </tbody>
          </table>

        </div>
      </div>






      <!-- for mobile device  -->

      <div class="visible sm:hidden">
        <div
          class="flex justify-between font-bold text-sm xs:text-base bg-[#272727] text-white py-3 px-4 shadow ">
          <div>Trading Symbol </div>
          <div class="">Quantity</div>
          <div>P&L</div>
        </div>

        <div class="mobile-device-table">
          <template v-if="profile && profile.user_role !== 'Paper'">
            <template
              v-if="(showTableData && positions.length > 0) || (showManualTableData && manualPositions.length > 0)">
              <positionRow v-if="showTableData && mergedPositions.length > 0" v-for="position in mergedPositions"
                :item="position" />
            </template>
            <div v-else-if="!showTableData || !showManualTableData" class="flex">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>

            <div v-else class="flex flex-col items-center mt-8">
              <div class="text-center">Data not found!!</div>
            </div>
          </template>

          <template v-else>
            <paperTradeRow v-if="showPaperPositions && paperPositions.length > 0" v-for="position in paperPositions"
              :item="position" />

            <div v-else-if="!showPaperPositions" class="flex">
              <LoadingIcon icon="puff" class="w-8 h-8" />
            </div>

            <div v-else class="flex flex-col items-center mt-8">
              <div class="text-center">Data not found!!</div>
            </div>
          </template>
        </div>

      </div>


    </div>
  </div>

  <sqOffPosition />
  <sqoffManual />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { usePositionsStore } from '@/stores/matrix/position'
import { useManualPositionsStore } from '@/stores/groups/manualPosition'
import TotalProfit from '@/stores/utils/totalpnl.vue'
import sqOffPosition from './sqOffPosition.vue'
import sqoffManual from './sqoffManual.vue'
import positionRow from './positionRow.vue'
import paperTradeRow from './paperTradeRow.vue'

import { useProfileStore } from '@/stores/matrix/profile';
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

import { usePaperPositionsStore } from "@/stores/matrix/paperPositions";
const paperPositionsStore = usePaperPositionsStore();

const positionsStore = usePositionsStore()
const manualPositionsStore = useManualPositionsStore()

// define interface to ignore type warning error
interface Position {
  id: number
  serialNo: string
  tradingsymbol: string
  strategy_id: number
  broker_id: number
  broker: {
    id: number
    broker_name: string
  }
  user: {
    id: number
    name: string
  }
  strategy: {
    id: number
    name: string
    script: string
    color: string
    image_url: string
  }
  product: string
  quantity: number
  side: string
  buy_price: number
  sell_price: number
  created_at: string
  updated_at: string
  exchange: string
  status: string
  // pnl: number
}


const positions = computed<Position[]>(() => {
  return positionsStore.positions.map((pos: Position, index: number) => ({
    ...pos,
    serialNo: `position-${index}`
  }));
})

const manualPositions = computed<Position[]>(() => {
  return manualPositionsStore.manualPositions.map((pos: Position, index: number) => ({
    ...pos,
    serialNo: `manualPosition-${index}`
  }));
})

const mergedPositions = computed<Position[]>(() => {
  const allPositions: Position[] = [...positions.value, ...manualPositions.value];
  if (!allPositions.length) {
    return [];
  }
  // Sort positions by updated_at in descending order
  return allPositions.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });

});


const showTableData = computed<boolean>(() => {
  const state = positionsStore.state[positionsStore.endpoint];
  // return state && state.loading === false;
  return true;
});

const showManualTableData = computed<boolean>(() => {
  const state = manualPositionsStore.state[manualPositionsStore.endpoint];
  // return state && state.loading === false;
  return true;
})


const paperPositions = computed<Position[]>(() => {
  const allPositions: Position[] = paperPositionsStore.paperPositions;

  return allPositions.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });

})

const showPaperPositions = computed<boolean>(() => {
  const state = paperPositionsStore.state[paperPositionsStore.endpoint];
  // return state && state.loading === false;
  return true;
});

</script>


<style scoped lang="scss">
.pencil-background {
  border-radius: 100px;
  border: 1px solid rgb(var(--color-primary));
  width: 300px;
  height: 60px;
  background: linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-third)));
  clip-path: polygon(0 19%, 87% 20%, 87% 20%, 100% 54%, 87% 82%, 87% 82%, 0% 80%);
  transition: 0.5s;
}

.dark .pencil-background {
  background: linear-gradient(to right, #000, rgb(var(--color-primary)));
}

.profit:hover .pencil-background {
  width: 320px;
}

.mobile-device-table {
  @apply h-[calc(100vh-209px)] w-full overflow-y-scroll text-white;
}
</style>
