<template>

<tr class="hover:bg-[#272727] transition-all duration-150 border-b border-[#272727]">
    <td class="px-4 py-4 whitespace-nowrap text-sm text-white w-[200px] ">
      {{ position.strategy.name }}
    </td>
    <td class="pl-4 py-4 whitespace-nowrap text-sm text-white">
      {{ position.quantity }}
    </td>
    <td class="pl-4 py-4 whitespace-nowrap text-sm text-white">
      {{ position.side }}
    </td>

    <td class="pl-4 py-4 whitespace-nowrap text-sm text-white">
      {{ position.status }}
    </td>
    <td class=" pr-4 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button :id="key" @click="toggleDetails" class="text-white hover:text-teal-900">
        <RightArrowIcon class="w-[12px] h-[12px] inline ml-1 transform transition" :class="{ 'rotate-[-90deg]': fullDetails, 'rotate-90': !fullDetails }" />
      </button>
    </td>
  </tr>
  <tr>
    <td colspan="5" class="p-0">
      <transition name="expand">
        <div v-if="fullDetails" class="expanded-row">
          <div class="flex">
            <div class="px-4 py-4 w-[200px]  whitespace-nowrap text-base text-white">
              <p class="text-white opacity-50 mb-4 text-xs">Broker</p>
              {{ position.broker.broker_name }}
            </div>
            <div class="px-4 py-4 w-[105px] whitespace-nowrap text-base text-white">
              <p class="text-white opacity-50 mb-4 text-xs">Buy Price</p>
              ${{ position.buy_price }}
            </div>
            <div class="px-4 py-4 ml-5 whitespace-nowrap text-base text-white">
              <p class="text-white opacity-50 mb-4 text-xs">Sell Price</p>
              ${{ position.sell_price }}
            </div>
            <div class="px-4 py-4 ml-14 whitespace-nowrap text-sm text-white">
              <p class="text-white opacity-50 mb-4 text-xs font-light">Date</p>
              {{ position.created_at.slice(0, 10) }}
            </div>
            <div class="px-4 py-4 whitespace-nowrap text-sm text-white" v-if="position.status === 'OPEN'">
              <button
                class="mt-6 border rounded-md transition-all duration-200 hover:bg-gray-400 hover:bg-opacity-60 border-gray-400 border-opacity-30 py-2 px-4 bg-opacity-0" @click="deleteSqOff(position)">
                <div class="flex justify-center align-middle">
                  <img :src="squareoff" alt="" class="w-5 h-4 mr-1">
                  <span class="text-xs text-opacity-45">Square off</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </td>
  </tr>

</template>

<script setup lang="ts">
import { images } from '@/assets/img'
import { ref, computed } from 'vue'
import { usePositionsStore } from '@/stores/matrix/position'
import { useTickerStore } from '@/stores/matrix/ticker/ticker'
import squareoff from '@/assets/img/squareoff.png'

const positionsStore = usePositionsStore()
const tickerStore = useTickerStore()

interface Position {
  id: number
  tradingsymbol: string
  strategy_id: number
  broker_id: number
  broker: {
    id: number
    broker_name: string
    broker_userid: string
  }
  strategy: {
    id: number
    name: string
  }
  quantity: number
  side: string
  buy_price: number
  sell_price: number
  created_at: string
  updated_at: string
  exchange: string
  status: string
}


const props = defineProps({
  item: Object,
  index: Number // Adding index prop to track position
})

const fullDetails = ref(false)

const position = computed(() => {
  const position = props.item as Position
  return position
})

const toggleDetails = () =>[
  fullDetails.value = !fullDetails.value
]

const pnl = computed(() => {
  let result = 0
  if (position.value.status === 'OPEN') {
    result = (position.value.side === 'BUY' ? position.value.buy_price : position.value.sell_price) - position.value.buy_price
  } else {
    result = position.value.sell_price - position.value.buy_price
  }
  return result.toFixed(2)
})

// Function to check if row is even
const isEven = (index: number) => index % 2 === 0
</script>

<style scoped>
.intro-x {
  @apply text-sm;
}

.bg-gray-100 {
  background-color: #f5f5f5;
}
.expanded-row {
   /* This matches the bg-gray-800 from Tailwind */
  overflow: hidden;
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-in-out;
  max-height: 200px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
}
</style>
