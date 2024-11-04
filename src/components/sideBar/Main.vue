<template>
    <div class="relative m-0 p-0 bg-[#141313] overflow-y-hidden">
        <!-- logo here     -->
        <div class="fixed top-logo py-2 top-0 px-2" style="z-index: 150;">

            <RouterLink to="/"
                class="relative flex items-center justify-center w-20  mt-2  xl:w-[233px] 2xl:w-[250px] h-16 overflow-visible ml-4 xl:ml-0 xl:justify-start  rounded xl:rounded-lg ">

                <div class="w-full hidden xl:block">
                    <img src="../../assets/logo.svg" alt="" />

                    <!-- <img v-if="imgName" :src="'/images/logo/' + imgName + '.png'" @load="handleImageLoad" @error="handleImageError" class="w-16 xl:w-[233px] 2xl:w-[249px] h-16" :class="{ 'hidden': !imgLoad }" />
                    <div v-if="!imgLoad" class="flex w-full font-bold justify-center mt-[-5px] text-3xl text-gray-600 dark:text-tableText">
                        {{ domainName }}
                    </div> -->
                </div>

                <div class="w-full block xl:hidden">
                    <img src="../../assets/logo.svg" alt="" />

                    <!-- <img v-if="imgName2" :src="'/images/logo/' + imgName2 + '.png'" @load="handleImageLoad2" @error="handleImageError2" class="w-16 h-16" :class="{ 'hidden': !imgLoad2 }" />
                    <div v-if="!imgLoad2" class="flex flex-col items-center w-16 p-[2px] justify-center text-wrap text-gray-600 dark:text-tableText">
                        <div class="text-lg font-bold">{{ domainName.charAt(0) }}</div>
                        <div class="flex flex-wrap justify-center text-sm text-center break-all leading-3">{{ domainName.slice(1) }}</div>
                    </div> -->
                </div>

            </RouterLink>

        </div>


        <!-- menu here     -->
        <div class="intro-x menu p-0 pt-6 mt-16">
            <ul v-if="navlinks.length > 0 && allRoutes.length > 0" class="">

                <routeName v-for="(navData, index) in navlinks" :key="index" :item="navData"
                    :route="findRoutes(navData.name)" />

            </ul>
        </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 top- p-4">
          <div class="relative border-t border-[#272727]">
            <button @click="toggleAdminDropdown"
              class="flex items-center w-full bg-[#141313] hover:bg-[#FAA63E] text-white font-medium py-2 px-4 rounded transition-colors duration-200 ">
              <img src="../../assets/img/profile.png" alt="Admin" class="w-8 h-8 rounded-full mr-3" />
              <span class="md:hidden xl:block">{{ profileStore.profile.name }}</span>
              <ChevronDownIcon :class="{ 'transform rotate-180': isAdminDropdownOpen }"
                class="w-5 h-5 ml-auto transition-transform duration-200" />
            </button>
            <div v-if="isAdminDropdownOpen"
              class="absolute bottom-full left-0 w-full bg-[#1E1E1E] rounded-t-md shadow-lg overflow-hidden transition-all duration-200 ease-in-out">
              <router-link to="/profile"
                class="block px-4 py-2 text-sm text-white hover:bg-[#272727]  transition-colors duration-200"
                @click="closeAdminDropdown">
                Profile
              </router-link>
              <button @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#272727] transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>



</template>

<script setup lang="ts">
import logoComp from '../../views/login/logoComp.vue'

import { storeToRefs } from 'pinia'
import router from '@/router/index'
import { useNavlinksStore } from '@/stores/navlinks'
import { ref, watchEffect, computed, onBeforeMount } from 'vue'
import routeName from './routeName.vue'
import { images } from '@/assets/img'
import { useLogoStore } from '@/stores/utils/logo'
import { useProfileStore } from '@/stores/matrix/profile'


const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const handleLogout = () => {
  
  localStorage.clear()
  router.push("/login")
}

const navlinkStore = useNavlinksStore()
const { navlinks } = storeToRefs(navlinkStore)

const logoStore = useLogoStore()
const { logoData } = storeToRefs(logoStore)

const allRoutes = computed(() => router.getRoutes())
const isAdminDropdownOpen = ref(false)

const toggleAdminDropdown = () => {
  isAdminDropdownOpen.value = !isAdminDropdownOpen.value
}

const closeAdminDropdown = () => {
  isAdminDropdownOpen.value = false
}


const findRoutes = (name: string) => {
    return allRoutes.value.find((route) => route.name === name)
}


onBeforeMount(() => {
    const url = window.location.href
    getDomain(url)
})

const imgName = ref(''), imgName2 = ref('')
const imgLoad = ref(false)
const imgLoad2 = ref(false)


const domainName = computed(() => {
    return logoData.value
})


function handleImageLoad() {
    imgLoad.value = true
}
function handleImageError(error: any) {
    imgLoad.value = false
}

function handleImageLoad2() {
    imgLoad2.value = true
}
function handleImageError2(error: any) {
    imgLoad2.value = false
}




const getDomain = (url: string) => {
    const parsedUrl = new URL(url);
    //   const parsedUrl = new URL('https://www.admin.xyz.in.netlify.app/');

    let count = 0, newHostname = '';
    let urlHostNameArray = parsedUrl.hostname.split(".");

    for (let i = 0; i < urlHostNameArray.length; i++) {
        if (urlHostNameArray[i] == "www" && count == 0) {
            continue;
        } else if (count == 0) {
            count = 1;
        } else {
            newHostname += urlHostNameArray[i] + "_"
        }
    }

    imgName.value = newHostname.slice(0, -1);
    imgName2.value = newHostname + "small_logo"
}


</script>


<style scoped lang="scss">
.menu ul {
    transition: all 0.3s ease;
}
</style>
