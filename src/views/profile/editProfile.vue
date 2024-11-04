<template>
    <div class="intro-x text-white border border-[#272727] box col-span-12 lg:col-span-6">
      <div class="flex items-center px-5 py-5 sm:py-3 border-b border-[#272727] ">
        <h2 class="font-medium text-base mr-auto">Profile</h2>
  
        <button class="btn-submit border-[#FAA63E] rounded-md border py-2 px-6 text-sm text-[#FAA63E] hover:bg-[#FAA63E] transition-all duration-150 hover:text-black" :class="{ 'opacity-60': isEditing }" @click="toggleEdit">
          {{ isEditing ? "Editing" : "Edit" }}
        </button>
      </div>
      <div class="p-5">
        <!-- BEGIN:  Form -->
        <form class="validate-form" @submit.prevent="submitForm()">
          <div class="ml-4">
            <label for="name" class="block mb-4 text-sm font-medium text-white">Name</label>
            <input type="text" id="name"
              class="bg-[#272727] border border-[#272727] text-white text-sm rounded-lg  block w-full p-2.5"
              :class="isEditing ? 'border-blue-500' : 'border-[#272727]'" :placeholder="profile?.name"
              v-model="profileData.name" :disabled="!isEditing" />
          </div>
          <!-- <div class="ml-4 mt-4">
            <label for="TradingviewId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tradingview
              ID</label>
            <input type="text" id="TradingviewId"
              class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :class="isEditing ? 'border-blue-500' : 'border-gray-300'" :placeholder="profile.trading_view_id"
              v-model="profileData.trading_view_id" :disabled="!isEditing" />
          </div> -->
  
          <div class="ml-4 mt-4">
            <label class="block mb-4 text-sm font-medium text-white" for="image">
              Change Profile Picture
            </label>
            <input
              class="bg-[#272727] border border-[#272727] text-white text-sm rounded-lg  block w-full p-2.5"
              :class="isEditing ? 'border-blue-500' : 'border-[#272727]'" id="image" type="file"
              accept="image/*" @change="handleFileChange" :disabled="!isEditing" />
  
          </div>
          <div class="flex justify-end" v-if="isEditing">
            <button type="submit" class="btn btn-primary   ml-4 mt-4 w-97">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed,watch } from "vue";
  import { makeRequest } from "@/request/request";
  
  
  const data = defineProps({
    profile: Object
  })
  const profile = computed(() => {
    var profile = data.profile  
    return profile
  
  })
  
  let isEditing = ref(false);
  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
  };
  
  const profileData = ref({
    name: '',
    image: '',
  });
  
  
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    profileData.value.image = file;
  };
    
  
  watch(profile, (newProfile, oldProfile) => {
    if (newProfile !== oldProfile) {
      profileData.value.name = newProfile?.name;
    }
  });
  
  const submitForm = async () => {
    
      const formData = new FormData();
      formData.append('name', profileData.value.name);

      if (profileData.value.image) {
          formData.append('image', profileData.value.image);
      }else{
        formData.append('image', '');
      }
  
      try {
           await makeRequest("updateUser", "PUT", formData, {}, {}, 0);
           isEditing.value = false;
          
      } catch (error) {
          console.error(error);
      }
  }
  
  
  
  </script>
  
  
  <style lang="scss" scoped>
    .intro-x {
        @apply bg-third dark:bg-primary dark:border-none;
    }
    </style>