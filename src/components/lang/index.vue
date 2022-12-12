<template>
  <div class="lang-container">
    <el-dropdown class="el-dropdown1" @command="changeLanguage">
      <span class="el-dropdown-link">
        <svg-icon icon-class="T" style="color: black"></svg-icon>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="'en' === $i18n.locale"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Coookie from "js-cookie";
export default {
  methods: {
    changeLanguage(lang) {
      Coookie.set("language", lang);
      this.$i18n.locale = lang;
      this.$message.success("切换成功");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
