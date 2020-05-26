<template>
  <div class="choice-page">
    <CustomSelect :options="['first', 'second']"/>
  </div>
</template>

<script>
import CustomSelect from "../components/layout/CustomSelect.vue"

export default {
  components: {
    CustomSelect
  },
  data() {
    return {
 
    };
  }
};

</script>

<style lang="scss" scoped>
.choice-page{
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>