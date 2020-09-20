<template>
  <div class="loading-mask">
    <div class="loading-content">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.loading-mask {
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #f5f5dc;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-content{
    position:relative;
    display: flex;
    align-items: center;
}
.loading-content span{
    display:block;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:#ff6600;
    margin: 0 1px;
    /* position:absolute; */
    animation: loading 1.5s  infinite ease-in-out;
}
.loading-content span:nth-child(2){
    animation-delay: .2s;
}
.loading-content span:nth-child(3){
    animation-delay: .4s;
}
.loading-content span:nth-child(4){
    animation-delay: .6s;
}
.loading-content span:nth-child(5){
    animation-delay: .8s;
}
@keyframes loading {
    0% {height:5px;transform:translateY(0px);background:#ff6600;}
    25% {height:40px;transform:translateY(0);background:#f12711;}
    50% {height:5px;transform:translateY(0px);background:#ff6600;}
    100% {height:5px;transform:translateY(0px);background:#ff6600;}
}
</style>
