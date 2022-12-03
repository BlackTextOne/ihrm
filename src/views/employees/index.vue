<template>
  <div class="employees-container">
    <el-card class="box-card btn-box">
      <el-button type="primary">导入</el-button>
      <el-button
        type="primary"
        @click="(dialogFormVisible = true), (showDialog = true)"
        >+ 新增员工</el-button
      >

      <el-dialog title="新增员工" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="name"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              姓名
            </div>
            <el-input v-model="form.name" style="width: 300px"></el-input>
          </el-form-item>

          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="tel"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              手机
            </div>
            <el-input v-model="form.tel" style="width: 300px"></el-input>
          </el-form-item>

          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="time1"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              入职时间
            </div>
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="form.time1"
              style="width: 300px"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="xingshi"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              聘用形式
            </div>
            <el-select
              v-model="form.xingshi"
              placeholder="请选择"
              style="width: 300px"
            >
              <el-option label="正式" :value="1"></el-option>
              <el-option label="非正式" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="num"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              工号
            </div>
            <el-input v-model="form.num" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="bumen"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              部门
            </div>
            <el-select
              v-model="form.bumen"
              placeholder="请选择"
              style="width: 300px"
            >
              <el-option label="总裁办" :value="'总裁办'"></el-option>
              <el-option label="市场部" :value="'市场部'"></el-option>
              <el-option label="财务部" :value="'财务部'"></el-option>
              <el-option label="人事部" :value="'人事部'"></el-option>
              <el-option label="技术部" :value="'技术部'"></el-option>
              <el-option label="运营部" :value="'运营部'"></el-option>
              <el-option label="行政部" :value="'行政部'"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label=""
            style="display: flex; justify-content: center"
            prop="time2"
          >
            <div
              style="
                display: inline-block;
                width: 60px;
                text-align: right;
                margin-right: 10px;
              "
            >
              转正时间
            </div>
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="form.time2"
              style="width: 300px"
            ></el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClickOddFrom">取 消</el-button>
          <el-button type="primary" @click="handleClickAddFrom"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card">
      <el-table
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        :data="tableData"
        border
        style="width: 100%; text-align: center"
      >
        <el-table-column
          type="index"
          fixed
          prop=""
          label="编号"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width=""
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="workNumber"
          label="工号"
          width=""
        ></el-table-column>
        <el-table-column
          :formatter="formatterxs"
          prop="formOfEmployment"
          label="聘用形式"
          width=""
        ></el-table-column>
        <el-table-column prop="departmentName" label="部门" width="">
        </el-table-column>
        <el-table-column
          :formatter="formattertime"
          prop="timeOfEntry"
          label="入职时间"
          width=""
        ></el-table-column>
        <el-table-column
          :formatter="formatterzt"
          prop="enableState"
          label="账户状态"
          width=""
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="handleClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination
      class="fy"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentPage"
      @next-click="nextp"
      @prev-click="prevp"
    ></el-pagination>
  </div>
</template>

<script>
import { getUser, addUser, removeUser } from "@/api/employees";

