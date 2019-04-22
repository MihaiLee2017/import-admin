<template>
  <div id="app-main-content">
    <section id="app-header">
      <slot name="app-header"></slot>
    </section>
    <section id="app-body">
      <!-- <slot name="app-body"></slot> -->
      <slot></slot>
    </section>
    <section id="app-footer">
      <slot name="app-footer"></slot>
    </section>
  </div>
</template>
<script>
export default {
  name: 'AppMain',
  methods: {}
}
</script>

<style lang="scss" scoped>
#app-main-content {
  height: calc(100vh - 50px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 10px;
  border-top: 8px solid #eee;
  box-sizing: border-box;
  #app-body {
    flex: 1;
    overflow: hidden;
  }
}
</style>
