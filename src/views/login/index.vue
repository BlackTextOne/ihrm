<template>
  <div class="login-container">
    <div class="out">
      <div class="loginBg">
        <div class="bgContent">
          <h1>人力资源管理系统</h1>
          <span>Human resource management system</span>
          <p>登陆界面</p>
        </div>
        <img src="@/assets/login_images/login-bg.png" class="bgImg" />
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="el-from-content">
          <div class="title-container">
            <h3 class="title">手机号登录</h3>
          </div>

          <el-form-item prop="mobile">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="mobile"
              v-model="loginForm.mobile"
              placeholder="请输入用户名"
              name="mobile"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >

          <div class="tips">
            <div class="tips-left">
              <input type="checkbox" checked />记住密码
            </div>
            <a href="">忘记密码？</a>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    const validateMobile = (rule, value, callback) => {
      if (validMobile(value)) {
        callback();
      } else {
        callback(new Error("手机号格式不正确"));
      }
    };
    return {
      loginForm: {
        mobile: "13800000002",
        password: "123456",
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", message: "请填写手机号" },
          { trigger: "blur", validator: validateMobile },
        ],
        password: [
          { required: true, trigger: "blur", message: "请填写密码" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["user/login"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            await this["user/login"](this.loginForm);
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__inner {
      color: #a7a7a7;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(167, 167, 167, 0.5);
    border-radius: 8px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #c1c1c1;

.login-container {
  background: url("../../assets/login_images/bg.png") repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .out {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    .loginBg {
      position: relative;
      width: 800px;
      overflow: hidden;
      .bgContent {
        width: 450px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        h1 {
          letter-spacing: 5px;
          font-size: 50px;
          font-weight: 400;
          margin: 0;
        }
        span {
          display: inline-block;
          width: 100%;
          letter-spacing: 0px;
          font-size: 24px;
        }
        p {
          font-size: 30px;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }

    .login-form {
      border-radius: 0 10px 10px 0;
      margin: auto 0;
      height: 439px;
      position: relative;
      width: 300px;
      max-width: 100%;
      padding: 0 35px;
      overflow: hidden;
      .el-from-content {
        margin: 80px 0;
      }
    }
  }
  .el-button {
    background-color: #505050;
    border: none;
    border-radius: 6px;
    height: 46px;
  }
  .tips {
    font-size: 14px;
    color: #a7a7a7;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .tips-left {
      display: flex;
      align-items: center;
      input {
        margin-right: 5px;
        border-radius: 0;
      }
    }
    a {
      &:hover {
        color: #000;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      color: #000;
      margin: 0px auto 20px auto;
      text-align: left;
      font-weight: 500;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
