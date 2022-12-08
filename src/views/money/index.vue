<template>
  <div class="money-container">
    <el-card
      class="box-card card1"
      body-style="display:flex;justify-content: space-between;"
    >
      <div class="box-left">
        <i class="el-icon-info" style="color: rgb(64, 158, 255)"></i>
        本月0：入职 0 离职 0 调薪 0 未调薪 0
      </div>
      <div class="box-right">
        <el-button type="danger" @click="setting">设置</el-button>
        <el-button type="primary">202003报表</el-button>
      </div>
    </el-card>

    <el-card class="box-card card2">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="聘用形式">
          <el-checkbox-group v-model="form.xingshi" @change="query">
            <el-checkbox label="1">正式</el-checkbox>
            <el-checkbox label="2">非正式</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="员工状态">
          <el-checkbox-group v-model="form.zhuangtai" @change="query">
            <el-checkbox label="1">在职</el-checkbox>
            <el-checkbox label="2">离职</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="部门">
          <el-checkbox-group v-model="form.bumen" @change="query">
            <el-checkbox
              v-for="item in bmList"
              :key="item.id"
              :label="item.id"
              name="bumen"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card card3">
      <el-table
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        :data="mock"
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
        <el-table-column prop="" label="聘用形式" width=""
          >未知</el-table-column
        >
        <el-table-column prop="departmentName" label="部门" width="">
        </el-table-column>
        <el-table-column
          :formatter="formattertime"
          prop="timeOfEntry"
          label="入职时间"
          width=""
        ></el-table-column>
        <el-table-column
          :formatter="formattermoney"
          prop="currentBasicSalary"
          label="工资基数"
          width=""
        ></el-table-column>
        <el-table-column prop="" label="津贴方案" width=""
          >通用方案</el-table-column
        >
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              :type="
                scope.row.currentBasicSalary + scope.row.currentPostWage > 0
                  ? 'primary'
                  : 'danger'
              "
              size="small"
              @click="setMoney(scope.row)"
            >
              {{
                scope.row.currentBasicSalary + scope.row.currentPostWage > 0
                  ? "调薪"
                  : "定薪"
              }}
            </el-button>
            <el-button type="text" size="small" @click="handleClick(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentPage"
        @next-click="nextp"
        @prev-click="prevp"
      >
      </el-pagination>
    </div>

    <!-- 调薪dialog -->
    <el-dialog title="调薪" :visible.sync="dialogVisible">
      <img src="@/assets/common/img.jpeg" />
      <div class="user">
        <p>
          <strong>{{ setMn.name }}</strong>
        </p>
        <p><strong style="margin-right: 20px">部门</strong>{{ setMn.bumen }}</p>
        <p>
          <strong style="margin-right: 20px">入职时间</strong>{{ setMn.time }}
        </p>
      </div>
      <hr />
      <el-form ref="form" :model="setMn" label-width="150px">
        <el-form-item label="调整基本工资" style="margin-top: 30px">
          <el-input
            v-model="setMn.currentBasicSalary"
            style="width: 200px; margin-right: 20px"
            :disabled="true"
          ></el-input
          >-><el-input
            v-model="setMn.newCurrentBasicSalary"
            style="width: 200px; margin-left: 20px"
          ></el-input>
        </el-form-item>
        <el-form-item label="调整岗位工资">
          <el-input
            :disabled="true"
            v-model="setMn.currentPostWage"
            style="width: 200px; margin-right: 20px"
          ></el-input
          >-><el-input
            v-model="setMn.newCurrentPostWage"
            style="width: 200px; margin-left: 20px"
          ></el-input>
        </el-form-item>
        <el-form-item label="工资合计">
          <el-input
            :disabled="true"
            v-model="setMn.allMoney"
            style="width: 200px; margin-right: 20px"
          ></el-input
          >-><el-input
            :disabled="true"
            v-model="setMn.newAllMoney"
            style="width: 200px; margin-left: 20px"
          ></el-input>
        </el-form-item>
        <el-form-item label="调整幅度">
          <el-input
            :disabled="true"
            v-model="setMn.amplitude"
            style="width: 200px; margin-right: 20px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setM">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 定薪dialog -->
    <el-dialog title="定薪" :visible.sync="dialogVisible1">
      <el-form ref="form" :model="setMn">
        <el-form-item
          label="当前基本工资"
          style="margin-top: 30px; padding-left: 50px"
        >
          <el-input
            v-model="setMn.currentBasicSalary"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="当前岗位工资"
          style="margin-top: 30px; padding-left: 50px"
        >
          <el-input
            v-model="setMn.currentPostWage"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="当前工资合计"
          style="margin-top: 30px; padding-left: 50px"
        >
          <el-input
            v-model="dxAllMoney"
            style="width: 500px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="转正基本工资"
          style="margin-top: 30px; padding-left: 50px"
        >
          <el-input v-model="setMn.zzJbMoney" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item
          label="转正岗位工资"
          style="margin-top: 30px; padding-left: 50px"
        >
          <el-input v-model="setMn.zzGwMoney" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item
          label="转正工资合计"
          style="margin-top: 30px; padding-left: 50px"
        >
          <el-input
            v-model="zzAllMoney"
            style="width: 500px"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dMoney">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMoney,
  setMoney,
  dMoney,
  getUserMoney,
  getUserMoneySet,
} from "@/api/money.js";
import { getBm } from "@/api/employees.js";
export default {
  data() {
    return {
      dialogVisible: false, //调薪dialog
      dialogVisible1: false, //定薪dialog
      bmList: [], //获取的部门列表
      form: {
        xingshi: [],
        zhuangtai: [],
        bumen: [], //多选框选中的数据
      },
      mock: [], //员工薪资列表
      page: 1, //页码
      total: null, //总条数
      txId: null, //调薪的id
      setMn: {
        name: "",
        bumen: "",
        time: "",
        currentBasicSalary: null, //当前基本工资
        currentPostWage: null, //当前岗位工资
        newCurrentBasicSalary: 0, //新基本工资
        newCurrentPostWage: 0, //新岗位工资
        allMoney: 0, //合计工资
        newAllMoney: 0, //新合计工资
        amplitude: null, //变化幅度
        zzJbMoney: null, //转正基本工资
        zzGwMoney: null, //转正岗位工资
      },
    };
  },
  computed: {
    //返回当前工资合计
    dxAllMoney() {
      return (
        Number(this.setMn.currentBasicSalary) +
        Number(this.setMn.currentPostWage)
      );
    },
    //返回转正工资合计
    zzAllMoney() {
      return Number(this.setMn.zzJbMoney) + Number(this.setMn.zzGwMoney);
    },
  },
  async created() {
    const res = await getMoney({ page: 1, pageSize: 10 }); //获取员工薪资列表
    this.mock = res.rows;
    this.total = res.total;
    // console.log(this.mock);
    const res1 = await getBm(); //获取部门列表
    this.bmList = res1.depts;
    // console.log(this.bmList);
  },
  watch: {
    //侦听新老薪资变化
    "setMn.newCurrentBasicSalary"(newVal) {
      this.setMn.newAllMoney =
        Number(this.setMn.newCurrentPostWage) + Number(newVal);
      this.setMn.amplitude = this.setMn.newAllMoney - this.setMn.allMoney;
    },
    "setMn.newCurrentPostWage"(newVal) {
      this.setMn.newAllMoney =
        Number(this.setMn.newCurrentBasicSalary) + Number(newVal);
      this.setMn.amplitude = this.setMn.newAllMoney - this.setMn.allMoney;
    },
  },
  methods: {
    //设置
    setting() {
      this.$router.push({
        path:'/setting',
      })
    },
    //获取员工联查列表
    async query() {
      // console.log(this.form.xingshi,this.form.zhuangtai,this.form.bumen);
      const res = await getMoney({
        page: this.page,
        pageSize: 10,
        approvalsStateChecks: this.form.zhuangtai,
        approvalsTypeChecks: this.form.xingshi,
        departmentChecks: this.form.bumen,
      });
      this.mock = res.rows;
    },
    //点击下一页
    async nextp() {
      this.page++;
      const res = await getMoney({ page: this.page, pageSize: 10 });
      this.mock = res.rows;
    },
    //点击上一页
    async prevp() {
      this.page--;
      const res = await getMoney({ page: this.page, pageSize: 10 });
      this.mock = res.rows;
    },
    //点击此页码
    async currentPage(newPage) {
      this.page = newPage;
      const res = await getMoney({ page: this.page, pageSize: 10 });
      this.mock = res.rows;
    },
    formattertime(row) {
      //格式化入职时间
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
        row.timeOfEntry = `${year}-${month}-${date}`;
        return row.timeOfEntry;
      }
    },
    formattermoney(row) {
      //格式化工资基数
      if (row.currentBasicSalary) {
        return row.currentBasicSalary, row.currentPostWage;
      } else {
        return 0;
      }
    },
    //调薪dialog
    setMoney(row) {
      if (row.currentBasicSalary != null && row.currentPostWage != null) {
        this.setMn.bumen = row.departmentName;
        this.setMn.time = row.timeOfEntry;
        this.setMn.name = row.username;
        this.txId = row.id;
        this.dialogVisible = true;
        this.setMn.currentBasicSalary = row.currentBasicSalary;
        this.setMn.currentPostWage = row.currentPostWage;
        this.setMn.allMoney = row.currentBasicSalary + row.currentPostWage;
        this.setMn.amplitude = 0 - this.setMn.allMoney;
      } else {
        this.dialogVisible1 = true;
        this.txId = row.id;
        this.setMn.currentBasicSalary = null;
        this.setMn.currentPostWage = null;
        this.setMn.zzJbMoney = null;
        this.setMn.zzGwMoney = null;
      }
    },
    //提交调薪数据
    async setM() {
      const res = await setMoney(this.txId, {
        userId: this.txId,
        currentBasicSalary: Number(this.setMn.newCurrentBasicSalary),
        currentPostWage: Number(this.setMn.newCurrentPostWage),
      });
      if (res == null) {
        this.$message.success("调薪成功");
      } else {
        this.$message.error("调薪失败");
      }
      this.dialogVisible = false;
    },
    //提交定薪数据
    async dMoney() {
      const res = await dMoney(this.txId, {
        userId: this.txId,
        currentBasicSalary: Number(this.setMn.currentBasicSalary),
        currentPostWage: Number(this.setMn.currentPostWage),
        correctionOfBasicWages: Number(this.setMn.zzJbMoney),
        turnToPostWages: Number(this.setMn.zzGwMoney),
      });
      if (res == null) {
        this.$message.success("调薪成功");
        const res = await getMoney({ page: this.page, pageSize: 10 });
        this.mock = res.rows;
      } else {
        this.$message.error("调薪失败");
      }
      this.dialogVisible1 = false;
    },
    //查询用户薪资
    async handleClick(row) {
      this.$router.push({
        path:'/moneySet',
        query:{
          userId:row.id
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.money-container {
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
  .block {
    margin: 20px 0;
    text-align: center;
  }
  .el-dialog {
    img {
      width: 100px;
      height: 100px;
    }
    .user {
      display: inline-block;
    }
  }
}
</style>
