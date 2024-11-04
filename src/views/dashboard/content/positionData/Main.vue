<template>
<div class="h-80 overflow-y-auto">
  <table class="w-full ">
    <thead class="bg-[#1E1E1E]">

      <tr>

        <th scope="col" class="px-5 max-w-min py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          STRATEGY NAME
        </th>
        <th scope="col" class="px-5 max-w-min py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          QTY
        </th>
        <th scope="col" class="px-5 max-w-min py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          TYPE
        </th>
        <th scope="col" class="px-5 max-w-min py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          STATUS
        </th>
        <th scope="col" class="px-5 max-w-min py-3 text-left text-xs font-medium text-white uppercase tracking-wider">

        </th>
      </tr>
    </thead>

    <tbody v-if="(showTableData && positions.length > 0) || (showManualTableData && manualPositions.length > 0)">
      <positionRow v-if="showTableData && mergedPositions.length > 0" v-for="position in mergedPositions"
        :item="position" />
    </tbody>

    <div v-else-if="!showTableData || !showManualTableData" class="flex">
      <LoadingIcon icon="puff" class="w-8 h-8" />
    </div>

    <div v-else class="flex flex-col items-center my-8">
      <div class="text-center">Data not found!!</div>
    </div>

  </table>
</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { usePositionsStore } from '@/stores/matrix/position'
import { useManualPositionsStore } from '@/stores/groups/manualPosition'
import { useProfileStore } from '@/stores/matrix/profile'
import positionRow from './positionRow.vue'
import paperTradeRow from './paperTradeRow.vue'


import { usePaperPositionsStore } from "@/stores/matrix/paperPositions";
const paperPositionsStore = usePaperPositionsStore();
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const positionsStore = usePositionsStore()
const manualPositionsStore = useManualPositionsStore()

const { isTabActive } = storeToRefs(positionsStore)

// define interface to ignore type warning error
interface Position {
  id: number
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
  return true;
});

const showManualTableData = computed<boolean>(() => {
  const state = manualPositionsStore.state[manualPositionsStore.endpoint];
  return true;
})


const paperPositions = computed<Position[]>(() => {
  const allPositions: Position[] = paperPositionsStore.paperPositions;
  if (!allPositions.length) {
    return [];
  }
  return allPositions.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
})

const showPaperPositions = computed<boolean>(() => {
  const state = paperPositionsStore.state[paperPositionsStore.endpoint];
  return true;
});

</script>


<style scoped lang="scss">
.intro-y::-webkit-scrollbar {
  height: 2px;
}

.sub-container {
  @apply xl:h-[calc(100vh-310px)] 2xl:h-[calc(100vh-380px)] w-full overflow-y-hidden;
}

.sub-container2 {
  @apply xl:h-[calc(100vh-310px)] 2xl:h-[calc(100vh-380px)] w-full overflow-y-hidden;
}
</style>
