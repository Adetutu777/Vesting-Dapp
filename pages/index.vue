<template>
  <div class="body">
<nav class="navbar navbar-dark sticky-top flex-md-nowrap p-0">
	<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Vesting</a>
	<ul class="navbar-nav px-3">
		<li class="nav-item text-nowrap">
			<a class="nav-link" href="#"></a>
		</li>
	</ul>
</nav>
<div class="container-fluid">
	<div class="row">
		<nav class="col-md-2 d-none d-md-block sidebar">
			<div class="sidebar-sticky">
				<ul class="nav flex-column">
					<li class="nav-item">
						<a class="nav-link active" href="#">
                  <i class="zmdi zmdi-widgets"></i>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
					</li>
					<li class="nav-item">
						<NuxtLink class="nav-link" to="/schedule">
                  <i class="zmdi zmdi-file-text"></i>
                  Create Schedule
            </NuxtLink>
					</li>
					<li class="nav-item">
					<NuxtLink class="nav-link" to="/help">
                  <i class="zmdi zmdi-shopping-cart"></i>
                  Help
               </NuxtLink>
					</li>
				</ul>
       
			</div>
		</nav>
<!-- <div class="load" v-if="loading==true">loading.....</div> -->
		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
			<div class="card-list">
				<div class="row">
					<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
						<div class="card blue">
							<div class="title">Total Beneficiary</div>
							<i class="zmdi zmdi-upload"></i>
							<div class="value">{{data.length}}</div>
							<div class="stat"></div>
						</div>
					</div>
					<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
						<div class="card green">
							<div class="title">Total Vested</div>
							<i class="zmdi zmdi-upload"></i>
							<div class="value">{{amount}}</div>
							<div class="stat"></div>
						</div>
					</div>
					<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
						<div class="card orange">
							<div class="title">total supply</div>
							<i class="zmdi zmdi-download"></i>
							<div class="value">{{supply}}</div>
							<div class="stat"></div>
						</div>
					</div>
					<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
						<div class="card red">
							<div class="title">Token name</div>
							<i class="zmdi zmdi-download"></i>
							<div class="value">V5</div>
							<div class="stat"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="projects mb-4">
				<div class="projects-inner">
					<header class="projects-header">
						<div class="title">List of Users</div>
						<div class="count">| {{data?.length}} beneficiary </div>
						<i class="zmdi zmdi-download"></i>
					</header>

           <div>
             <b-table class="text-light"  :items = "data"></b-table>
          </div>
				</div>
			</div>
			<div class="chart-data">
				<div class="row">
        <div class="chart-div">

        <!-- <LineChart :chartData ="chartData" :optons="chartOptions" /> -->
        <!-- <line-chart
  :chart-options='chartOptions'
  :chart-data='chartData'
  chart-id='myCustomId'
/> -->
        
        </div>
        </div>
			</div>
		</main>
	</div>
</div>

  </div>
</template>



