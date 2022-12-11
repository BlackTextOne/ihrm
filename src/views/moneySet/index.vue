<template>
  <div class="moneySet-container">
    <div class="main-left">
      <!-- 用户 -->
      <div class="user">
        <img src="@/assets/common/img.jpeg" />
        <div class="user-content">
          <span>离职</span>
          <p>入职时间：NaN-aN-aN 最新工资：{{ allMoney }}<i>?</i></p>
          <p>
            当月基本工资 / 当月岗位工资：{{ userMoney.currentBasicSalary }} /
            {{ userMoney.currentPostWage }}
          </p>
        </div>
      </div>

      <!-- 津贴 -->
      <div class="allowance">
        <h4>津贴</h4>
        <div class="allowance-content">
          <div class="money">
            <p><strong>津贴类型</strong></p>
            <p>交通补助</p>
            <p>午餐补助</p>
          </div>
          <div class="money">
            <p><strong>补贴金额</strong></p>
            <p>{{ moneySet.transportationSubsidyAmount }}</p>
            <p>{{ moneySet.lunchAllowanceAmount }}</p>
          </div>
          <div class="money">
            <p><strong>津贴类型</strong></p>
            <p>通讯补助</p>
            <p>住房补助</p>
          </div>
          <div class="money">
            <p><strong>补贴金额</strong></p>
            <p>{{ moneySet.communicationSubsidyAmount }}</p>
            <p>{{ moneySet.housingSubsidyAmount }}</p>
          </div>
        </div>
      </div>

      <!-- 社保公积金 -->
      <div class="social">
        <h4>社保公积金<span>企业 NaN</span><span>个人 NaN</span></h4>
        <div class="social-content">
          <div class="money">
            <p><strong>缴费项目</strong></p>
            <p>社保</p>
            <p>公积金</p>
            <p>缴费合计</p>
          </div>
          <div class="money">
            <p><strong>基数</strong></p>
            <p>0</p>
            <p>0</p>
            <p>0</p>
          </div>
          <div class="money">
            <p><strong>企业缴纳</strong></p>
            <p>0</p>
            <p>0</p>
            <p>NaN</p>
          </div>
          <div class="money">
            <p><strong>个人缴纳</strong></p>
            <p>0</p>
            <p>0</p>
            <p>NaN</p>
          </div>
        </div>
      </div>

      <!-- 天数 -->
      <div class="day">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="实际出勤天数（正式）：">
            <el-input
              v-model="form.day"
              style="width: 40%; margin-left: 50px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="计薪天数（正式）：">
            <el-input
              v-model="form.day"
              style="width: 40%; margin-left: 50px"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 招聘日程 -->
    <div class="main-right">
      <h4>招聘日程</h4>
      <hr />
      <div class="block" style="margin-top: 50px">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
            <h3>放弃</h3>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserMoneySet, getUserMoney } from "@/api/moneySet";
export default {
  data() {
    return {
      moneySet: {}, //津贴设置列表
      userMoney: {}, //用户薪资
      form: {
        day: 0,
      },
      reverse: true,
      activities: [
        {
          content: "HR专员",
          timestamp: "2018-12-3 3:30",
        },
        {
          content: "HR专员",
          timestamp: "2018-12-3 3:30",
        },
      ],
    };
  },
  computed: {
    allMoney() {
      return this.userMoney.currentBasicSalary + this.userMoney.currentPostWage;
    },
  },
  async created() {
    // console.log(this.$route.params.userId);
    const res = await getUserMoneySet(); //获取津贴设置
    this.moneySet = res;
    // console.log(this.moneySet);
    const res1 = await getUserMoney(this.$route.params.userId); //查询用户薪资
    this.userMoney = res1;
    // console.log(this.userMoney);
  },
};
</script>

<style lang="scss" scoped>
.moneySet-container {
  display: flex;
  padding: 50px;
  .main-left {
    width: 80%;
    .user {
      img {
        width: 100px;
        height: 100px;
      }
      .user-content {
        display: inline-block;
        span {
          display: inline-block;
          color: #fff;
          font-size: 14px;
          padding: 4px;
          border-radius: 4px;
          background-color: rgb(245, 108, 108);
        }
        p {
          margin-top: 30px;
          i {
            margin-left: 50px;
            width: 16px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            display: inline-block;
            font-size: 12px;
            border-radius: 50%;
            border: 1px solid rgb(103, 103, 103);
            color: rgb(103, 103, 103);
            font-style: normal;
          }
        }
      }
    }
    .allowance {
      .allowance-content {
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 30px;
        background-color: rgb(249, 249, 249);
        .money {
          display: inline-block;
          p {
            text-align: center;
          }
        }
      }
    }
    .social {
      h4 {
        span {
          font-weight: 400;
          margin-left: 100px;
        }
      }
      .social-content {
        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 30px;
        background-color: rgb(249, 249, 249);
        .money {
          display: inline-block;
          p {
            text-align: center;
          }
        }
      }
    }
    .day {
      margin-top: 50px;
    }
  }
  .main-right {
    width: 20%;
    .block {
      h3 {
        position: absolute;
        top: -20px;
        left: 195px;
        display: inline-block;
      }
    }
  }
}
//线
::v-deep .el-timeline-item__tail {
  height: 200%;
  left: 155px;
}
//ul
::v-deep .el-timeline {
  padding-left: 30px;
}
//li
::v-deep .el-timeline-item {
  height: 100px;
}
//点
::v-deep .el-timeline-item__node {
  background-color: #fff;
  border: 2px solid rgb(47, 173, 52);
  left: 150px;
}
//时间
::v-deep .is-bottom {
  color: black;
}
</style>
