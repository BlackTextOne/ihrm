<template>
  <div class="report-container">
    <el-card class="box-card">
      <h4 style="text-align:center;">202203月人事报表</h4>

      <el-tabs v-model="activeName" style="margin-bottom:10px;">
        <el-tab-pane label="考勤统计" name="first"></el-tab-pane>
      </el-tabs>

      <download-excel :data="tableData" :fields="json_fields" :header="title" name="202003月份人事报表.xls">
        <div style="text-align:right;margin-bottom:10px;">
          <el-button type="primary">导出</el-button>
        </div>
      </download-excel>
      

      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="name" label="姓名" width="80px"></el-table-column>
        <el-table-column prop="workNumber" label="工号" width="120px"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120px"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="leaveDays" label="事假"> </el-table-column>
        <el-table-column prop="dayOffLeaveDays" label="调休"> </el-table-column>
        <el-table-column prop="normalDays" label="正常"> </el-table-column>
        <el-table-column prop="laterTimes" label="迟到次数"> </el-table-column>
        <el-table-column prop="earlyTimes" label="早退次数"> </el-table-column>
        <el-table-column prop="hoursPerDays" label="日均时长"> </el-table-column>
        <el-table-column prop="absenceDays" label="矿工天数"> </el-table-column>
        <el-table-column prop="isFullAttendanceint" label="是否全勤"> </el-table-column>
        <el-table-column prop="actualAtteOfficialDays" label="实际出勤天数" width="120px"> </el-table-column>
        <el-table-column prop="workingDays" label="应出勤工作日" width="120px"> </el-table-column>
        <el-table-column prop="salaryStandards" label="计薪标准"> </el-table-column>
        <el-table-column prop="salaryOfficialDays" label="计薪天数"> </el-table-column>
      </el-table>

      <div style="text-align:center;margin:50px 0 20px 0;">
        <el-button type="primary">归档202203月份报表</el-button>
        <el-button type="primary">新建报表</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getReport } from "@/api/report";
export default {
  data() {
    return {
        tableData:[], //总报表数据
        activeName: 'first', //标签页
        title:'202203月份人事报表',
        json_fields:{
          "姓名":"name",
          "工号":"workNumber",
          "手机号":"mobile",
          "部门":"department",
          "事假":"leaveDays",
          "调休":"dayOffLeaveDays",
          "正常":"normalDays",
          "迟到次数":"laterTimes",
          "早退次数":"earlyTimes",
          "日均时长":"hoursPerDays",
          "矿工天数":"absenceDays",
          "是否全勤":"isFullAttendanceint",
          "实际出勤天数":"actualAtteOfficialDays",
          "应出勤工作日":"workingDays",
          "计薪标准":"salaryStandards",
          "计薪天数":"salaryOfficialDays"
        },
    };
  },
  async created() {
    const res = await getReport();
    this.tableData = res;
    console.log(this.tableData);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .cell {
  text-align: center;
}
.report-container {
    .box-card {
        width: 98%;
        margin: 20px auto;
    }
}
</style>
