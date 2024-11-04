<template>
  <template v-if="navData && navData.name !== '' && route && route.name !== ''">
    <li class="text-[#FFFFFF66]">
      <router-link class="menu-items " :to="route.path" :class="[
        router.currentRoute.value.name === navData.name ? 'active' : '',
      ]">
        <div class="visible block md:hidden ">
          <Tippy class="text-center" :content="navData.title">
            <NavIcon :name="navData.icon" color="#ffffff" />
          </Tippy>
        </div>

        <NavIcon :name="navData.icon" color="#FFFFFF66" :class="[
          router.currentRoute.value.name === navData.name ? 'hidden' : '',
        ]" />
        <NavIcon :name="navData.icon" color="#000000" :class="[
          router.currentRoute.value.name != navData.name ? 'hidden' : '',
        ]" />
        <div class="ml-2 hidden xl:block ">{{ navData.title }}</div>


      </router-link>
    </li>
  </template>
</template>

<script setup lang="ts">
import router from '@/router/index'
import { computed } from 'vue'
import NavIcon from '../../components/newComponent/NavIcon.vue'
const props = defineProps({
  item: Object,
  route: Object
});

const navData = computed<any>(() => {
  let data = props.item as any
  return data
});

const route = computed<any>(() => {
  let data = props.route as any
  return data
});

</script>

<style scoped lang="scss">
.menu-items {
  @apply flex items-center justify-center xl:justify-start text-lg font-normal cursor-pointer py-3 px-4 border-b border-[#272727];
  transition: background-color 0.3s ease;
  -webkit-transition: background-color 0.5s 0s ease;
  transition: background-color 0.5s 0s ease;

  &:hover {
    color: black;
    /* Text turns white on hover */
    background-color: #FAA63E;
    /* Example dark background */
  }
}

.active {
  color: black;
  background-color: #FAA63E;
}
</style>