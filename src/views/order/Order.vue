<template>
  <div class="w-full h-full md:h-full bg-[#141313] p-2">

    <div class=" mt-0 mx-0  flex flex-col justify-center ">
      <div class="pt-2 mb-6 ml-4 flex justify-between">
      <p class="text-xl font-normal text-white">Orders</p>
      <span class="text-sm mr-10 font-normal text-white">

        {{ mergedOrders.length }} Orders
      </span>
      </div>
      
      <div class="hidden sm:block">
        <div class="table-container text-nowrap">
          <table class="mb-2 pb-5">
            <thead class="bg-[#1E1E1E]">
              <tr class="text-start ">
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Time</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Broker</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Strategy</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Script</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Quantity</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                <th class="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Product Type</th>
              </tr>
            </thead>

            <tbody>
              <template v-if="(showTableData && orders.length > 0) || (showManualTableData && manualOrders.length > 0)">
                <orderRow v-if="showTableData && mergedOrders.length > 0" v-for="(order, i) in mergedOrders" :item="order" :index="i+1" />
              </template>
              
              <div v-else-if="!showTableData || !showManualTableData"
                class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                <LoadingIcon icon="puff" class="w-8 h-8" />
              </div>

              <tr v-else>
                <td colspan="10" class="text-center">No Orders Found</td>
              </tr>
              
            </tbody>
          </table>

        </div>
      </div>






      <!-- for mobile device  -->    

      <div class="visible sm:hidden" >
        <div class="flex justify-between font-bold text-sm xs:text-base bg-[#272727] text-white dark:bg-primary py-3 px-4 shadow">
          <div> Price </div>
          <div class="">Quantity</div>
          <div>Status</div>
        </div>

        <div class="mobile-device-table">
          <template v-if="(showTableData && orders.length > 0) || (showManualTableData && manualOrders.length > 0)">
            <orderRow v-if="showTableData && mergedOrders.length > 0" v-for="(order, i) in mergedOrders" :item="order" :index="i+1" />
          </template>
          
          <div v-else-if="!showTableData || !showManualTableData"
            class="flex">
            <LoadingIcon icon="puff" class="w-8 h-8" />
          </div>

          <div v-else class="flex flex-col items-center mt-8" >
            <div class="text-center">Orders not found!!</div>
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
import { useOrdersStore } from '@/stores/matrix/order'
import { useManualOrdersStore } from '@/stores/groups/manualOrders'
  
import orderRow from './orderRow.vue'
const ordersStore = useOrdersStore()
const manualOrdersStore = useManualOrdersStore()


// define interface to ignore type warning error
interface Order {
  id: number
  serialNo:string
  order_id: string
  user_id: number
  broker_id: number

  strategy_id: number


  user: {
    id: number
    name: string
  }
  broker: {
    id: number
    broker_name: string
  }
  tradingsymbol: string
  quantity: number
  product: string
  exchange: string
  status: string
  status_message: string
  transaction_type: string
  average_price: number
  price: number
  order_type: string
  created_at: string
  updated_at: string
  strategy: {
    id: number
    name: string
    script: string
    image_url: string
    color: string
  }
}

const orders = computed<Order[]>(() => {
  return ordersStore.orders.map((order:Order, index: number) => ({
    ...order,
    serialNo: `order-${index}`
  }))
})

const manualOrders = computed<Order[]>(() => {
  return manualOrdersStore.manualOrders.map((manualOrder:Order, index: number) => ({
    ...manualOrder,
    serialNo: `manualOrder-${index}`
  }))
})

const mergedOrders = computed<Order[]>(() => {
  const allOrders: Order[] = [...orders.value, ...manualOrders.value];
  if(!allOrders.length) {
    return [];
  }
  // Sort orders by updated_at in descending order
  return allOrders.sort((a, b) => { 
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });
});

const showTableData = computed<boolean>(() => {
    const state = ordersStore.state[ordersStore.endpoint];
    // return state && state.loading === true;
    return true;
});

const showManualTableData = computed<boolean>(() => { 
    const state = manualOrdersStore.state[manualOrdersStore.endpoint];
    // return state && state.loading === false;
    return true;
})

</script>


<style scoped>
.mobile-device-table{
  @apply h-[calc(100vh-209px)] w-full overflow-scroll text-white;
}

</style>