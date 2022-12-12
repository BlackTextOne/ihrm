<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    
    
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="navbar-title">欢迎光临iHRM后台登陆系统</div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo.staffPhoto" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <p class="username">{{ userInfo.username }}</p>
    <div class="function" style="float:right;height:50px;line-height:50px;margin-right:20px">
      <div class="screen" title="全屏" style="float:left;width:50px;text-align:center;cursor: pointer;" @click="scre">
        <i class="el-icon-rank" style="font-size:14px;"></i>
      </div>
      <!-- <div class="color" style="float:left;width:50px;text-align:center;cursor: pointer;">
        <i class="el-icon-brush"></i>
      </div> -->
      <Skin style="float:left;width:50px;height:50px;text-align:center;margin-top:16px;"/>
      <Lang />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getuserinfo, removeuserinfo } from "@/utils/session";
import Lang from '@/components/lang'
import Skin from '@/components/skin'
export default {
  data() {
    return {
      userInfo: getuserinfo(),
      scr:false
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    Lang,
    Skin
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    scre() {
      if(this.scr==false) {
        this.scr = true;
        document.documentElement.requestFullscreen() //全屏
      }
      if(this.scr==true) {
        this.scr = false;
        document.exitFullscreen() //退出全屏
      }
      
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      // await this.$store.dispatch("user/logout");
      this.$store.commit("user/removeToken");
      removeuserinfo();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .username {
    /* position: absolute;
    top: 3px;
    right: 90px; */
    float: right;
    height: 100%;
    line-height: 50px;
    margin: 0 20px 0 0;
  }
  .function {
    .lang-container {
      width: 50px;
      height: 50px;
      float: left;
      text-align: center;
      cursor: pointer;
    }
  }
  .navbar-title {
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    height: 100%;
    color: #515151;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #515151;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
