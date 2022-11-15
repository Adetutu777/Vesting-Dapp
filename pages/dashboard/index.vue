<template>
    <div>
           <!-- <div class="" v-if="loading">loading.....</div>
        <div class = "container" v-if="loading ==false">
        <div class="row">
        <div class="table"  >
    <b-table striped hover :items = "data"></b-table>
    </div>
  </div>
  </div> -->
    </div>
</template>

<script>
import { onMounted, ref } from "@nuxtjs/composition-api";
import { useContract } from "@/store";
export default {
  setup() {
    const contract = ref("");
    const data = ref([]);
    const amount = ref("");

    onMounted(async () => {
      contract.value = await useContract();
      await populateData();
      await getVestingSchedulesTotalAmount();
    });

                    const getVestingSchedulesCount = async () => {
              const count = await contract.value.getVestingSchedulesCount()
            return count.data.toString()
              
        }

                const populateData = async () =>{

                    const count = await getVestingSchedulesCount()
                    const tempData =[]
                    for (let index = 0; index < count; index++) {
                        const {data:byte32} = await contract.value.getVestingIdAtIndex(index);
                        
                        const info = await contract.value.getVestingSchedule(byte32);

                        const obj = {
                            Beneficiary: info?.data?.[0],
                            cliff: info?.data?.[1],
                            start:new Date(info?.data?.[2]*1000).toLocaleDateString(),
                            duration: info?.data?.[3],
                            ['Slice/Sec']: info?.data?.[4],
                            Total: info?.data?.[5],
                            released: info?.data?.[6],
                            initialized: info?.data?.[7] ? 'Yes' : 'No',
                            revocable: info?.data?.[8] ? 'Yes' : 'No',
                            revoked:info?.data?.[9] ? 'Yes' : 'No',
                        }
                                    
                             tempData.push(obj)      
                    }

                    data.value = tempData
                }
                
                const getVestingSchedulesTotalAmount = async () => {
                    
                    const totalAmount = await contract.value.getVestingSchedulesTotalAmount()
                     amount.value =totalAmount.data
                     
                }
                
        

                    return {data, }
        }
    }
</script>

<style scoped>
.table{
    max-width: 100rem;
    overflow: scroll;
}
</style>