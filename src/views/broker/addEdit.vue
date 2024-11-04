<template>
  <Modal1 :size="formData && formData.broker_name === 'iifl' ? '3xl' : '2xl'" :show="showAddEditModal" @close="closeModel" >
    <template #header >
      <div class="flex flex-wrap items-center text-lg sm:text-xl text-white font-semibold">
        {{ broker.id ? `Edit Broker Info` : `Add Broker Info` }}
      </div>
    </template>

    <template #body>
      <form class="bg-[#141313] p-4 grid sm:grid-cols-1 md:grid-cols-2 gap-4" :class="formData && formData.broker_name === 'iifl' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'"
        @submit.prevent="save(broker.id || 0)"
      >

      
        <!-- Broker Name Input -->
        <div class="input-form bg-[#141313]">
          <label for="broker_name" class=" text-white mb-1 form-label w-full flex flex-col sm:flex-row"
            >Select Broker*:</label
          >
          <div>

            <SingleSelect v-model.trim="validate.broker_name.$model" imageShow placeholder="Select a broker" class="bg-[#141313] ">

            <!-- <select
              v-model.trim="validate.broker_name.$model"
              id="broker_name"
              name="broker_name"
              class=""
            > -->
              <option value="">Choose a broker</option>
              <option key="zerodha" value="zerodha" image="zerodha">Zerodha</option>
              <option key="alice" value="alice" image="alice">Alice</option>
              <option key="angel" value="angel" image="angel">Angel</option>
              <option key="iifl" value="iifl" image="iifl">IIFL</option>
              <option key="mhtrade" value="mhtrade" image="mhtrade">MH Trade</option>
            <!-- </select> -->
          </SingleSelect>
          </div>
          <template v-if="validate.broker_name.$error">
            <div
              v-for="(error, index) in validate.broker_name.$errors"
              :key="index"
              class="text-danger mt-2"
            >
              {{ error.$message }}
            </div>
          </template>
        </div>

        <div class="input-form">
          <label for="broker_userid" class="mb-1 text-white form-label w-full flex flex-col sm:flex-row">
            <div v-if="formData.broker_name !== 'mhtrade'">Broker User Id*</div>
            <div v-else> Client Id*</div>
          </label>
          <input
            id="broker_userid"
            v-model.trim="validate.broker_userid.$model"
            type="text"
            :disabled="(broker.id) && (!formData.is_editable)?true:false"
            class="text-white border border-white rounded-md p-1"
            name="broker_userid"
            :class="[{ 'is-invalid': validate.broker_userid.$error }, {'cursor-not-allowed bg-gray-200': (broker.id) && (!formData.is_editable) ? true : false} ]"
            :placeholder="formData.broker_name !== 'mhtrade' ? 'enter broker user id' : 'enter  client id'"
          />
          <span v-if="validate.broker_userid.$error">
            <div v-for="(error, index) in validate.broker_userid.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


        <template v-if="formData.broker_name !== 'iifl'" >

        
        <div class="input-form bg-[#141313]">
          <label for="broker_pin" class="form-label w-full flex flex-col sm:flex-row mb-1 text-white">
            <div v-if="formData.broker_name !== 'mhtrade'">Broker Pin*</div>
            <div v-else> Verification*</div>
          </label>
          <input
            id="broker_pin"
            v-model.trim="validate.broker_pin.$model"
            type="text"
            name="broker_pin"
            class="text-white border border-white rounded-md p-1"
            :class="{ 'is-invalid': validate.broker_pin.$error }"
            :placeholder="formData.broker_name !== 'mhtrade' ? 'enter broker pin' : 'enter verification code'"
          />
          <span v-if="validate.broker_pin.$error">
            <div v-for="(error, index) in validate.broker_pin.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

        <div v-if="formData.broker_name !== 'mhtrade'" class="input-form">
          <label for="broker_qr_key" class="mb-1 text-white form-label w-full flex flex-col sm:flex-row">
            Broker Qr Key*
          </label>
          <input
            id="broker_qr_key"
            v-model.trim="validate.broker_qr_key.$model"
            type="text"
            class="text-white border border-white rounded-md p-1"
            name="broker_qr_key"
            :class="{ 'is-invalid': validate.broker_qr_key.$error }"
            placeholder="enter broker qr key"
          />
          <span v-if="validate.broker_qr_key.$error">
            <div v-for="(error, index) in validate.broker_qr_key.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>
        <div v-if="formData.broker_name !== 'mhtrade'" class="input-form">
          <label for="broker_api" class="mb-1 text-white form-label w-full flex flex-col sm:flex-row">
            Broker Api*
          </label>
          <input
            id="broker_api"
            v-model.trim="validate.broker_api.$model"
            type="text"
            class="text-white border border-white rounded-md p-1"
            name="broker_api"
            :class="{ 'is-invalid': validate.broker_api.$error }"
            placeholder="enter broker api"
          />
          <span v-if="validate.broker_api.$error">
            <div v-for="(error, index) in validate.broker_api.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


        <div v-if="formData.broker_name !== 'mhtrade'" class="mb-1 text-white input-form">
          <label for="broker_api_secret" class="form-label w-full flex flex-col sm:flex-row">
            Broker Api Secret*
          </label>
          <input
            id="broker_api_secret"
            v-model.trim="validate.broker_api_secret.$model"
            type="text"
            name="broker_api_secret"
            class="text-white border border-white rounded-md p-1"
            :class="{ 'is-invalid': validate.broker_api_secret.$error }"
            placeholder="enter broker api secreat"
          />
          <span v-if="validate.broker_api_secret.$error">
            <div v-for="(error, index) in validate.broker_api_secret.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


      </template>

      <div class="input-form">
          <label for="broker_password" class="mb-1 text-white form-label w-full flex flex-col sm:flex-row">
            <div v-if="formData.broker_name !== 'mhtrade'">Broker Password*</div>
            <div v-else> Password*</div>
          </label>
          <input
            id="broker_password"
            v-model.trim="validate.broker_password.$model"
            type="text"
            name="broker_password"
            class="text-white border border-white rounded-md p-1"
            :class="{ 'is-invalid': validate.broker_password.$error }"
            :placeholder="formData.broker_name !== 'mhtrade' ? 'enter broker password' : 'enter password'"
          />
          <span v-if="validate.broker_password.$error">
            <div v-for="(error, index) in validate.broker_password.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


        <!-- for iifl  -->


        <!-- // AppName        string json:"app_name"
  // 	ClientCode     string json:"client_code"
  // 	ClientPassword string json:"client_password"
  // 	ProvideDob     string json:"provide_dob"
  // 	OcpApimSubKey  string json:"ocp_apim_sub_key"
  // 	EncryKey  string json:"encry_key" -->

        <!-- app name  -->
        <template v-if="formData.broker_name == 'iifl'">
        <div class="input-form">
          <label for="app_name" class="form-label w-full flex flex-col sm:flex-row">
            App Name*
          </label>
          <input id="app_name" v-model.trim="validate.app_name.$model" type="text" name="app_name"
            :class="{ 'is-invalid': validate.app_name.$error }"
            placeholder="enter app name"
          />
          <span v-if="validate.app_name.$error">
            <div v-for="(error, index) in validate.app_name.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

        <!-- client code  -->

        <div class="input-form">
          <label for="client_code" class="form-label w-full flex flex-col sm:flex-row">
            Client Code*
          </label>
          <input id="client_code" v-model.trim="validate.client_code.$model" type="text" name="client_code"
            :class="{ 'is-invalid': validate.client_code.$error }"
            placeholder="enter client code"
          />
          <span v-if="validate.client_code.$error">
            <div v-for="(error, index) in validate.client_code.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

        <!-- client password  -->


        <div class="input-form">
          <label for="client_password" class="form-label w-full flex flex-col sm:flex-row">
            Client Password*
          </label>
          <input id="client_password" v-model.trim="validate.client_password.$model" type="text" name="client_password"
            :class="{ 'is-invalid': validate.client_password.$error }"
            placeholder="enter client password"
          />
          <span v-if="validate.client_password.$error">
            <div v-for="(error, index) in validate.client_password.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

        <!-- provide DOB  -->

        <div class="input-form">
          <label for="provide_dob" class="form-label w-full flex flex-col sm:flex-row">
            Provide DOB*
          </label>
          <input id="provide_dob" v-model.trim="validate.provide_dob.$model" type="text" name="provide_dob"
            :class="{ 'is-invalid': validate.provide_dob.$error }"
            placeholder="broker added dob yyyymmdd(19881226)"
          />
          <span v-if="validate.provide_dob.$error">
            <div v-for="(error, index) in validate.provide_dob.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

        <!-- ocp_apim_sub_key -->

        <div class="input-form">
          <label for="ocp_apim_sub_key" class="form-label w-full flex flex-col sm:flex-row">
            Ocp Apim Sub Key*
          </label>
          <input id="ocp_apim_sub_key" v-model.trim="validate.ocp_apim_sub_key.$model" type="text" name="ocp_apim_sub_key"
            :class="{ 'is-invalid': validate.ocp_apim_sub_key.$error }"
            placeholder="enter ocp apim sub key"
          />
          <span v-if="validate.ocp_apim_sub_key.$error">
            <div v-for="(error, index) in validate.ocp_apim_sub_key.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


        <!-- encry_key  -->

        <div class="input-form">
          <label for="encry_key" class="form-label w-full flex flex-col sm:flex-row">
            Encry Key*
          </label>
          <input id="encry_key" v-model.trim="validate.encry_key.$model" type="text" name="encry_key"
            :class="{ 'is-invalid': validate.encry_key.$error }"
            placeholder="enter encry key"
          />
          <span v-if="validate.encry_key.$error">
            <div v-for="(error, index) in validate.encry_key.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


        <!-- user_key  -->

        <div class="input-form">
          <label for="user_key" class="form-label w-full flex flex-col sm:flex-row">
            User Key*
          </label>
          <input id="user_key" v-model.trim="validate.user_key.$model" type="text" name="user_key"
            :class="{ 'is-invalid': validate.user_key.$error }"
            placeholder="enter user key"
          />
          <span v-if="validate.user_key.$error">
            <div v-for="(error, index) in validate.user_key.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

        <!-- app_source -->

        <div class="input-form">
          <label for="app_source" class="form-label w-full flex flex-col sm:flex-row">
            App Source*
          </label>
          <input id="app_source" v-model.trim="validate.app_source.$model" type="text" name="app_source"
            :class="{ 'is-invalid': validate.app_source.$error }"
            placeholder="enter app source"
          />
          <span v-if="validate.app_source.$error">
            <div v-for="(error, index) in validate.app_source.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>

      </template>
      <!-- broker iifl details end -->


        <!-- is_active -->
        <div class="input-form">
          <label class="text-white form-label flex flex-col sm:flex-row "> Account Active </label>
          <ButtonSwitch id="is_active" name="is_active" v-model.trim="validate.is_active.$model" />

          <span v-if="validate.is_active.$error">
            <div v-for="(error, index) in validate.is_active.$errors" :key="index">
              {{ error.$message }}
            </div>
          </span>
        </div>


        <div class="flex justify-end items-end md:col-span-2 gap-3" :class="formData && formData.broker_name === 'iifl' ? 'lg:col-span-2' : 'lg:col-span-3'">
          <button type="submit" class="btn-submit text-white border-[#FAA63E] border rounded-md px-5 py-2 hover:text-black hover:bg-[#FAA63E] transition-all duration-200" @click="submitForm">Submit</button>

          <button type="button" class="btn-close text-white border-[#272727] border rounded-md px-5 py-2  hover:bg-[#272727] transition-all duration-200" @click="closeModel">Close</button>
        </div>
      </form>
    </template>

  </Modal1>
