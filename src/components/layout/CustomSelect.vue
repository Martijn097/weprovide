<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{open: open}" @click="open = !open">{{ selected }}</div>
    <div class="items" :class="{selectHide: !open}">
      <div
          class="item"
          v-for="(option, i) of options"
          :key="i"
          @click="selected=option; open=false; $emit('input', option)"
      >{{ option }}</div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false
    };
  },
  props:{
    options:{
      type: Array,
      required: true
    },
    tabindex:{
      type: Number,
      required: false,
      default: 0
    }
  },
  mounted(){
    this.$emit('input', this.selected);
  }
};

</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.selected {
  background-color: #080D0E;
  border-radius: 6px;
  border: 1px solid #858586;
  color: #ffffff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.selected.open {
  border: 1px solid #CE9B2C;
  border-radius: 6px 6px 0px 0px;
}

.selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.items {
  color: #ffffff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #CE9B2C;
  border-left: 1px solid #CE9B2C;
  border-bottom: 1px solid #CE9B2C;
  position: absolute;
  background-color: #080D0E;
  left: 0;
  right: 0;
}

.item {
  color: #ffffff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.item:hover {
  background-color: #B68A28;
}

.selectHide {
  display: none;
}






// $vue-navy: #2c3e50;
// $vue-navy-light: #3a5169;
// $vue-teal: #42b883;
// $vue-teal-light: #42b983;
// $light-gray: #f8f8f8;

// @mixin active-state() {
//   background-color: #f4fbf8;
//   border: none;
// }

// @mixin ellipsis() {
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }

// body {
//   background: $light-gray;
//   color: $vue-navy;
//   font-family: 'Source Sans Pro', sans-serif;
//   min-height: 1000px;
// }

// h1 {
//   font-size: 3.6em;
//   font-weight: 100;
//   text-align: center;
//   margin-bottom: 0;
//   color: $vue-teal;
// }

// p {
//   color: $vue-navy-light;
//   text-align: center;
//   margin-top: 10px;
// }

// .vue-select {
//   width: 300px;
//   background-color: #fff;
//   margin: 45px auto;
//   cursor: pointer;
//   user-select: none;
//   box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.06);
//   border: none;
//   transition: all 200ms linear;
  
//   .selected-option {
//     @include ellipsis();
//     display: inline-block;
//     padding: 15px 50px 15px 15px;
//     width: 100%;
//     position: relative;
//     box-sizing: border-box;
//     transition: all 200ms linear;
    
//     &:hover {
//       color: rgba(0,0,0,.45);
//     }
      
//     svg {
//       fill: $vue-teal;
//       position: absolute;
//       right: 8px;
//       top: 50%;
//       transform: translateY(-50%);
//       transition: fill 300ms linear;
//       &:hover {
//         fill: darken($vue-teal, 15%);
//       }
//     }
//   }
// }

// .dropdown-options-container {
//   overflow-y: scroll;
//   height: 150px;
// }

// .dropdown-options--cell {
//   padding: 15px;
//   user-select: none;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;

//   &:hover { 
//     @include active-state();
//   }
// }
// .dropdown-options.selected {
//   .dropdown-options--cell {
//     @include active-state(); 
//   }
// }

// .slide-enter-active, .slide-leave-active  {
//   transition: height 150ms ease;
// }

// .slide-enter, .slide-leave-to {
//   height: 0px;
// }
</style>