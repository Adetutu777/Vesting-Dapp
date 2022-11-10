<template>
<div class="">
    <div class="container mt-5">
        <!-- <ValidationObserver> -->

        <form class="mb-5 mt-0" @submit.prevent="createScheduler">

            <label class="mt-3">Wallet Address:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
            <b-form-input v-model="vestedSchd._beneficiary" placeholder="Enter beneficiary wallet address" />
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <label class="mt-3">Start Date:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
             <b-form-datepicker  v-model="startDate" class="mb-2"></b-form-datepicker>
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <label class="mt-3">End Date:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
             <b-form-datepicker  v-model="endDate" class="mb-2"></b-form-datepicker>
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <label class="mt-3">Amount:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
            <b-form-input v-model="vestedSchd._amount" />
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <!-- cliff -->
            <label class="mt-3">Cliff:</label>
            <!-- <ValidationProvider rules="" v-slot="{ errors }"> -->
            <b-form-input v-model="vestedSchd._cliff" 
            placeholder="enter in month"/>
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->
            <!-- revoke button -->
             <b-form-group label="Revokable">
      <b-form-radio v-model="vestedSchd._revocable"  value= true>Yes</b-form-radio>
      <b-form-radio v-model="vestedSchd._revocable" value= false >No</b-form-radio>
    </b-form-group>

            <b-button type="submit" class="btn-classes-active update-btn mt-5 bg-info"  block>
                {{
             crud ? 'Sending': 'Submit'
           }}
            </b-button>

        </form>
        <!-- </ValidationObserver> -->
    </div>
</div>
</template>

<script>
import {
    ref,
    onMounted,
    reactive
} from '@nuxtjs/composition-api';
import bunzz from 'bunzz-sdk';
import {
    DAPP_ID,
    API_KEY
} from "@/constant"
export default {
    setup() {
        const name = ref('')
        const amount = ref('')
        const startDate = ref('')
        const endDate = ref('')
        const contract = ref('')
        const crud = ref('')
        const vestedSchd = reactive({
            _beneficiary: "",
            _start: "",
            _cliff: "",
            _duration: "",
            _slicePeriodSeconds: "",
            _revocable: "",
            _amount: "",
        })

        onMounted(() => {
            initContract()
        })

        const handle = async () => {
            const allow = await bunzz.initWithConnect({
                dappId: DAPP_ID,
                apiKey: API_KEY,

            })
            return allow
        }

        const MODULE_NAME = "Vesting"
        const initContract = async () => {
            try {
                const handler = await handle();
                const getContract = await handler.getContract(MODULE_NAME);
                // console.log('ttt', contract)
                contract.value = getContract;
            } catch (error) {
                console.error(error);
            }
        }
        // just testing the contract to see if it works
        // const getName = async () => {
        //     const resp = await contract ?.value?.owner()
        //     name.value = resp.data
        // }

        const createScheduler = async () => {
                const startsTime =  Date.parse(startDate.value)/1000
            const duration = Math.abs(new Date(startDate.value) - new Date(endDate.value)) / 1000;

                const cliff =Number(vestedSchd._cliff)*2.628*10**6

                    vestedSchd._start = startsTime;
                    vestedSchd._duration = duration;
                    vestedSchd._slicePeriodSeconds = Math.ceil(Number(vestedSchd._amount)/duration)

              const { _beneficiary, _start,  _cliff,  _duration, _slicePeriodSeconds,_revocable,_amount } = vestedSchd

          try {
            const result = await contract?.value?.createVestingSchedule( _beneficiary, _start, cliff, _duration, _slicePeriodSeconds, true, _amount)
            console.log('resy', result)
            
          } catch (error) {
            console.log(error)
          }
        }

        

        return {
            amount,
            name,
            contract,
            crud,
             vestedSchd, startDate, endDate, createScheduler
        }
    }
}
</script>

<style scoped>

</style>