</template>

<script setup lang="ts">
import { showToast } from '@/request/request'
import { useBrokersStore } from '@/stores/matrix/broker'
import { storeToRefs } from 'pinia'
import { toRefs, computed, reactive, watch, ref } from 'vue'
import { required, minLength, integer } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const brokersStore = useBrokersStore()

const { showAddEditModal, editBrokerData } = storeToRefs(brokersStore)
const { addEditBroker } = brokersStore

function closeModel() {
  editBrokerData.value = {}
  showAddEditModal.value = false
  resetValidation()
}
interface Broker {
  id?: number
  broker_name?: string
  broker_password?: string
  broker_userid?: string
  broker_pin?: string
  broker_qr_key?: string
  broker_api?: string
  broker_api_secret?: any

  app_name?: string
  client_code?: string
  client_password?: string
  provide_dob?: string
  ocp_apim_sub_key?: string
  encry_key?: string
  user_key?: string
  app_source?: string

  is_active?: boolean
  is_editable?: boolean
}

const broker = computed<Broker>(() => {
  const broker = editBrokerData.value
  return broker
})

let formData = reactive({
  broker_name: '',
  broker_password: '',
  broker_userid: '',
  broker_pin: '',
  broker_qr_key: '',
  broker_api: '',
  broker_api_secret: '',

  app_name: '',
  client_code: '',
  client_password: '',
  provide_dob: '',
  ocp_apim_sub_key: '',
  encry_key: '',
  user_key: '',
  app_source: '',

  is_active: false,
  is_editable: false
})

