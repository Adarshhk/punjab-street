<template>
  <div class="bg-[#141313] border border-[#272727] rounded-md p-4 col-span-1 ">
    <div class="flex justify-start text-xs pt-3 ml-2">
        <div class="rounded-3xl p-1 px-2 bg-[#08262D] text-[#0EA4C7]">
          {{ data.script }}
        </div>
        <div @click="showMessageModal" class="ml-2 p-1 px-2 rounded-3xl " :class="{'bg-[#270909] text-[#D61717]' : data.risk == 'HIGH' , 'bg-[#092711] text-[#17D647]' : data.risk === 'LOW'}">
          {{ data.risk === 'HIGH' ? 'High Risk' : 'Low Risk' }}
        </div>
    </div>

    <div class="text-white text-lg font-normal ml-2 mt-4 border-b border-dashed border-[#272727] pb-2 border-opacity-25 ">
      {{ data.name }}
    </div>

    <div class="mt-5 ml-2 flex justify-between border-b  border-[#272727] border-opacity-50 pb-2">
      <div>
        <span class="font-extralight text-sm text-gray-300">Required capital </span>
      </div>
      <div>
        <span class="text-white font-light text-sm text-opacity-80">{{ data.capital_required }}</span>
      </div>
    </div>

    <div class="mt-5 flex justify-between ml-2 pb-2">
      <div>
        <span class="font-extralight text-base text-gray-300">PNL </span>
      </div>
      <div>
        <span class="text-[#17D647] font-semibold text-sm text-opacity-80" v-if="groupedStrategy?.pnl" :class="groupedStrategy?.pnl >= 0 ? 'text-green-500' : 'text-red-500'">₹ {{ groupedStrategy?.pnl.toFixed(2) }}</span>
        <span class="text-[#17D647] font-semibold text-sm text-opacity-80" v-else="">
          0.00
        </span>
      </div>
    </div>

    <div class="flex justify-center mt-4">
      <button class="border border-[#272727] rounded py-2 px-6 font-extralight text-sm text-white hover:bg-[#272727] transition-all duration-150" @click="gotoinfo">
        More Info
      </button>
      <button class="ml-2 border-[#FAA63E] rounded-md border-2 py-2 px-5 text-sm text-[#FAA63E] hover:bg-[#FAA63E] transition-all duration-150 hover:text-black" @click="showJoinModal">
        Subscribe
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
 import { images } from "@/assets/img";
 import { computed} from "vue";
 import  router  from "@/router/index";
 import { useMatrixJoinersStore } from '@/stores/matrix/matrixJoiner'
 import { useStrategiesStore } from '@/stores/matrix/strategy'
 import { useCardPositionsStore } from "@/stores/matrix/cardPosition";
 import { storeToRefs } from "pinia";
 import chart from "./chart.vue";
 
 
 const matrixJoinersStore = useMatrixJoinersStore();
 const strategiesStore = useStrategiesStore();
 const cardPositionsStore = useCardPositionsStore()
const { showMessage, message, strategyName } = storeToRefs(strategiesStore)
 const { showAddEditModal,joinStrategyId } = storeToRefs(matrixJoinersStore)

 const { mainCardPositions } = storeToRefs(cardPositionsStore) 

 const props: any = defineProps({
   item : Object,
   isActive: Boolean
 })

 const data : any = computed(() => {
   return props.item
 })
 
 function gotoinfo(){
    strategyName.value = data.value.id
    router.push({ name: 'Strategy Details' });
 }

 const groupedStrategy = computed(() => {
   try{
    let temp = mainCardPositions.value[data.value.id] || {};
    return temp
   } catch (err) {
     return {};
   }
 })
 
 function showJoinModal() {
     joinStrategyId.value = data.value.id
     showAddEditModal.value = true;
 }

 function showMessageModal() {
     showMessage.value = true
     message.value = data.value.message
 }
 
 
</script>