<template>
    <div class="body">
        <div class="container">
     <button class="block-btn mb-3 mt-3"  style='border:none' @click.prevent="$router.back()">
           <!-- <img class="point-btn" src="/backBtn.svg" alt="image"> -->
      <span class="img-resize">&#128281;</span>    
         </button>

            <h4 class="head-text text-center pt-5">Coming soon......😇</h4>
    </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.body {
  background-color: #1b2431;
  font-family: "Montserrat", "Helvetica", "Open Sans", "Arial";
  height: 100vh;
}

.head-text{
    color:white
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