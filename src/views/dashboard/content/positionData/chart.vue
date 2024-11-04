<template>
  <div class="bg-[#141313] rounded-lg">

    <!-- Strategy List Section -->
    <div class="">
      <div
        v-for="(strategy, index) in chartData.labels"
        :key="index"
        class="flex justify-between py-3 px-2 border-b border-[#272727]"
      >
        <span class="text-sm text-white">{{ strategy }}</span>
        <span 
          :class="strategyPNL[index] > 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ `₹${strategyPNL[index].toFixed(2)} ` }}
          
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePositionsStore } from '@/stores/matrix/position';
import { storeToRefs } from 'pinia';

// Store setup
const positionsStore = usePositionsStore();
const { strategiesPositions, isTabActive } = storeToRefs(positionsStore);

// Refs and state
const totalPNL = ref(0);



// Chart Data
const chartData = computed(() => {
  const data =  Object.values(positionsStore.strategiesPositions);

  let chartValue = {
    labels: data.map(strategy => strategy.name),
    datasets: [
      {
        data: data.map(strategy => strategy.positions.length),
        backgroundColor: data.map(strategy => strategy.color),
      },
    ],
  };

  // Update Total Profit
  totalPNL.value = data.reduce((total, strategy) => total + parseFloat(strategy.pnl), 0);

  return chartValue;
});

// Strategy PNL (Profit and Loss)
const strategyPNL = computed(() => {
  const data = Object.values(positionsStore.strategiesPositions || {});

  return data.map(strategy => parseFloat(strategy.pnl));
});
</script>
