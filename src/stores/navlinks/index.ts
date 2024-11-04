import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavlinksStore = defineStore('navlink', () => {

  const mobileToggle = ref<boolean>(false)

  const navlinks = ref<any>([
    {
      icon: 'home',
      name: 'dashboard',
      title: 'Dashboard',
      permission: 'dashboard'
    },
    {
      icon: 'users',
      name: 'mystrategies',
      title: 'My Strategy',
      permission: 'Read_domain_position'
    },
    {
      icon: 'position',
      name: 'positions',
      title: 'Position',
      permission: 'Read_broker'
    },
    {
      icon: 'broker',
      name: 'brokers',
      title: 'Broker',
      permission: 'Read_domain_strategy_joiner'
    },
    {
      icon: 'orders',
      name: 'orders',
      title: 'Orders',
      permission: 'Read_strategy'
    },
    
    
    {
      icon: 'users',
      name: 'strategies',
      title: 'Strategies',
      permission: 'Read_domain_position'
    },

  ])


  // console.log("print navlinks", navlinks);
  
  return {
    navlinks,
    mobileToggle
  }
})

