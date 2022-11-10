<template>
<div class="">
    <div class="container mt-5">
        <!-- <ValidationObserver> -->
        <button @click="getName">get name</button>
        {{name}}
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
            <b-form-input v-model="vestedSchd.__amount" />
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->

            <b-button @click="filterResult" class="btn-classes-active update-btn mt-5" :disabled="crud || !name && !duration && !amount" size="sm" block>
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
            __amount: "",
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
        const getName = async () => {
            const resp = await contract ?.value?.owner()
            name.value = resp.data
        }


        const createScheduler = async () => {
                

        }

        return {
            amount,
            name,
            contract,
            crud,
            getName, vestedSchd, startDate, endDate, createScheduler
        }
    }
}
</script>

<style scoped>

</style>
