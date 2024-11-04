
<template>
    <div class="overflow-y-hidden w-full bg-[#141313]">

        <div class="p-4  flex flex-col ">

        <div class="">
            <Infographics />
        </div>

        <div class="relative"> 
            <div class="grid grid-cols-10 gap-2">
            <!-- Today's Profit -->
            <div class="bg-[#141313] shadow rounded-md border border-[#272727] h-full xl:col-span-4 col-span-10">
              <div class="flex justify-between items-center mb-2 p-4">
                <h3 class="text-xl font-normal text-white">Today's Profit</h3>
                <button
                  class="bg-[#FFAA00] text-black px-2 py-2 rounded hover:bg-[#E69900] ">
                  <div class="flex align-middle">
                    <img src="../../assets/svgs/squareoff.svg" class="w-5 h-4 mr-2 fill-blue-500">
                    
                    <span class="text-sm text-black">Square off</span>
                  </div>
                </button>
              </div>
  
              <div class="flex justify-between p-4 border-[#272727] border-t border-b">
                <Totalpnl/>
                <img src="../../assets/img/graph.png" class=" w-32 h-12">
              </div>

              <div class="h-full">
                <chart/>
              </div>
            </div>

            <!-- Positions -->
            <!-- <div class="bg-[#141313] shadow rounded-lg col-span-10 border-[#272727] border xl:col-span-6">
              <div class="flex justify-between items-center mb-4 px-6 pt-6">
                <h3 class="text-xl font-light text-white">Positions</h3>
                <RouterLink to="/position" class="text-white font-extralight text-opacity-35 hover:text-teal-800 focus:outline-none focus:underline">
                  See all
                </RouterLink>
              </div>
              <positionTable  />
            </div> -->
            <div class="bg-[#141313] shadow rounded-lg col-span-10 border-[#272727] border xl:col-span-6 ">
              <div class="flex justify-between items-center mb-4 px-6 pt-6">
                <h3 class="text-xl font-light text-white">Positions</h3>
                <RouterLink to="/position" class="text-white font-extralight text-opacity-35 hover:text-teal-800 focus:outline-none focus:underline">
                  See all
                </RouterLink>
              </div>
              <positionTable  />
            </div>
          </div>
          </div>

        </div>


    </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import router from '@/router';
import { useProfileStore } from '@/stores/matrix/profile';
import { useBrokersStore } from '@/stores/matrix/broker';
import { useOrdersStore } from '@/stores/matrix/order';
import { usePositionsStore } from '@/stores/matrix/position';
import chart from './content/positionData/chart.vue'

import Infographics from './content/infographics.vue'
import positionTable from './content/positionData/Main.vue'

import { useManualOrdersStore } from "@/stores/groups/manualOrders"
import Totalpnl from '@/utils/totalpnl.vue';
const manualOrdersStore = useManualOrdersStore();

const positionsStore = usePositionsStore()
const profileStore = useProfileStore()
const brokersStore = useBrokersStore()
const ordersStore = useOrdersStore()

const { isTabActive } = storeToRefs(positionsStore)
const { profile } = storeToRefs(profileStore);
const { brokers } = storeToRefs(brokersStore)

interface Broker {
  id: number;
  broker_name: string;
  broker_token_date: string;
  token_status: string;
  message: string;
  updated_at: string;
}

interface BrokerArray extends Array<Broker> {}

const brokersData = computed<BrokerArray>(() => brokers.value);

const totalOrders = computed(() => {

    let order = ordersStore.totalOrders
    let manualOrder = manualOrdersStore.totalManualOrders
    if(order || manualOrder) {
        return order + manualOrder
    }
    return 0

});

var brokersToken = computed(() => {
  const totalBrokers = brokersData.value.length;
  if (totalBrokers > 0) {
    const today = new Date().toISOString().split("T")[0];
    const tokensGeneratedToday = brokersData.value.filter((broker: any) => broker.broker_token_date.split("T")[0] === today && broker.token_status === "success").length;

    let message = `Connected (${tokensGeneratedToday}/${totalBrokers})`;
    let color = tokensGeneratedToday > 0 ? "text-emerald-500" : "text-rose-600";

    // Special case for a single broker
    if (totalBrokers === 1) {
      message = tokensGeneratedToday === 1 ? "Connected" : "Not Connected";
    }
    return { message, color };
  } else {
    return { message: "No Broker", color: "text-slate-500" };
  }
});

function navigate() {
    router.push({ name: "positions" });
}

</script>



<style scoped lang="scss">
.ord_pos_div {
    @apply overflow-scroll shadow-inner shadow-primary w-full h-[58vh]; 
    border-radius: 0px 0px 8px 8px;
}

.ord_pos_div::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  overflow: hidden;
}


.ord_pos_div ::-webkit-scrollbar {
  width: 2px;
}

</style>