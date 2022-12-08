<template>
  <div class="permissions-container">
    <el-button
      type="primary"
      @click="(dialogVisible = true), (goShow = 0)"
      class="addBtn"
      >新增角色</el-button
    >

    <!-- 表格信息 -->
    <el-card class="box-card">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%; text-align: center"
        border
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" prop="" label="编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="角色" width=""> </el-table-column>
        <el-table-column prop="description" label="描述" width="">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="(dialogVisible1 = true), handleShowClick(scope.row)"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="
                (dialogVisible = true), (goShow = 1), handleShowClick(scope.row)
              "
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="currentPage"
        @next-click="nextp"
        @prev-click="prevp"
      >
      </el-pagination>
    </div>

    <!-- 添加和编辑的dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible = false), resetForm('ruleForm')"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 分配权限的dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1, 8]"
        :default-checked-keys="[8]"
        :props="defaultProps"
        @check-change="judgeDis"
        :check-strictly="true"
        ref="tree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible1 = false), resetForm('ruleForm')"
          >取 消</el-button
        >
        <el-button type="primary" @click="addDis">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissions,
  addPermissions,
  removePermissions,
  showPermissions,
  getDis,
  disPermissions,
} from "@/api/permissions.js";
export default {
  data() {
    return {
      goShow: null, //判断打开的是添加角色还是编辑角色
      dialogVisible: false, //添加编辑的dialog
      dialogVisible1: false, //分配权限的dialog
      total: null, //总条数
      page: 1, //页码
      tableData: [], //角色列表数据
      ruleForm: {
        //表单
        name: "",
        description: "",
      },
      //校验规则
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" },
        ],
      },
      bjId: "", //编辑时的参数id
      //权限树
      data: [
        {
          id: 1,
          label: "员工管理",
          children: [
            {
              id: 2,
              label: "测试",
            },
          ],
        },
        {
          id: 3,
          label: "公司设置",
        },
        {
          id: 4,
          label: "权限管理",
        },
        {
          id: 5,
          label: "社保",
        },
        {
          id: 6,
          label: "审批",
        },
        {
          id: 7,
          label: "考勤",
        },
        {
          id: 8,
          label: "工资",
          children: [
            {
              id: 9,
              label: "扣工资",
            },
          ],
        },
        {
          id: 10,
          label: "组织架构",
        },
        {
          id: 11,
          label: "测试权限",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      disArr: [], //提交权限信息数组
    };
  },
  //获取信息
  async created() {
    const res = await getPermissions({ page: 1, pageSize: 10 });
    this.total = res.total;
    this.tableData = res.rows;
    console.log(this.tableData);
  },
  methods: {
    //点击下一页
    async nextp() {
      this.page++;
      const res = await getPermissions({ page: this.page, pageSize: 10 });
      this.tableData = res.rows;
    },
    //点击上一页
    async prevp() {
      this.page--;
      const res = await getPermissions({ page: this.page, pageSize: 10 });
      this.tableData = res.rows;
    },
    //点击此页码
    async currentPage(newPage) {
      this.page = newPage;
      const res = await getPermissions({ page: this.page, pageSize: 10 });
      this.tableData = res.rows;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (this.goShow === 0) {
          // 添加角色
          if (valid) {
            const res = await addPermissions({
              name: this.ruleForm.name,
              description: this.ruleForm.description,
            });
            // console.log(res);
            const res1 = await getPermissions({
              page: this.page,
              pageSize: 10,
            });
            this.tableData = res1.rows;
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.ruleForm.name = "";
            this.ruleForm.description = "";
            this.dialogVisible = false;
          } else {
            this.$message.error("请检验表单信息");
            return false;
          }
        } else if (this.goShow === 1) {
          //编辑角色
          if (valid) {
            const res = await showPermissions(this.bjId, {
              id: this.bjId,
              name: this.ruleForm.name,
              description: this.ruleForm.description,
              permIds: [],
            });
            if (res == null) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
            } else {
              this.$message.error("修改失败");
            }
            const res1 = await getPermissions({
              page: this.page,
              pageSize: 10,
            });
            this.tableData = res1.rows;
            this.dialogVisible = false;
          } else {
            this.$message.error("请检验表单信息");
            return false;
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除角色
    async handleClick(row) {
      const res = await removePermissions(row.id);
      if (res == null) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
      } else {
        this.$message.error("删除失败");
      }
      const res1 = await getPermissions({ page: this.page, pageSize: 10 });
      this.tableData = res1.rows;
    },
    //编辑角色
    async handleShowClick(row) {
      this.bjId = row.id;
      this.ruleForm.name = row.name;
      this.ruleForm.description = row.description;
    },
    //判断哪些权限被选中
    judgeDis(a, b, c) {
      this.disArr = [];
      for (var i = 0; i < this.$refs.tree.getCheckedNodes().length; i++) {
        if (
          this.$refs.tree.getCheckedNodes()[i].id == 1 ||
          this.$refs.tree.getCheckedNodes()[i].id == 8
        ) {
          continue;
        } else {
          this.disArr.push(this.$refs.tree.getCheckedNodes()[i].id);
        }
      }
      for (var i = 0; i < this.disArr.length; i++) {
        if (this.disArr[i] == 2) this.disArr[i] = "employees";
        if (this.disArr[i] == 3) this.disArr[i] = "settings";
        if (this.disArr[i] == 4) this.disArr[i] = "permissions";
        if (this.disArr[i] == 5) this.disArr[i] = "social_securitys";
        if (this.disArr[i] == 6) this.disArr[i] = "approvals";
        if (this.disArr[i] == 7) this.disArr[i] = "attendances";
        if (this.disArr[i] == 9) this.disArr[i] = "salarys";
        if (this.disArr[i] == 10) this.disArr[i] = "departments";
        if (this.disArr[i] == 11) this.disArr[i] = "aa";
      }
    },
    //分配权限
    async addDis() {
      console.log(this.disArr);
      const res2 = await disPermissions({
        id: this.bjId,
        permIds: this.disArr,
      });
      if (res2 == null) {
        this.$message({
          message: "分配成功",
          type: "success",
        });
      } else {
        this.$message.error("分配失败");
      }
      this.dialogVisible1 = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.permissions-container {
  .addBtn {
    margin: 20px;
  }
  .block {
    float: right;
    padding-right: 20px;
    margin: 20px auto 20px auto;
  }
}
</style>
