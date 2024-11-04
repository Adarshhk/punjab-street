<template>
  <div class="grid grid-cols-10 gap-2 mb-4">
            <!-- Welcome message -->
            <div class="overflow-hidden p-2 col-span-10 xl:col-span-4 relative bg-[#F9A43C] rounded-lg md:py-6 text-white xs:py-10">
              <div class="ml-6 w-2/3 mb-3">

                <h2 class=" text-2xl text-black font-semibold">Hello, {{ profile.name }}</h2>
                <p class="mt-4 text-base text-[#060606] opacity-40">Welcome back! Let's start your trade with the
                  best strategies by us</p>
              </div>
              <div class="absolute top-0 xs:top-2 left-20">
                <img src="../../../assets/svgs/cardGradient.svg" alt="Card Gradient" class="opacity-80 object-cover md:h-48 xs:h-56">
                <!-- Adjusted size and object-cover -->
              </div>
              <RouterLink to="/profile" class="ml-6 text-black hover:text-yellow-100 inline-block text-sm font-normal">
                View Profile >>
              </RouterLink>
            </div>
            <!-- Metrics Cards -->
            <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 xl:col-span-6 col-span-10">
              <MetricItem :src="userPng" title="Open Positions" :value="totalPositionsOpen" color="#F9A43C" />
              <MetricItem :src="setting" title="Strategy" :value="totalStrategy" color="#F9A43C" />
              <MetricItem :src="deliveryBox" title="Total Orders" :value="totalOrders" color="#F9A43C" />
            </div>
          </div>
  <!-- Closing div for dashboard -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import TotalProfit from '@/stores/utils/totalpnl.vue';
import { useProfileStore } from '@/stores/matrix/profile';
import { useBrokersStore } from "@/stores/matrix/broker";
import { useOrdersStore } from "@/stores/matrix/order";
import { useManualOrdersStore } from "@/stores/groups/manualOrders"
import MetricItem from "@/views/dashboard/content/MetricItem.vue";
import userPng from '@/assets/img/user.png'
import deliveryBox from '@/assets/img/DeliveryBox.png'
import setting from '@/assets/img/setting.png'
import { useStrategiesStore } from "@/stores/matrix/strategy";
import { usePositionsStore } from "@/stores/matrix/position";

// Stores Initialization
const manualOrdersStore = useManualOrdersStore();
const profileStore = useProfileStore();
const brokersStore = useBrokersStore();
const strategyStore = useStrategiesStore();
const ordersStore = useOrdersStore();
const positionStore = usePositionsStore();

// Profile Data
const { brokers } = storeToRefs(brokersStore);
const { totalRecords } = storeToRefs(ordersStore);

const profile = computed(() => {
  return profileStore.profile;
});

const totalStrategy = strategyStore.stratgyJoinedPlans.length;

const totalPositionsOpen = computed(() => {
  return positionStore.positions.length
});
// Expiration Date Logic
let expire_at: any;
expire_at = computed(() => {
  if (profileStore.profile) {
    try {
      return profileStore.profile.expire_at.split("T")[0];
    } catch {
      return "";
    }
  }
});

// Broker Logic: Calculate brokersTokenMessage
interface Broker {
  id: number;
  broker_name: string;
  broker_token_date: string;
  token_status: string;
  message: string;
  updated_at: string;
}

interface BrokerArray extends Array<Broker> { }

const brokersData = computed<BrokerArray>(() => brokers.value);

var brokersTokenMessage = computed(() => {
  const totalBrokers = brokersData.value.length;
  if (totalBrokers > 0) {
    const today = new Date().toISOString().split("T")[0];
    const tokensGeneratedToday = brokersData.value.filter((broker: any) => broker.broker_token_date.split("T")[0] === today && broker.token_status === "success").length;

    let message = tokensGeneratedToday ? `(${tokensGeneratedToday}/${totalBrokers})` : `(0/${totalBrokers})`;

    return message;
  } else {
    return "";
  }
});

// Total Orders Calculation (from ordersStore and manualOrdersStore)
const totalOrders = computed(() => {
  let order = ordersStore.totalOrders;
  let manualOrder = manualOrdersStore.totalManualOrders;
  if (order || manualOrder) {
    return order + manualOrder;
  }
  return 0;
});

</script>

<style scoped>
/* Optional: Custom styles if needed */
</style>
