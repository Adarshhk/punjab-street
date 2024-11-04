<template>
  <div class="dark:bg-[#141313]  dark:text-tableText w-[100vw] flex flex-col md:flex-row m-0 p-0 relative main-layout1">
    <!-- navbar container -->
    <div class="bg-[#141313] ">
      <div class="relative visible md:hidden border-b dark:border-secondary overflow-x-hidden">
        <logoTopbar />
      </div>
      
      <div class="h-screen  border-r border-[#272727] relative hidden md:block w-28 xl:w-64 2xl:w-72 overflow-y-hidden overflow-x-hidden bg-[#141313] dark:bg-[#141313]">
        <sideBar />
      </div>
    </div>
    <!-- navbar container end  -->

    <!-- main container -->
    <div class="relative md:h-screen flex flex-col bg-[#141313] dark:bg-[#141313] router-view p-0 m-0 overflow-x-hidden"
      :class="{'h-[calc(100vh-77px)]' : false, 'w-[100vw] lg:w-[calc(100vw-112px)] xl:w-[calc(100vw-256px)] 2xl:w-[calc(100vw-288px)]' : true}" 
    >
      <topbar />
      <div :class="{'h-[calc(100vh-61px)]  overflow-auto' : true}">
        <router-view />
      </div>
      <!-- <themeSwitcher /> -->
    </div>
    <!-- main container end  -->
  </div>
</template>

<script setup lang="ts">
import logoTopbar from '@/components/logoTopbar/Main.vue'
import sideBar from '@/components/sideBar/Main.vue'
import topbar from '@/components/topbar.vue'
// import themeSwitcher from '@/components/themeSwitcher.vue'
</script>