<script>
import { onMounted, ref,} from '@nuxtjs/composition-api';
import {useContract} from "@/store"
import millify from "millify";
    export default {
        setup(props){
            const contract = ref('')
            const data = ref ([])
            const amount = ref('')
            const supply = ref(millify(3010000000000000010000000/1e18))
            // const loading = ref(true)

                    onMounted ( async()=>{
                            contract.value = await useContract()
                           await  populateData()
                         await  getVestingSchedulesTotalAmount()
                        //  loading.value = false
                    })

                    const getVestingSchedulesCount = async () => {
            //   const count = await contract?.value?.getVestingSchedulesCount()
            // return count.data.toString()
            // return 2
            try {
              const count = await contract?.value?.getVestingSchedulesCount()
               return count.data.toString()
               return 2
            } catch (error) {
              console.log(error)
            }
              
        }

                const populateData = async () =>{
                    const count = await getVestingSchedulesCount()
                    const tempData =[]
                    for (let index = 0; index < count; index++) {
                        const {data:byte32} = await contract?.value?.getVestingIdAtIndex(index);
                        
                        const info = await contract?.value?.getVestingSchedule(byte32);

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
                     amount.value =millify(Number(totalAmount.data)/1e18)
                }


        //     const getContract = () => {
        //       const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        //     return new ethers.Contract(ContractAddress, abi, provider);
        // }
        //         const getTotalSupply=()=> {
        //           const contract
        //         }

                    return {data, amount, supply}
        }
    }
</script>
<style scoped>

@import "https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/dashboard.scss";
.body {
  background-color: #1b2431;
  color: #202020;
  font-family: "Montserrat", "Helvetica", "Open Sans", "Arial";
  font-size: 1rem;
  height: 100vh;
}

a:hover {
  text-decoration: none;
}

p,
figure {
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: #1b2431;
}

.sidebar {
  background-color: #1b2431;
  box-shadow: none;
}
.sidebar .nav-link {
  border-left: 5px solid transparent;
  color: #738297;
  padding: 0.5rem 0.75rem;
}
.sidebar .nav-link:hover {
  color: white;
}
.sidebar .nav-link.active {
  border-left: 5px solid #738297;
  color: white;
}
.sidebar .zmdi {
  display: inline-block;
  font-size: 1.35rem;
  margin-right: 5px;
  min-width: 25px;
}

.card-list {
  width: 100%;
}
.card-list:before, .card-list:after {
  content: " ";
  display: table;
}
.card-list:after {
  clear: both;
}

.card {
  border-radius: 8px;
  color: white;
  padding: 10px;
  position: relative;
}
.card .zmdi {
  color: white;
  font-size: 28px;
  opacity: 0.3;
  position: absolute;
  right: 13px;
  top: 13px;
}
.card .stat {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 8px;
  margin-top: 25px;
  padding: 10px 10px 0;
  text-transform: uppercase;
}
.card .title {
  display: inline-block;
  font-size: 8px;
  padding: 10px 10px 0;
  text-transform: uppercase;
}
.card .value {
  font-size: 28px;
  padding: 0 10px;
}
.card.blue {
  background-color: #2298F1;
}
.card.green {
  background-color: #66B92E;
}
.card.orange {
  background-color: #DA932C;
}
.card.red {
  background-color: #D65B4A;
}

.projects {
  background-color: #273142;
  border: 1px solid #313D4F;
  overflow-x: auto;
  width: 100%;
}
.projects-inner {
  border-radius: 4px;
}

.projects-header {
  color: white;
  padding: 22px;
}
.projects-header .count,
.projects-header .title {
  display: inline-block;
}
.projects-header .count {
  color: #738297;
}
.projects-header .zmdi {
  cursor: pointer;
  float: right;
  font-size: 16px;
  margin: 5px 0;
}
.projects-header .title {
  font-size: 21px;
}
.projects-header .title + .count {
  margin-left: 5px;
}

.projects-table {
  background: #273142;
  width: 100%;
}
.projects-table td,
.projects-table th {
  color: white;
  padding: 10px 22px;
  vertical-align: middle;
}
.projects-table td p {
  font-size: 12px;
}
.projects-table td p:last-of-type {
  color: #738297;
  font-size: 11px;
}
.projects-table th {
  background-color: #313D4F;
}
.projects-table tr:hover {
  background-color: red;
}
.projects-table tr:not(:last-of-type) {
  border-bottom: 1px solid #313D4F;
}
.projects-table .member figure,
.projects-table .member .member-info {
  display: inline-block;
  vertical-align: top;
}
.projects-table .member figure + .member-info {
  margin-left: 7px;
}
.projects-table .member img {
  border-radius: 50%;
  height: 32px;
  width: 32px;
}
.projects-table .status > form {
  float: right;
}
.projects-table .status-text {
  display: inline-block;
  font-size: 12px;
  margin: 11px 0;
  padding-left: 20px;
  position: relative;
}
.projects-table .status-text:before {
  border: 3px solid;
  border-radius: 50%;
  content: "";
  height: 14px;
  left: 0;
  position: absolute;
  top: 1px;
  width: 14px;
}
.projects-table .status-text.status-blue:before {
  border-color: #1C93ED;
}
.projects-table .status-text.status-green:before {
  border-color: #66B92E;
}
.projects-table .status-text.status-orange:before {
  border-color: #DA932C;
}
.projects-table .status-text.status-red:before {
  border-color: #D65B4A;
}

.selectric {
  background-color: transparent;
  border-color: #313D4F;
  border-radius: 4px;
}
.selectric .label {
  color: #738297;
  line-height: 34px;
  margin-right: 10px;
  text-align: left;
}
.selectric-wrapper {
  float: right;
  width: 150px;
}

.chart {
  border-radius: 3px;
  border: 1px solid #313D4F;
  color: white;
  padding: 10px;
  position: relative;
  text-align: center;
}
.chart canvas {
  height: 400px;
  margin: 20px 0;
  width: 100%;
}
.chart .actions {
  margin: 15px;
  position: absolute;
  right: 0;
  top: 0;
}
.chart .actions span {
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  margin: 5px;
  padding: 4px;
}
.chart .actions .btn-link {
  color: white;
}
.chart .actions .btn-link i {
  font-size: 1.75rem;
}
.chart .title {
  font-size: 18px;
  margin: 0;
  padding: 15px 0 5px;
}
.chart .title + .tagline {
  margin-top: 10px;
}
.chart .tagline {
  font-size: 12px;
}

.danger-item {
  border-left: 4px solid #A84D43;
}

.zmdi {
  line-height: 1;
  vertical-align: middle;
}

.load{
  display:flex;
  justify-content:center;
  align-items:center;
  color:white;
  font-size:2rem

}
</style>
