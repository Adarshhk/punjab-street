<template>
  <div class="bg-[#141313] rounded-lg">

    <!-- Strategy List Section -->
    <div>
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
  const data: any[] = Object.values(positionsStore.strategiesPositions);

  let chartValue = {
    labels: data.map((strategy: any) => strategy.name),
    datasets: [
      {
        data: data.map((strategy: any) => strategy.positions.length),
        backgroundColor: data.map((strategy: any) => strategy.color),
      },
    ],
  };

  // Update Total Profit
  totalPNL.value = data.reduce((total: number, strategy: any) => total + parseFloat(strategy.pnl), 0);

  return chartValue;
});

// Strategy PNL (Profit and Loss)
const strategyPNL = computed(() => {
  const data: any[] = Object.values(positionsStore.strategiesPositions || {});

  return data.map((strategy: any) => parseFloat(strategy.pnl));
});
</script>
