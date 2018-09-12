<template>
  <el-container class="page-login">
    <el-main class="page-login--main">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        ref="loginForm"
        :rules="loginRules"
        status-icon
      >
        <el-form-item label="username" prop="user">
          <el-input v-model="formLabelAlign.user"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model="formLabelAlign.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">Login</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return {}
  },
  data () {
    let validateUser = (rule, value, callback) => {
      value === '' ? callback(new Error('请输入用户名')) : callback()
    }
    let validatePass = (rule, value, callback) => {
      value === '' ? callback(new Error('请输入密码')) : callback()
    }
    return {
      ajaxFlag: false,
      labelPosition: 'top',
      formLabelAlign: {
        user: '',
        password: ''
      },
      loginRules: {
        user: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      if (!this.ajaxFlag) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$notify({ title: '登录成功', type: 'success' })
            this.$location.to('/')
          } else {
            this.$notify({ title: '请将表单信息填写完整', type: 'error' })
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.page-login--main {
  margin: 40% auto;
  max-width: 375px;
}
</style>
