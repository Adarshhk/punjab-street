<template>
    <Modal1 size="xl" :show="showAddEditModal" @close="closeModel">
      <template #header>
        <div class="flex flex-wrap items-center font-bold text-lg sm:text-xl text-[#FAA63E]">
          {{ invoice.id ? `Upload Payment Proof` : `ADD INVOICE` }}
        </div>
      </template>
  
      <template #body>
        <form class="p-4 pt-0" @submit.prevent="save(invoice.id)">
          <div v-if="!invoice.id" class="input-form">
            <label for="plan_id" class="form-label w-full flex flex-col sm:flex-row text-[#A0A0A0]">
              Select Plan
            </label>
            <SingleSelect v-if="plans.length" v-model.trim="invoiceFormData.plan_id"
              placeholder="Select a plan" inputColor="bg-[#272727] text-[#A0A0A0] border border-[#272727]">
              <option v-for="plan in plans" :key="plan.id" :value="plan.id"> {{ plan.name }} </option>
            </SingleSelect>
          </div>
  
          <div v-if="!invoice.id" class="input-form mt-3">
            <label for="promo_code" class="form-label w-full flex flex-col sm:flex-row text-[#A0A0A0]">
              Add Gift Card or Promo Code
            </label>
            <div class="relative flex items-center">
              <input type="text" id="promo_code" v-model.trim="invoiceFormData.promo_code"
                class="block w-full p-2 pr-20 text-sm text-[#FAA63E] border border-[#272727] rounded-lg bg-[#1E1E1E]"
                placeholder="Enter Promo Code" />
              <a @click="getOfferByPromo" id="input-group-2"
                v-bind:class="{ 'opacity-50 dark:opacity-85 pointer-events-none': !invoiceFormData.plan_id }"
                class="px-5 absolute right-1 font-medium text-[#FAA63E] border border-[#FAA63E] rounded-lg cursor-pointer hover:bg-[#FAA63E] hover:text-black transition-all duration-150">
                Apply
              </a>
            </div>
            <template v-if="promoError">
              <div class="text-danger mt-2 text-[#FAA63E]">
                {{ promoError }}
              </div>
            </template>
          </div>
  
          <div class="input-form mt-3">
            <label for="qr_code" class="form-label w-full flex flex-col sm:flex-row text-[#A0A0A0]">
              Add Payment Proof
            </label>
            <input @change="handleInvoiceFileChange" type="file" accept="image/png, image/jpeg, image/jpg"
              class="text-sm file:py-2 file:px-10 file:border border-[#272727] p-0 block w-full file:text-[#FAA63E] text-[#A0A0A0] border rounded-lg file:cursor-pointer cursor-pointer bg-[#1E1E1E] focus:outline-none" id="image">
          </div>
  
          <div class="input-form mt-3">
            <template v-if="!invoice.id">
              <label for="qr_code" class="form-label w-full flex flex-col sm:flex-row text-[#A0A0A0]">
                QR Code
              </label>
              <div class="w-25 h-25 sm:w-24 sm:h-24 flex-none lg:w-40 lg:h-40 image-fit relative">
                <img :src="'/images/admin/qrcode/qr_code.jpeg'" alt="QR Code">
              </div>
  
              <div class="mt-12 text-right text-[#A0A0A0]">
                <label class="form-label w-full flex flex-col">
                  Total Amount: {{ calculatedTotalAmount ? calculatedTotalAmount : 0 }}
                </label>
                <label class="form-label w-full flex flex-col">
                  Discount: {{ invoiceFormData.discount_amount ? "-" + invoiceFormData.discount_amount : 0 }}
                </label>
                <label class="form-label w-full flex flex-col">
                  Payable Amount: {{ invoiceFormData.payable_amount ? "= " + invoiceFormData.payable_amount : 0 }}
                </label>
              </div>
            </template>
  
            <div class="mt-5 text-right">
              <button type="button" @click="closeModel" class="btn-close text-[#FAA63E] border border-[#FAA63E] px-4 py-2 rounded-md hover:bg-[#FAA63E] hover:text-black transition-all duration-150">
                Cancel
              </button>
              <button v-if="!invoice.id" type="submit" @click="submitForm"
                v-bind:class="{ 'opacity-50 pointer-events-none': !invoiceFormData.payable_amount }"
                class="btn-submit text-black bg-[#FAA63E] px-4 py-2 rounded-md ml-3">
                Submit
              </button>
              <button v-else type="submit" @click="submitForm"
                class="btn-submit text-black bg-[#FAA63E] px-4 py-2 rounded-md ml-3">
                Submit
              </button>
            </div>
          </div>
        </form>
      </template>
    </Modal1>
  </template>
  

<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useInvoicesStore } from "@/stores/matrix/invoice";
import { useStrategiesStore } from "@/stores/matrix/strategy";
import { storeToRefs } from "pinia";


