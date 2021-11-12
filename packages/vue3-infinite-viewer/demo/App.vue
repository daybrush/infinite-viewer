<template>
  <VueInfiniteViewer class="viewer">
    <div class="viewport">AA</div>
  </VueInfiniteViewer>
</template>
<style>
html,
body,
.container {
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
}
.viewer {
  border: 1px solid black;
  position: relative;
  width: 800px;
  height: 800px;
}
.viewport {
  position: relative;
  width: 400px;
  height: 600px;
  background: #f55;
}
</style>
<script>
import { VueInfiniteViewer } from "../src/index";
export default {
  components: {
    VueInfiniteViewer
  },
};
</script>