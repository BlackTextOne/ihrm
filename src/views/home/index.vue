<template>
  <div class="home-container">
    <el-card class="box-card box-card1">
      <el-avatar :size="50" :src="circleUrl"></el-avatar>
      <div class="content">
        <h3>早安，管理员，祝你开心每一天！</h3>
        <p>早安，管理员，祝你开心每一天！</p>
      </div>
    </el-card>
    <el-card class="box-card box-card2">
      <el-calendar>
        <template slot="dateCell" slot-scope="{ date }">
          <div class="date-content">
            <span class="text">{{ getDay(date) }}</span>
            <span v-if="isWeek(date)" class="rest">休</span>
          </div>
        </template>
      </el-calendar>
    </el-card>
    <el-card class="box-card box-card3">
      <div slot="header" class="clearfix">
        <span
          >流程申请
          <div class="car-down"></div
        ></span>
      </div>
      <el-button>加班离职</el-button>
      <el-button>请假调休</el-button>
      <el-button>审批列表</el-button>
      <el-button>我的信息</el-button>
    </el-card>
    <el-card class="box-card box-card4">
      <div slot="header" class="clearfix">
        <span>绩效指数</span>
      </div>
      <div id="main" style="width: 100%; height: 500px"></div>
    </el-card>
    <el-card class="box-card box-card5" :body-style="{ padding: '0 20px' }">
      <div slot="header" class="clearfix">
        <span>公告</span>
      </div>
      <div class="content" v-for="item in text" :key="item.id">
        <img src="@/assets/common/img.jpeg" />
        <div class="content-text">
          <h4>
            <span>{{ item.name }}</span
            >{{ item.title }}
          </h4>
          <p>{{ item.time }}</p>
        </div>
      </div>
    </el-card>
    <el-card class="box-card box-card6">
      <div slot="header" class="clearfix">
        <span
          >帮助链接
          <div class="car-down"></div
        ></span>
      </div>
      <div class="out-content">
        <div class="content" v-for="item in btn" :key="item.id">
          <img :src="item.img" />
          <p>{{ item.text }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import avatar from "@/assets/common/head.jpg";
import * as echarts from "echarts";

export default {
  data() {
    return {
      value: new Date(),
      circleUrl: avatar,
      text: [
        {
          name: "欧豪",
          title: "发布了第1期传智大讲堂互动讨论获奖名单公布",
          time: "2020-07-21 15:21:38",
        },
        {
          name: "欧豪",
          title: "发布了第2期传智大讲堂互动讨论获奖名单公布",
          time: "2020-07-21 15:21:38",
        },
        {
          name: "欧豪",
          title: "发布了第3期传智大讲堂互动讨论获奖名单公布",
          time: "2020-07-21 15:21:38",
        },
      ],
      btn: [
        {
          img: "data:image/png;base64,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",
          text: "入门指南",
        },
        {
          img: "data:image/png;base64,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",
          text: "在线帮助手册",
        },
        {
          img: "data:image/png;base64,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",
          text: "联系技术支持",
        },
      ],
    };
  },
  methods: {
    getDay(date) {
      return date.getDate();
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0;
    },
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
      title: {
        text: "基础雷达图",
      },
      legend: {
        data: ["小美", "阿龙"],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "考勤", max: 6500 },
          { name: "积极", max: 16000 },
          { name: "管理", max: 30000 },
          { name: "正确率", max: 38000 },
          { name: "态度", max: 52000 },
          { name: "贡献", max: 25000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [5500, 14000, 25000, 30000, 45000, 20000],
              name: "小美",
            },
            {
              value: [4000, 10000, 25000, 10000, 10000, 10000],
              name: "阿龙",
            },
          ],
        },
      ],
    });
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 98%;
    margin: 10px auto;
    span {
      font-size: 18px;
    }
  }
  .box-card1 {
    .el-avatar {
      display: inline-block;
      width: 70px !important;
      height: 70px !important;
    }
    .content {
      transform: translate(0, -20%);
      display: inline-block;
      margin-left: 20px;
      h3 {
        margin: 0 0 10px 0;
      }
      p {
        margin: 0;
      }
    }
  }
  .box-card2 {
    margin-left: 1%;
    float: left;
    width: 48.5%;
    .date-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      .text {
        line-height: 40px;
        display: inline-block;
      }
      .rest {
        line-height: 20px;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        background-color: rgb(250, 124, 77);
        width: 20px;
        height: 20px;
        display: inline-block;
        font-size: 12px;
        margin-left: 10px;
      }
    }
  }
  .box-card3 {
    float: right;
    margin-right: 1%;
    width: 48.5%;
    span {
      position: relative;
      display: inline-block;
      margin-bottom: 5px;
      .car-down {
        position: absolute;
        width: 72px;
        height: 3px;
        background-color: rgb(138, 151, 248);
        border-radius: 3px;
        bottom: -8px;
      }
    }
  }
  .box-card4 {
    float: right;
    margin-right: 1%;
    width: 48.5%;
    #main {
      width: 400px;
      height: 400px;
    }
    span {
      display: inline-block;
    }
  }
  .box-card5 {
    float: left;
    margin-left: 1%;
    width: 48.5%;
    span {
      display: inline-block;
    }
    .el-card__body {
      .content {
        padding: 30px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        img {
          width: 50px;
          height: 50px;
        }
        .content-text {
          display: inline-block;
          h4 {
            margin: 0 0 10px 0;
          }
          p {
            margin: 0;
          }
        }
      }
    }
  }
  .box-card6 {
    float: right;
    margin-right: 1%;
    width: 48.5%;
    span {
      position: relative;
      display: inline-block;
      margin-bottom: 5px;
      .car-down {
        position: absolute;
        width: 72px;
        height: 3px;
        background-color: rgb(138, 151, 248);
        border-radius: 3px;
        bottom: -8px;
      }
    }
    .out-content {
      padding: 10px 0 10px 0;
      display: flex;
      justify-content: center;
      justify-content: space-around;
      .content {
        cursor: pointer;
        text-align: center;
        img {
          display: inline-block;
          width: 60px;
          height: 60px;
        }
        p {
          margin: 16px 0 0 0;
        }
      }
    }
  }
}
</style>