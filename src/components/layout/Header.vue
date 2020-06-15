<template>
  <div class="header-page">
    <div class="site-header__help">?</div>
    <div class="site-header__logo">
      We Provide
    </div>
    <div class="site-header__share">test</div>
  </div>
</template>
<script>

export default {
  name: 'Header',
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
.header-page{
  width: 100%;
  padding: 50px 70px 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: top 0.3 ease;   
  position: absolute;
  .site-header__help {
    border-radius: 50%;
    border: 0.1875rem solid white;;
    color: white;;
    font-size: 1.5rem;
    font-weight: 600;
    height: 2.5rem;
    text-align: center;
    width: 2.5rem;
    z-index: 100;
    cursor: pointer;
    &:hover{
      animation-name: wiggle;
      animation-duration: .5s;
      animation-iteration-count: 1;
    }
  }
  .site-header__logo{
    width: 80px;
    height: 59px;
    top: 50px;
    display: block;
    transition: transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    svg{
      width: 150px;
    }
  }
  .site-header__btn{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    border: 2px solid;
    border-color: #4F555C;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    transition: opacity 0.2s ease,transform 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55),border-color 0.5s ease;
  }
}




@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>