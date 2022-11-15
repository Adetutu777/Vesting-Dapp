<template>
<div class="">
   
      
        <!-- <ValidationObserver> -->
        <div class="body">
 <div class="container">
  <button class="block-btn mb-3 mt-3"  style='border:none' @click.prevent="$router.back()">
           <!-- <img class="point-btn" src="/backBtn.svg" alt="image"> -->
      <span class="img-resize">&#128281;</span>    
         </button>
   <h4 class="text-center text-light pt-5">Create Schedule</h4>
        <form class="mb-5 mt-0" @submit.prevent="createScheduler">

            <label class="mt-3 text-light">Wallet Address:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
            <b-form-input class="border-inp" v-model="vestedSchd._beneficiary" placeholder="Enter beneficiary wallet address" />
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <label class="mt-1 text-light">Start Date:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
             <b-form-datepicker class="border-inp2"  v-model="startDate"></b-form-datepicker>
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <label class="mt-3 text-light">End Date:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
             <b-form-datepicker class="border-inp2" v-model="endDate"></b-form-datepicker>
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <label class="mt-3 text-light">Amount:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
            <b-form-input class="border-inp" v-model="vestedSchd._amount" />
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <!-- cliff -->
            <label class="mt-1 text-light">Cliff:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
            <b-form-datepicker class="border-inp2" v-model="vestedSchd._cliff" placeholder="enter in month"></b-form-datepicker>


            <b-button type="submit" class="btn-classes-active update-btn mt-4 bg-info mb-5"  block>
                {{
             crud ? 'Sending': 'Submit'
           }}
            </b-button>

        </form>
        <!-- </ValidationObserver> -->
    </div>
    </div>
</div>
</template>

<script>
import { ref,onMounted,reactive } from '@nuxtjs/composition-api';
// import bunzz from 'bunzz-sdk';
// import { DAPP_ID, API_KEY } from "@/constant"
import {useContract} from "../../store"

export default {
    setup() {
        const name = ref('')
        const amount = ref('')
        const startDate = ref('')
        const endDate = ref('')
        const contract = ref('')
        const crud = ref('')
         const vestingContract = ref('')
        const vestedSchd = reactive({
            _beneficiary: "",
            _start: "",
            _cliff: "",
            _duration: "",
            _slicePeriodSeconds: 2,
            _revocable: "true",
            _amount: "",
        })

        onMounted (async() => {
    const resp = await useContract()
    contract.value = resp
          // await getVestingSchedules(contract.value)
        })

       
        

        // just testing the contract to see if it works
        // const getName = async () => {
        //     const resp = await contract ?.value?.owner()
        //     name.value = resp.data
        // }

         

        const createScheduler = async () => {
                const startsTime =  Date.parse(startDate.value)/1000
                const cliff =  Date.parse(vestedSchd._cliff)/1000
            const duration = Math.abs(new Date(startDate.value) - new Date(endDate.value)) / 1000;

                    vestedSchd._start = startsTime;
                    vestedSchd._duration = duration;

              const { _beneficiary, _start,  _cliff,  _duration, _slicePeriodSeconds,_revocable,_amount } = vestedSchd

          try {
            const result = await contract?.value?.createVestingSchedule( _beneficiary, _start, cliff, _duration, _slicePeriodSeconds, 'true', _amount, { gasLimit: "1000000" })
            
            
          } catch (error) {
            console.log(error)
          }
        }

        

        return {
            amount, name, contract, crud, vestedSchd, startDate, endDate, createScheduler, 
        }
    }
}
</script>

<style scoped>
.body {
  background-color: #1b2431;
  color: #202020;
  font-family: "Montserrat", "Helvetica", "Open Sans", "Arial";
  font-size: 13px;
  height: 100vh;
}

.border-inp{
  border:1px solid rgb(243, 124, 103);
  border-radius: 7px;
  background: transparent;
  padding: 1.3rem;
  color:white !important;
  margin-bottom: 1rem;
}
.border-inp2{
  border:1px solid rgb(243, 124, 103);
  border-radius: 7px;
  background: transparent;
  color:white !important;
  padding: 0.1rem;
}

.block-btn{
  border: none;
  background: #1b2431;
  color: white;
}

.img-resize{
  font-size: 2rem;
}
</style>
