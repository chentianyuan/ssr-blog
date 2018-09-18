<template>
  <el-header class="page-home--header">
    <section
      class="page-home--header-wrap"
    >
      <el-menu
      :default-active="'1'"
      mode="horizontal"
      class="page-home--header-menu"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      width="100%">
        <el-menu-item index="1">前端</el-menu-item>
        <el-menu-item index="2">网络</el-menu-item>
        <el-menu-item index="3">node</el-menu-item>
      </el-menu>
    </section>
  </el-header>
</template>

<script>
export default {
  name: 'homeHeader',
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>

<style lang="less">
.page-home--header {
  width: 100%;
  padding: 0;
  .page-home--header-wrap {
    .page-home--header-menu {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