watch(broker, (newBroker, oldBroker) => {
  if (newBroker !== oldBroker) {
    if(broker.value.id && broker.value.broker_name !== 'iifl'){
      formData.broker_qr_key = newBroker.broker_qr_key !== undefined ? newBroker.broker_qr_key : ''

    } else if (broker.value.broker_name == 'iifl') {

      // Assuming broker_qr_key contains the provided string
      // let brokerQrKey = "AppName IIFLMar64880838 `json:\"app_name\"`\nClientCode 64880838 `json:\"client_code\"`\nClientPassword aru@0090 `json:\"client_password\"`\nProvideDob 19950705 `json:\"provide_dob\"`\nOcpApimSubKey fc714d8e5b82438a93a95baa493ff45b `json:\"ocp_apim_sub_key\"`\nEncryKey JXPiM4rQmOPQReZyrJchDUetcNM0pBat3BFbPyGSMmEtlvp2lDFr2opexn3BUelh `json:\"encry_key\"`\nUserKey qpd3UkiXSGUgXfma6QFWohxlt4ffokpC `json:\"user_key\"`";

    

    const fields = broker.value.broker_qr_key?broker.value.broker_qr_key.split("\n").filter((field:any) => field.trim() !== ""):[];
      const parsedFields:any = {};

      fields.forEach((field:any) => {
        const [key, value] = field.split(/\s+/);
        parsedFields[key] = value;
      });

      formData.app_name = parsedFields.AppName ? parsedFields.AppName : ''
      formData.client_code =parsedFields.ClientCode ? parsedFields.ClientCode : ''
      formData.client_password =parsedFields.ClientPassword ? parsedFields.ClientPassword : ''
      formData.ocp_apim_sub_key =parsedFields.OcpApimSubKey ? parsedFields.OcpApimSubKey : ''
      formData.encry_key =parsedFields.EncryKey ? parsedFields.EncryKey : ''
      formData.user_key =parsedFields.UserKey ? parsedFields.UserKey : ''
      formData.provide_dob =parsedFields.ProvideDob ? parsedFields.ProvideDob : ''
      formData.app_source =parsedFields.AppSource ? parsedFields.AppSource : ''
      
    }else {
      formData.app_name =''
      formData.client_code = ''
      formData.client_password =''
      formData.ocp_apim_sub_key = ''
      formData.encry_key = ''
      formData.user_key =''
      formData.provide_dob =''
      formData.app_source =''
    }


    formData.broker_name = newBroker.broker_name !== undefined ? newBroker.broker_name : ''
    formData.broker_password =
      newBroker.broker_password !== undefined ? newBroker.broker_password : ''
    formData.broker_userid = newBroker.broker_userid !== undefined ? newBroker.broker_userid : ''
    formData.broker_pin = newBroker.broker_pin !== undefined ? newBroker.broker_pin : ''
    formData.broker_api = newBroker.broker_api !== undefined ? newBroker.broker_api : ''
    formData.broker_api_secret = newBroker.broker_api_secret !== undefined ? newBroker.broker_api_secret : ''
    
    formData.is_active = newBroker.is_active !== undefined ? newBroker.is_active : false
    formData.is_editable = newBroker.is_editable !== undefined ? newBroker.is_editable : false
  }
})

