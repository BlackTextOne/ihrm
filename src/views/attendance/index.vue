<template>
  <div class="attendance-continer">
    <!-- card1 -->
    <el-card
      class="box-card card1"
      body-style="display:flex;justify-content: space-between;"
    >
      <div class="box-left">
        <i class="el-icon-info" style="color: rgb(64, 158, 255)"></i>
        有 0 条考勤审批尚未处理
      </div>
      <div class="box-right">
        <el-button type="danger">导入</el-button>
        <el-button type="warning">提醒</el-button>
        <el-button type="primary">设置</el-button>
        <el-button>历史归档</el-button>
        <el-button type="primary" @click="report">202003报表</el-button>
      </div>
    </el-card>

    <!-- card2 -->
    <el-card class="box-card card2">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门">
          <el-checkbox-group v-model="form.departmentId" @change="query">
            <el-checkbox
              v-for="item in bmList"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="考勤状态">
          <el-radio-group v-model="form.adtStatu" @change="query">
            <el-radio
              v-for="item in AlladtStatu"
              :key="item.id"
              :label="item.label"
              style="width:100px;height:30px"
              >{{ item.state }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- card3 -->
    <el-card class="box-card card3">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>工号</th>
          <th>部门</th>
          <th>手机</th>
          <th v-for="item in day" :key="item.id">{{ item }}</th>
        </tr>
        <tr v-for="(item, i) in tableData" :key="item.id">
          <td>{{ i }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.workNumber }}</td>
          <td>{{ item.departmentName }}</td>
          <td>{{ item.mobile }}</td>
          <td
            v-for="(it, ind) in item.attendanceRecord"
            :key="ind"
            @click="showChangeDialog(item, ind, it)"
          >
            <span v-if="it.adtStatu === 1">√</span>
            <span v-if="it.adtStatu === 2">旷工</span>
            <span v-if="it.adtStatu === 3">迟到</span>
            <span v-if="it.adtStatu === 4">早退</span>
            <span v-if="it.adtStatu === 5">外出</span>
            <span v-if="it.adtStatu === 6">出差</span>
            <span v-if="it.adtStatu === 7">年假</span>
            <span v-if="it.adtStatu === 8">事假</span>
            <span v-if="it.adtStatu === 9">病假</span>
            <span v-if="it.adtStatu === 10">婚假</span>
            <span v-if="it.adtStatu === 11">丧假</span>
            <span v-if="it.adtStatu === 12">产假</span>
            <span v-if="it.adtStatu === 13">奖励产假</span>
            <span v-if="it.adtStatu === 14">陪产假</span>
            <span v-if="it.adtStatu === 15">探亲假</span>
            <span v-if="it.adtStatu === 16">工伤假</span>
            <span v-if="it.adtStatu === 17">调休</span>
            <span v-if="it.adtStatu === 18">产检假</span>
            <span v-if="it.adtStatu === 19">流产假</span>
            <span v-if="it.adtStatu === 20">长期病假</span>
            <span v-if="it.adtStatu === 21">测试假</span>
            <span v-if="it.adtStatu === 22">补签</span>
          </td>
        </tr>
      </table>
    </el-card>

    <!-- 表格dialog -->
    <el-dialog
      :title="date + ' (实际工作日考勤方案)'"
      :visible.sync="dialogVisible"
      width="30%"
    >
    <span style="color:red;">注: 统计考勤时，异常状态优先正常状态</span>
    <el-form ref="form" :model="form" label-width="80px" style="margin-top:50px">
      <el-form-item label="考勤状态">
          <el-radio-group v-model="form.adtStatu">
            <el-radio
              v-for="item in AlladtStatu"
              :key="item.id"
              :label="item.label"
              style="width:100px;height:20px;margin-top:15px;margin-right:0"
              >{{ item.state }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
    </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="query1"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBm, getKq, submitKq } from "@/api/attendance";
