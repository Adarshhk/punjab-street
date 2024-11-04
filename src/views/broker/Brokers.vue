<template>
  <div class="w-[100%] h-full bg-[#141313] p-6">

    <div class="flex flex-col justify-center ">
      
        <div class="flex justify-between items-center mb-6 ">
          <div class="">
            <p class="text-2xl font-normal text-white">Brokers</p>

          </div>
          <button class="bg-[#FFAA00] text-white px-2 py-2 rounded hover:bg-[#E69900]" @click="showAddEditModal = true">
            Add New Broker </button>
          <div v-if="!showUpdatingData" class="col-span-6 sm:col-span-3 xl:col-span-2 flex items-center">
            <LoadingIcon icon="puff" class="w-6 h-6" />
          </div>
        </div>

      <div class="hidden sm:block">
        <div class="table-container text-nowrap">

          <table class="mb-2 pb-5 w-full ">
            <thead class="bg-[#1E1E1E] text-white">
              <tr class="text-start ">
                <th class="px-6 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">Broker</th>
                <th class="px-6 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">Broker UserId</th>
                <th class="px-6 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">Token Date</th>
                <th class="px-6 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">Active</th>
                <th class="px-6 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">Connect</th>
                <th class="px-6 py-3 text-left text-xs text-white font-semibold uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              <brokersRow v-if="showBrokersTable && brokers.length > 0" v-for="broker, i in brokers" :key="i"
                :item="broker" :index="i + 1" />

              <div v-else-if="!showBrokersTable"
                class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                <LoadingIcon icon="puff" class="w-8 h-8" />
              </div>

              <div v-else class="flex flex-col items-center mt-8">
                <img :src="noUsers" alt="" class="w-10 h14">
                <div class="text-center">Brokers not found!!</div>
              </div>
            </tbody>
          </table>

        </div>
      </div>






      <!-- for mobile device  -->

      <div class="visible sm:hidden">
        <div
          class="grid grid-cols-2 gap-1 font-bold bg-[#272727] dark:bg-primary py-3 px-4 shadow dark:shadow-tableText text-white">
          <div class="text-center">Broker</div>
          <div class="text-end">Active</div>
        </div>

        <div class="mobile-device-table">
          <brokersRow v-if="showBrokersTable && brokers.length > 0" v-for="broker, i in brokers" :key="i" :item="broker"
            :index="i + 1" />

          <div v-else-if="!showBrokersTable" class="flex">
            <LoadingIcon icon="puff" class="w-8 h-8" />
          </div>

          <div v-else class="flex flex-col items-center mt-8">
            <img :src="noUsers" alt="" class="w-10 h14">
            <div class="text-center">Brokers not found!!</div>
          </div>
        </div>

      </div>


    </div>

  </div>

  <AddEdit />
  <DeleteBrokerModal />

  <ordersKite />
  <ordersAlice />
  <ordersAngel />
  <ordersIIFL />
  <ordersMhTrade />
  <brokerPosSqoffModal />

</template>

<script setup lang="ts">
import noUsers from '@/assets/svgs/no-users.svg'
import { ref, watch, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useBrokersStore } from '@/stores/matrix/broker'
import AddEdit from './addEdit.vue'
import DeleteBrokerModal from './deleteBrokerModal.vue'
import brokersRow from './brokersRow.vue'

import ordersKite from './order-position/ordersKite.vue'
import ordersAlice from './order-position/ordersAlice.vue'
import ordersAngel from './order-position/ordersAngel.vue'
import ordersIIFL from './order-position/ordersIIFL.vue'
import ordersMhTrade from './order-position/ordersMhTrade.vue'

import brokerPosSqoffModal from './order-position/brokerPosSqoffModal.vue'

const brokersStore = useBrokersStore()
const { showAddEditModal } = storeToRefs(brokersStore)

// define interface to ignore type warning error
interface Broker {
  id: number
  broker_name: string
  user_id: number
  user_name: string
  broker_token_date: string
  is_disabled: boolean
  is_active: boolean
  updated_at: string
  message: string
  token_status: string

}
const brokers = computed<Broker[]>(() => {
  return brokersStore.brokers
})


const showBrokersTable = computed<boolean>(() => {
  const state = brokersStore.state[brokersStore.endpoint];
  // return state && state.loading === false;
  return true;
});

const showUpdatingData = computed<boolean>(() => {
  const state = brokersStore.state[brokersStore.endpoint];
  // return state && state.updating === false;
  return true;
});

</script>

<style scoped>
.mobile-device-table {
  @apply h-[calc(100vh-209px)] w-full overflow-scroll text-white;
}
</style>