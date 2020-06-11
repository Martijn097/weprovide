<template>
  <div class="congratulations">
    <div class="jobs-title">
      <h3>Je bent ontsnapt! <br> Je gegevens zijn doorgestuurd naar We Provide!</h3>
    </div>
    <a href="https://www.weprovide.com/" class="start-button">
      <div class="left-bracket"></div>
      <div class="start-button-label">WE PROVIDE</div>
      <div class="right-bracket"></div>
      <div class="button-gradient"></div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.congratulations{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .jobs-title{
    margin-bottom: 40px;
    h3{
      font-weight: bolder;
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 1px;
      color: #EFD15B;
      font-family: Futura;
      text-transform: uppercase;
    }
  }
  .start-button{
    cursor: pointer;
    position: relative;
    display: inline-block;
    height: 50px;
    box-sizing: border-box;
    text-align: left;
    &:hover .start-button-label{
      color: white;
    }
    &:hover .button-gradient{
      opacity: 1;
    }
    .left-bracket{
      background: url("~@/assets/bracket2.png");
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
      display: inline-block;
      width: 22px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .start-button-label{
      position: relative;
      top: -18px;
      display: inline-block;
      color: #EFD15B;
      font-size: 20px;
      letter-spacing: 2px;
      width: 200px;
      text-align: center;
      line-height: 50px;
      height: 100%;
      transition: color .3s ease-out;
    }
    .right-bracket{
      background: url("~@/assets/bracket2.png");
      display: inline-block;
      width: 22px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .button-gradient{
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 2px;
      width: 241px;
      height: calc(100% - 0px);
      border: 2px solid;
      -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
      border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
      opacity: 0;
      transition: opacity .3s ease-out;
    }
  }
}



</style>