export default {
  data() {
    var a1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else if (value === Number) {
        return callback(new Error("请输入正确姓名"));
      } else {
        callback();
      }
    };
    var a2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (/^1[3-9]\d{9}$/.test(value) == false) {
        return callback(new Error("请输入正确手机号格式"));
      } else {
        callback();
      }
    };
    var a3 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("时间不能为空"));
      } else {
        callback();
      }
    };
    var a4 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("形式不能为空"));
      } else {
        callback();
      }
    };
    var a5 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("工号不能为空"));
      } else {
        callback();
      }
    };
    var a6 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("部门不能为空"));
      } else {
        callback();
      }
    };
    var a7 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("时间不能为空"));
      } else {
        callback();
      }
    };

    return {
      i: 0,
      total: null,
      page: 1,
      tableData: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        tel: "",
        time1: "",
        xingshi: null,
        num: "",
        bumen: "",
        time2: "",
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ validator: a1, trigger: "blur" }],
        tel: [{ validator: a2, trigger: "blur" }],
        time1: [{ validator: a3, trigger: "blur" }],
        xingshi: [{ validator: a4, trigger: "blur" }],
        num: [{ validator: a5, trigger: "blur" }],
        bumen: [{ validator: a6, trigger: "blur" }],
        time2: [{ validator: a7, trigger: "blur" }],
      },
    };
  },
  methods: {
    formatterxs(row, column) {
      if (row.formOfEmployment) {
        if (row.formOfEmployment == 1) {
          return "正式";
        } else {
          return "非正式";
        }
      }
    },
    formattertime(row, column) {
      if (row.timeOfEntry) {
        var timer = new Date(row.timeOfEntry);
        var year = timer.getFullYear();
        var month =
          timer.getMonth() + 1 < 10
            ? `0${timer.getMonth() + 1}`
            : timer.getMonth() + 1;
        var date =
          timer.getDate() < 10 ? `0${timer.getDate()}` : timer.getDate();
        var h =
          timer.getHours() < 10 ? `0${timer.getHours()}` : timer.getHours();
        var m =
          timer.getMinutes() < 10
            ? `0${timer.getMinutes()}`
            : timer.getMinutes();
        var s =
          timer.getSeconds() < 10
            ? `0${timer.getSeconds()}`
            : timer.getSeconds();
        row.timeOfEntry = `${year}-${month}-${date} ${h}:${m}:${s}`;
        return row.timeOfEntry;
      }
    },
    formatterzt(row, column) {
      if (row.enableState) {
        if (row.enableState == 1) {
          return "正常";
        }
      }
    },
    async nextp() {
      //点击下一页
      this.page++;
      const res = await getUser({ page: this.page, size: 10 });
      this.tableData = res.rows;
    },
    async prevp() {
      //点击上一页
      this.page--;
      const res = await getUser({ page: this.page, size: 10 });
      this.tableData = res.rows;
    },
    async currentPage(newPage) {
      //点击次页码
      this.page = newPage;
      const res = await getUser({ page: this.page, size: 10 });
      this.tableData = res.rows;
    },
    async handleClick(row) {
      console.log(row.id);
      const res3 = await removeUser(row.id); //delete

      const res = await getUser({ page: this.page, size: 10 });
      this.tableData = res.rows;
    },
    handleClickOddFrom() {
      this.dialogFormVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    async handleClickAddFrom() {
      var goAll = {
        username: this.form.name,
        mobile: this.form.tel,
        formOfEmployment: this.form.xingshi,
        workNumber: this.form.num,
        departmentName: this.form.bumen,
        timeOfEntry: this.form.time1,
        correctionTime: this.form.time2,
      };
      this.dialogFormVisible = false;
      this.form.name = "";
      this.form.tel = "";
      this.form.xingshi = null;
      this.form.num = "";
      this.form.bumen = "";
      this.form.time1 = "";
      this.form.time2 = "";
      this.$refs.ruleForm.resetFields(); //重置表单验证
      const res2 = await addUser(goAll); //add
      const res = await getUser({ page: this.page, size: 10 });
      this.tableData = res.rows;
    },
  },

  async created() {
    const res = await getUser({ page: this.page, size: 10 }); //get
    console.log(res);
    this.total = res.total;
    this.tableData = res.rows;
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__error {
  left: auto;
  right: 0;
}
.employees-container {
  width: 100%;
  height: 100%;
  position: relative;
  .box-card {
    width: 98%;
    margin: 20px auto;
  }
  .btn-box {
    display: flex;
    justify-content: end;
    .el-dialog {
      .el-dialog__header {
        background-color: #515151 !important;
      }
    }
  }
  .fy {
    position: fixed;
    top: 90%;
    left: 50%;
  }
}
</style>