import { makeRequest } from "@/request/request"; // Import your makeRequest function

const invoiceStore = useInvoicesStore();

const { showAddEditModal, addEditInvoiceData } = storeToRefs(invoiceStore);


const strategiesStore = useStrategiesStore();

const { plans } = storeToRefs(strategiesStore);


const dropdownOptions = computed<any>(() => {
    let temp = strategiesStore.plans || []
    if (temp.length > 0) {
        return temp.map((plan: any) => {
            return {
                id: plan.id,
                label: `${plan.name}`,
            };
        });
    }
    return []
})


function closeModel() {
    showAddEditModal.value = false;
}

const submitForm = async () => {

}


let promoError = ref("");


let discount_percent = ref(0);


let invoiceFormData = reactive<any>({
    plan_id: 0,
    plan_name: "",
    promo_code: "",
    offer_id: "",
    image: null,
    items: [],
    payable_amount: 0,
    discount_amount: 0,
    total_amount: 0
});



const invoice = computed<any>(() => {
    const invoice = addEditInvoiceData.value
    return invoice
})

// watchEffect(() => {

//     console.log("print data",invoiceFormData.plan_id,invoiceFormData.promo_code);
//     console.log("print img",invoiceFormData.image);
// })
let offerType = ref("");


const getOfferByPromo = async () => {
    promoError.value = "";

    let offers = await makeRequest("getOfferByPromo", "POST", { "plan_id": Number(invoiceFormData.plan_id), "offer_uuid": invoiceFormData.promo_code }, {}, {}, 0);


    if (!offers) {
        promoError.value = "Invalid Promo Code!";
    } else {
        offerType.value = offers.data.offer_type;

        discount_percent.value = offers.data.offer.discount_percent;
        invoiceFormData.discount_amount = offers.data.offer.discount_amount;
        invoiceFormData.offer_id = offers.data.offer.id;
    }
}



const calculatedTotalAmount = computed(() => {

    const selectedPlan = plans.value.find((plan: any) => plan.id === Number(invoiceFormData.plan_id)) || {};

    if (selectedPlan.invoice_item) {
        // Extract invoice_item IDs from the selected plan
        let invoiceItemIds = selectedPlan.invoice_item.map((item: any) => item.id);

        // Convert the IDs to strings if needed
        invoiceFormData.items = invoiceItemIds

        // Calculate the total amount by summing up all invoice_item amounts
        const totalAmount = selectedPlan.invoice_item.reduce((sum: number, item: any) => sum + item.amount, 0);

        invoiceFormData.total_amount = totalAmount


        if (invoiceFormData.discount_amount > 0) {
            invoiceFormData.payable_amount = totalAmount - invoiceFormData.discount_amount;
            return totalAmount
        } else if (discount_percent.value > 0) {
            invoiceFormData.discount_amount = (discount_percent.value / 100) * totalAmount;
            invoiceFormData.payable_amount = totalAmount - invoiceFormData.discount_amount
            return totalAmount
        } else {
            invoiceFormData.payable_amount = totalAmount;
            invoiceFormData.discount_amount = 0
            return totalAmount
        }



    } else {
        resetInvoiceFormData()
        return 0;
    }

});





const initialInvoiceFormData: any = {
    plan_id: 0,
    plan_name: "",
    promo_code: "",
    offer_id: "",
    image: null,
    items: [],
    payable_amount: 0,
    discount_amount: 0,
    total_amount: 0
};

// Create a function to reset the form data
function resetInvoiceFormData() {
    for (const key in initialInvoiceFormData) {
        invoiceFormData[key] = initialInvoiceFormData[key];

    }
}


const handleInvoiceFileChange = (event: any) => {
    const file = event.target.files[0];
    invoiceFormData.image = file;
};

const save = async (id: number) => {

    const formData = new FormData();
    let offerId = invoiceFormData.offer_id ? invoiceFormData.offer_id : 0

    formData.append('total_amount', invoiceFormData.total_amount);
    formData.append('items', invoiceFormData.items.join(','));
    formData.append('offer_type', offerType.value);
    formData.append('offer_discount', invoiceFormData.discount_amount);
    formData.append('payable_amount', invoiceFormData.payable_amount);
    formData.append('image', invoiceFormData.image);
    formData.append('offer_id', offerId);
    formData.append('plan_id', invoiceFormData.plan_id);




    try {
        if (id > 0) {
            await makeRequest("invoices", "PUT", formData, {}, {}, 0, id);
        } else {
            await makeRequest("invoices", "POST", formData, {}, {}, 0);
        }

        resetInvoiceFormData();
        invoiceFormData.plan_id = 0
        invoiceFormData.image = null
        closeModel();
    } catch (error) {
    }
};



</script>