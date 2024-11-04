<template>
    <tr class="hidden sm:table-row intro-x hover:bg-[#272727] transition-all duration-150" >
      <td class="py-4 px-4 text-white" >
        <div class="flex items-center text-nowrap" v-if="position.strategy" >
        <component v-if="containsIcon(position)"
          :is="position.strategy.image_url" class="h-4 w-4"
          :style="{ color: position.strategy.color, strokeWidth: 2.5 }"
        />
        &nbsp;{{ `${position.strategy.name}(${position.strategy.script})` }}
        </div>
        <span v-else>_</span>
      </td>
      

      <td class="py-4 px-4 text-white">
        <div class="flex items-center text-nowrap" v-if="position.broker">
          <img class="shadow-none h-4 w-4"
            :src="`${images[position.broker.broker_name]}`" alt=""
          />
          &nbsp;{{ `${position.broker.broker_name} (${position.broker.broker_userid})` }}
        </div>
        <span v-else>_</span>
      </td>
      <!-- <td class="text-center text-nowrap">
        {{ `${position.user.id}- ${position.user.name}` }}
      </td> -->
      <td class="py-4 px-4 text-white">
        {{ `${position.tradingsymbol}(${position.exchange})` }}
      </td>
      
      <td class="py-4 px-4 text-white">
        {{ position.product }}
      </td>
      <td class="py-4 px-4 text-white">
        {{ position.side }}
      </td>
      <td class="py-4 px-4 text-white">
        {{ position.quantity }}
      </td>
      
      <td class="text-left text-nowrap text-white">
        <div class="flex justify-between">
          <div class="flex " v-if="position.side === 'BUY' || position.status !== 'OPEN'">
            <span>{{ position.created_at.split('T')[1].replace('Z', '') }}</span>
            <span> @ {{ position.buy_price }}</span>
          </div>
          <div class="flex" v-else>_</div>
        </div>
      </td>
      <td class="text-left text-nowrap text-white">
        <div class="flex justify-between">
          <div class="flex" v-if="position.side === 'SELL' || position.status !== 'OPEN'">
            <span>{{ position.updated_at.split('T')[1].replace('Z', '') }}</span>
            <span> @ {{ position.sell_price }}</span>
          </div>
          <div class="flex" v-else>_</div>
        </div>
      </td>

      <td class="py-4 px-4 text-white">  
        {{ position.status }}
      </td>

      <td class="text-left text-nowrap font-bold text-white"> 
        <span :class="pnl < 0 ? 'text-red-500' : pnl > 0 ? 'text-green-500' : ''">
            {{ pnl > 0 ? '+' : '' }}{{ pnl? pnl : 0.00 }}
        </span> 
      </td>

      <td class="text-center ">
        <div class="px-4 py-4 whitespace-nowrap text-sm text-white" v-if="position.status === 'OPEN'">
              <button
                class="mt-6 border rounded-md transition-all duration-200 hover:bg-gray-400 hover:bg-opacity-60 border-gray-400 border-opacity-30 py-2 px-4 bg-opacity-0" @click="deleteSqOff(position)">
                <div class="flex justify-center align-middle">
                  <img :src="squareoff" alt="" class="w-5 h-4 mr-1">
                  <span class="text-xs text-opacity-45">Square off</span>
                </div>
              </button>
            </div>
      </td>
    </tr>




    <!-- for mobile screen  -->
    <div class="intro-x visible sm:hidden relative my-1" :class="{ 'shadow-md dark:shadow-slate-600 ': fullDetails, 'shadow-sm dark:shadow-slate-600': !fullDetails }">
      <div class="px-4" :class="{ 'bg-secondary-dark font-semibold': fullDetails }">
        <div @click="fullDetails = !fullDetails" class="flex justify-between items-center py-3 text-[0.6rem] xs:text-xs cursor-pointer" >
          <div class="flex items-center min-w-[140px]"> 
            <img v-if="position.broker" class="shadow-none h-4 w-4"
              :src="`${images[position.broker.broker_name]}`"
              alt=""
            /> {{ position.tradingsymbol }}
            <RightArrowIcon class="w-[12px] h-[12px] inline ml-1 transform rotate-90 transition text-white transition-delay-300" :class="{ 'rotate-[-90deg]': fullDetails, 'rotate-90': !fullDetails }" />
          </div>


          <div>
            {{ position.quantity }}/{{ position.side }}
          </div>
            
          <div class="text-white text-start min-w-[40px]">
            <span class="text-white" :class="pnl < 0 ? 'text-red-500' : pnl > 0 ? 'text-green-500' : ''">
              {{ pnl > 0 ? '+' : '' }}{{ pnl? pnl : 0.00 }}
            </span> 
          </div>
        </div>

        
      </div>

      <div v-if="fullDetails" class="p-2 capitalize bg-secondary-dark">
        <div class="flex flex-col text-xs xs:text-sm overflow-hidden bg-secondary border dark:border-slate-600 p-2 pl-4 rounded-lg">
          
          <div class="flex items-center">
            <div class="font-semibold text-white">Broker: &nbsp;&nbsp;</div>
            <div v-if="position.broker" class="flex">
              <img class="shadow-none h-3 w-3 mt-1"
                :src="`${images[position.broker.broker_name]}`"
                alt=""
              />
              &nbsp;{{ `${position.broker.broker_name}- ${position.broker.broker_userid}` }}
            </div> 
            <div v-else>_</div>
          </div>

          <div class="flex items-center">
            <div class="font-semibold">Strategy: &nbsp; &nbsp;</div>
            <div v-if="position.strategy" class="flex">
              <component v-if="containsIcon(position)"
                :is="position.strategy.image_url" class="h-3 w-3 mt-1"
                :style="{ color: position.strategy.color, strokeWidth: 2.5 }"
              />
              &nbsp;{{ `${position.strategy.name}(${position.strategy.script})` }}
            </div>
            <div v-else>_</div>
          </div>

          <div class="flex items-center">
            <div class="font-semibold">Buy Price: </div>
            <div class="ml-4">
              <div class="flex justify-between">
                <div class="flex" v-if="position.side === 'BUY' || position.status !== 'OPEN'">
                  <span>{{ position.created_at.split('T')[1].replace('Z', '') }}</span>
                  <span> @ {{ position.buy_price }}</span>
                </div>
                <div class="flex" v-else>_</div>
              </div>
            </div>
          </div>

          <div class="flex items-center ">
            <div class="font-semibold ">Sell Price: </div>
            <div class="ml-4">
              <div class="flex justify-between">
                <div class="flex text-white" v-if="position.side === 'SELL' || position.status !== 'OPEN'">
                  <span>{{ position.updated_at.split('T')[1].replace('Z', '') }}</span>
                  <span> @ {{ position.sell_price }}</span>
                </div>
                <div class="flex" v-else>_</div>
              </div>
            </div>
          </div>

          <div class="flex items-center">   
            <div class="font-semibold text-white">Exchange: </div>
            <div class="ml-4"> {{ position.exchange }} </div>  
          </div>

          <div class="flex items-center">   
            <div class="font-semibold">Position Status: </div>
            <div class="ml-4 m-1"> {{ position.status }}</div>  
          </div>


          <div class="flex items-center">
              <div class="flex flex-wrap justify-left ">
                <div class="font-semibold mr-2">ACTIONS: </div>

                <button class="delete-btn flex items-center text-white" @click="deleteSqOff(position)" v-if="position.status === 'OPEN'">
                  <DeleteIcon class="w-4 h-4" />Sq. Off
                </button>
              </div>
          </div>

        </div>
      </div>
    </div>
  
            
  </template>
  
  <script setup lang="ts">
  import { images } from '@/assets/img'
  import { storeToRefs } from 'pinia'
  import { ref, computed } from 'vue'
  import { usePositionsStore } from '@/stores/matrix/position'
  import { useManualPositionsStore } from '@/stores/groups/manualPosition'
  import  { useTickerStore } from '@/stores/matrix/ticker/ticker'
  import squareoff from '../../assets/img/squareoff.png'
  
  const positionsStore = usePositionsStore()
  const manualPositionsStore = useManualPositionsStore()
  const tickerStore = useTickerStore()
  
  const { showSqOffModal, dataForSqOff } = storeToRefs(positionsStore)
  const { manualDataForSqOff, showManualSqOffModal } = storeToRefs(manualPositionsStore)
  
  // define interface to ignore type warning error
  interface Position {
    id: number
    serialNo:string
    tradingsymbol: string
    strategy_id: number
    broker_id: number
    broker: {
      id: number
      broker_name: string
      broker_userid: string
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
    instrument_token: number
    quantity: number
    side: string
    last_price: number
    buy_price: number
    sell_price: number
    created_at: string
    updated_at: string
    exchange: string
    status: string
  }
  

  const props = defineProps({
    item: Object
  })

  const fullDetails = ref<boolean>(false)

  const position = computed<Position>(() => {
    const position = props.item
    return position as Position
  })
  
  const containsIcon = (data: any) => {
    if (data.strategy.image_url) {
      return true
    }
    return false
  }
  
  const deleteSqOff = (data: any) => {

    if(data.serialNo.startsWith("manualPosition")){
      showManualSqOffModal.value = true;
      manualDataForSqOff.value.position_id = data.id;

    } else if(data.serialNo.startsWith("position")){
      showSqOffModal.value = true;
      dataForSqOff.value.strategy_id = data.strategy_id;
      dataForSqOff.value.broker_id = data.broker_id;
      dataForSqOff.value.position_id = data.id;
    }
  }

  const last_price = computed(() => {
    let token = (position.value.instrument_token).toString()
    const newTick = tickerStore.getLastPrice(token);
    return newTick || position.value.last_price;
  });

  const pnl = computed(() => {
    let result: number = 0

    if (position.value.status == "OPEN") {
        if (position.value.side == "BUY") {
          if (position.value.buy_price != 0 && last_price.value) {

              result = ((last_price.value - position.value.buy_price) * position.value.quantity)
          } else {
              result = 0
          }

        } else if (position.value.side == "SELL" && last_price.value) {
          if (position.value.sell_price != 0) {
              result = ((position.value.sell_price - last_price.value) * position.value.quantity)
          } else {
              result = 0
          }
          } else {
          result = 0
          }
    } else if (position.value.status == "CLOSED") {
        if (position.value.sell_price != 0 && position.value.buy_price != 0) {
            result = ((position.value.sell_price * position.value.quantity) - (position.value.buy_price * position.value.quantity))
        } else {
            result = 0
        }
    }
    return parseFloat(result.toFixed(2));
  })


  
</script>
  