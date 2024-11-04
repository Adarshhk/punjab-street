

<template>
  <div class="hidden sm:flex justify-between items-center p-1 pl-2 pr-4 border-b border-[#272727]  h-16 bg-[#141313]">
    <!-- page Name  -->
    <div class="unselectable capitalize  ml-3 font-semibold text-2xl text-white "> 
      <span v-if="titleVisible">My Dashboard</span>
    </div>


  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed  } from 'vue'
import router from '@/router/index'
import DarkModeSwicher from '@/components/darkModeSwicher.vue'
import { logout } from '@/request/request'
import { useProfileStore  } from '@/stores/matrix/profile'
import { useNotificationsStore } from '@/stores/matrix/notification';
import { useStrategiesStore } from '@/stores/matrix/strategy'
import { useNavlinksStore } from '@/stores/navlinks'
const notificationStore = useNotificationsStore()
const strategiesStore = useStrategiesStore()

const navlinksStore = useNavlinksStore()
const { navlinks } = storeToRefs(navlinksStore)

let { notificationsData } = storeToRefs(notificationStore)

const { strategies } = storeToRefs(strategiesStore)

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)  


const RouteNameArray = ref([ 'invoices', 'invoice_items' ])

const titleVisible = computed(() => {
  if(router.currentRoute.value.name) {
    let name = router.currentRoute.value.name.toString() || ''
    return !RouteNameArray.value.includes(name)
  }
  return true
})

const title = computed(() => {
  let name = router.currentRoute.value.name || ''
  if(name) {
    let titleData = navlinks.value.find((item: any) => item.name === name)
    return titleData && titleData.title ? titleData.title : name
  }
  return ''
})

const showNotificationModal = ref(false);

let notifications = computed<any>(() => {
  if (
    notificationsData.value &&
    strategies.value &&
    strategies.value.length > 0 &&
    notificationsData.value.length > 0
  ) {
    // Map strategy IDs to their corresponding strategies for efficient lookup
    const strategyMap = new Map(strategies.value.map((strategy: { id: any; }) => [strategy.id, strategy]));

    // Associate each notification with its corresponding strategy
    const notificationsWithStrategies = notificationsData.value.map((notification: { strategy_id: unknown; }) => {
      const strategy = strategyMap.get(notification.strategy_id);
      return {
        ...notification,
        strategy: strategy || null, 
      };
    });
    return notificationsWithStrategies;
  }

  return []; 
});


const closeNotificationModal = () => {
  showNotificationModal.value = false
}

const clickProfile = () => {
  router.push({ name: 'profile' })
  showProfileModal.value = false
}

const clickRefresh = () => {
  window.location.reload()
}
const toggleNotificationModal = () => {
  showNotificationModal.value = !showNotificationModal.value
}

const showProfileModal = ref(false);

const closeProfileModal = () => {
  showProfileModal.value = false  
}

const toggleProfileModal = () => {
  showProfileModal.value = !showProfileModal.value
}

</script>


<style scoped>

.profile-option {
  @apply hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-40 cursor-pointer flex bg-secondary dark:bg-primary dark:bg-opacity-50 dark:shadow-slate-600 rounded p-1 my-1 shadow-sm ;
}

.icon-size{
  @apply  m-1 h-4 w-4;
}

</style>