const rules = {
  broker_userid: {
    required,
    minLength: minLength(5)
  },
  broker_name: {
    required
  },
  broker_password: {
    required
  },

  broker_pin: {
    required: (value: any) => {
      return formData.broker_name !== 'iifl' && value === ''  ? false : true
    },
  },
  broker_qr_key: {
    required: (value: any) => {
      return (formData.broker_name !== 'iifl' && formData.broker_name !== 'mhtrade') && value === ''  ? false : true
    },
  },
  broker_api: { 
    required: (value: any) => {
      return (formData.broker_name !== 'iifl' && formData.broker_name !== 'mhtrade') && value === ''  ? false : true
    },
  },
  broker_api_secret: { 
    required: (value: any) => {
      return (formData.broker_name !== 'iifl' && formData.broker_name !== 'mhtrade') && value === ''  ? false : true
    },
  },

  // iifle details
  app_name: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },
  client_code: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },
  client_password: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },
  provide_dob: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },
  ocp_apim_sub_key: {
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
   },
  encry_key: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },
  user_key: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },
  app_source: { 
    required: (value: any) => {
      return formData.broker_name == 'iifl' && value === ''  ? false : true
    },
  },


  is_active: {},
  is_editable: {}
}

let validate = useVuelidate(rules, toRefs(formData))

const submitForm = async () => {
  validate.value.$touch()
  // if (!validate.value.$invalid) {
  //   showAddEditModal.value = false
  // }
}

function resetValidation() {
  validate = useVuelidate(rules, toRefs(formData))
}

const save = async (id: number) => {
  validate.value.$touch()
  if (validate.value.$invalid) {
    showToast("Please check the filled form!")
  } else {
    formData.broker_name == 'iifl' ? formData.provide_dob = formData.provide_dob : formData.provide_dob = ''
    formData.is_active = formData.is_active ? true : false
    
    await addEditBroker(id, formData)
    showAddEditModal.value = false
    editBrokerData.value = {}
    resetValidation()
  }
}
</script>


<style scoped>

*{
  background-color: #141313
}
</style>