export default {
  data() {
    return {
      tableData: [], //获取的原始总数据
      day: [], //列表天数
      bmList: [], //获取总部门列表
      form: {
        departmentId: [], //选中的部门列表
        adtStatu: 2, //考勤状态
      },
      adtStatuList: [], //获取的考勤状态列表
      AlladtStatu: [
        { label: 1, state: "正常" },
        { label: 2, state: "旷工" },
        { label: 3, state: "迟到" },
        { label: 4, state: "早退" },
        { label: 5, state: "外出" },
        { label: 6, state: "出差" },
        { label: 7, state: "年假" },
        { label: 8, state: "事假" },
        { label: 9, state: "病假" },
        { label: 10, state: "婚假" },
        { label: 11, state: "丧假" },
        { label: 12, state: "产假" },
        { label: 13, state: "奖励产假" },
        { label: 14, state: "陪产假" },
        { label: 15, state: "探亲假" },
        { label: 16, state: "工伤假" },
        { label: 17, state: "调休" },
        { label: 18, state: "产检假" },
        { label: 19, state: "流产假" },
        { label: 20, state: "长期病假" },
        { label: 21, state: "测试假" },
        { label: 22, state: "补签" },
      ],
      dialogVisible: false, //表格dialog
      date: null, //点击表格的月日
      id:null, //点击表格的id
    };
  },
  async created() {
    var a = [];
    var b = [];
    //查询考勤总列表
    const res = await getKq({ page: 1, pageSize: 10 });
    this.tableData = res.data.rows;
    // 循环天数
    for (var i = 0; i < this.tableData[0].attendanceRecord.length; i++) {
      if (this.tableData[0].attendanceRecord[i].day.slice(4, 5) == 0) {
        a.push(this.tableData[0].attendanceRecord[i].day.slice(5, 6));
      } else {
        a.push(this.tableData[0].attendanceRecord[i].day.slice(4, 6));
      }
      if (this.tableData[0].attendanceRecord[i].day.slice(6, 7) == 0) {
        b.push(this.tableData[0].attendanceRecord[i].day.slice(7, 8));
      } else {
        b.push(this.tableData[0].attendanceRecord[i].day.slice(6, 8));
      }
    }
    for (var i = 0; i < a.length; i++) {
      this.day.push(`${a[i]}/${b[i]}`);
    }
    //获取部门列表
    const bm = await getBm();
    this.bmList = bm.depts;
  },
  methods: {
    //联查列表
    async query() {
      const res = await getKq({
        page: 1,
        pageSize: 10,
        adtStatu: this.form.adtStatu,
        departmentId: this.form.departmentId,
      });
      this.tableData = res.data.rows;
    },
    //表格提交考勤
    async query1() {
      const res = await submitKq(this.id,{adtStatu:this.form.adtStatu})
      if(res==null) {
        this.$message.success('提交成功')
      } else {
        this.$message.error('提交失败')
      }
      this.dialogVisible = false
    },
    //点击表格考勤
    showChangeDialog(a, b, c) {
      console.log(a, b, c);
      this.dialogVisible = true;
      this.form.adtStatu = c.adtStatu
      this.date = `${c.day.slice(5, 6)}/${b + 1}`;
      this.id = a.id
    },
    //跳转报表页
    report() {
      this.$router.push('/report')
    }
  },
};
</script>

<style lang="scss" scoped>
.attendance-continer {
  .box-card {
    width: 98%;
    margin: 20px auto;
  }
  .card1 {
    .box-left {
      padding: 10px;
      background-color: rgb(230, 247, 255);
      border: 1px solid rgb(174, 225, 255);
      border-radius: 4px;
    }
  }
  .card3 {
    overflow: auto;
    table {
      border-collapse: collapse;
      width: 3500px;
      tr {
        th {
          padding: 10px;
          border: 1px solid rgb(235, 248, 245);
          background-color: rgb(250, 250, 250);
          border-bottom: 2px solid #eee;
        }
        td {
          padding: 10px;
          text-align: center;
          border: 1px solid rgb(235, 248, 245);
        }
      }
    }
  }
}
::v-deep .el-dialog__header {
  background-color: rgb(102, 177, 255);
  text-align: center;
  span {
    font-size: 16px;
    color: #fff;
  }
}
</style>
