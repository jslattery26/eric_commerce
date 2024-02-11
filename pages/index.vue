<!-- <template>
  <div class="home-container">
    <ParticlesView></ParticlesView>
    <!-- <the-home-top /> -->
<!-- <the-home-key-services />
    <contact-c-t-a /> -->
<!-- </div>
</template> -->
<template>
  <div id="container">
    <v-img id="background" src="/smoker.png" />
    <v-img id="overlayImage" v-if="active" src="/overlay.png" />
    <div
      id="overlay"
      @mouseover="mouseOver()"
      @mouseleave="active = false"
      @click="$router.push(`/home`)"
    ></div>
  </div>
</template>

<script>
export default {
  methods: {
    mouseOver() {
      this.active = true;
      var audio = new Audio("/quack.mov ");
      audio.play();
    },
  },
  data() {
    return {
      active: false,
    };
  },
};
</script>

<style>
#background {
  position: relative;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
}
#overlayImage {
  position: absolute;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#overlay {
  position: fixed;
  height: 50%;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
