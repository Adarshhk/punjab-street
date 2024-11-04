
<!-- quote of the day -->
<template>
    <div class="intro-y text-white border border-[#272727]  box col-span-12 lg:col-span-6">
        <!-- heading -->
        <div
            class="flex items-center px-5 py-5 sm:py-0 border-b shadow dark:border-darkmode-400"
        >
            <div class="font-medium text-base mr-auto py-2">Quote of the Day</div>
        </div>


        <!-- main quote of the day -->
        <div class="p-5">
            <div class="mt-4">
                <p class="text-[#FAA63E] text-lg line-clamp-3">
                    {{ quote?quote.item:'' }}
                </p>
            </div>
        </div>  




    </div>
</template>
    
<script setup lang="ts">

const props = defineProps({
    quote: Object   
})

// quote_of_the_day

</script >

<style lang="scss" scoped>
.intro-y {
        @apply border rounded bg-third dark:bg-primary dark:border-none;
    }
</style>