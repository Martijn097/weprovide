<template>
  <div class="custom-cursor">
    <div class="custom-cursor__circle" :style="[circleStyle]" ref="customCursorCircle"></div>
    <div class="custom-cursor__dot" :style="[dotStyle]" ref="customCursorDot"></div>
  </div>
</template>

<script>
export default {
  name: "CustomCursor",
  props: {
    targets: Array,
    circleColor: String,
    circleColorHover: String,
    dotColor: String,
    dotColorHover: String,
    hoverSize: Number
  },
  data() {
    return {
      scale: 1,
      // x: null,
      // y: null,
      circlePosX: null,
      circlePosY: null,
      dotPosX: null,
      dotPosY: null,
      circleStyle: null,
      dotStyle: null
    };
  },
  methods: {
    customCursor(e) {
      // cursor pos
      // this.x = e.clientX;
      // this.y = e.clientY;
      // setTimeout(() => {
      //   this.circlePosX = e.clientX - 15;
      //   this.circlePosY = e.clientY - 15;
      // }, 100);
      // cursor circle
      const circle = this.$refs.customCursorCircle;
      const dot = this.$refs.customCursorDot;

        // this.dotPosX = this.x - dot.clientWidth / 2;
        // this.dotPosY = this.y - dot.clientHeight / 2;
      this.dotPosX = e.clientX;
      this.dotPosY = e.clientY;
      setTimeout(() => {
        this.circlePosX = e.clientX - 15;
        this.circlePosY = e.clientY - 15; 
      }, 50);
      //change style when hovering on selected targets
      if (
        (this.targets.length > 0 &&
        this.targets.includes(e.target.tagName.toLowerCase())) ||
        this.targets.includes(e.target.className.toLowerCase())
      ) {
        this.scale = this.hoverSize;
        this.circleStyle = { borderColor: this.circleColorHover };
        this.dotStyle = { backgroundColor: this.dotColorHover };
      } else {
        this.scale = 1;
        this.circleStyle = { borderColor: this.circleColor };
        this.dotStyle = { backgroundColor: this.dotColor };
      }
      //move custom cursor
      circle.style.transform = `translateX(${this.circlePosX}px) translateY(${this.circlePosY}px) translateZ(0) translate3d(0, 0, 0) scale(${this.scale})`;
      dot.style.transform = `translateX(${this.dotPosX - 3}px) translateY(${this.dotPosY - 3}px) translateZ(0) translate3d(0, 0, 0)`;
    }
  }, 
  mounted() {
    window.addEventListener("mousemove", this.customCursor);
  }
};
</script>

<style lang="scss" scoped>
// $ease: cubic-bezier(0.23, 1, 0.32, 1);
.custom-cursor {
  cursor: none;
  z-index: 2020;  
}
.custom-cursor__circle {
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border: 1px solid #2f2f2f;
  border-radius: 100%;
  transition: transform .6s ease;
  user-select: none;
  pointer-events: none;
  backface-visibility: hidden;
  position: fixed;
}
.custom-cursor__dot {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #2f2f2f;
  backface-visibility: hidden;
  pointer-events: none;
  z-index: 55555555;
  backface-visibility: hidden;
  will-change: transform;
  user-select: none;
}
</style>