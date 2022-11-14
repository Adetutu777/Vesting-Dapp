<template>
<div class="">
   

    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item  to="../beneficiary">Beneficiary</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
        <!-- <ValidationObserver> -->
 <div class="container mt-5">
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
            <b-form-datepicker  v-model="vestedSchd._cliff" placeholder="enter in month" class="mb-2"></b-form-datepicker>
            <!-- <b-form-input v-model="vestedSchd._cliff" 
            placeholder="enter in month"/> -->
            <!-- <span class="" style="color:red">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>  -->
            <!-- revoke button -->
             <!-- <b-form-group label="Revokable">
      <b-form-radio v-model="vestedSchd._revocable"  value= 'true'>Yes</b-form-radio>
      <b-form-radio v-model="vestedSchd._revocable" value= 'null' >No</b-form-radio>
    </b-form-group> -->

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
    ref,onMounted,reactive,} from '@nuxtjs/composition-api';
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
            _slicePeriodSeconds: 2,
            _revocable: "true",
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
                // connecting to other contract
                // const connect = getContract.connectToOtherContracts(['0x5799F73217c54b91CAE323D4FBe79b15A38C311C'])
                // console.log('connecty', connect)
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
                const cliff =  Date.parse(vestedSchd._cliff)/1000
            const duration = Math.abs(new Date(startDate.value) - new Date(endDate.value)) / 1000;

                // const cliff = vestedSchd._cliff

                    // vestedSchd._cliff =cliff;
                    vestedSchd._start = startsTime;
                    vestedSchd._duration = duration;
                    // vestedSchd._slicePeriodSeconds = Math.ceil(Number(vestedSchd._amount)/duration)

              const { _beneficiary, _start,  _cliff,  _duration, _slicePeriodSeconds,_revocable,_amount } = vestedSchd

          try {
            const result = await contract?.value?.createVestingSchedule( _beneficiary, _start, cliff, _duration, _slicePeriodSeconds, 'true', _amount, { gasLimit: "1000000" })
            
            
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
