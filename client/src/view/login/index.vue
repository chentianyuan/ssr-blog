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
        <el-form-item label="username" prop="admin">
          <el-input v-model="formLabelAlign.admin"></el-input>
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
import api from '../../api'
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
        admin: '',
        password: ''
      },
      loginRules: {
        admin: [
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
          let tipInfo = {
            title: '',
            type: ''
          }
          if (valid) {
            this.Login(tipInfo)
          } else {
            tipInfo.title = '请将表单信息填写完整'
            tipInfo.type = 'warning'
            this.$notify(tipInfo)
          }
        })
      }
    },
    Login (Info) {
      api.user.getLogin({
        ...this.formLabelAlign
      }).then(data => {
        if (!data.hasError) {
          Info.title = '登录成功'
          Info.type = 'success'
          this.$notify(Info)
          this.$location.to('/')
        } else {
          Info.title = '登录失败'
          Info.type = 'err'
          Info.message = data.msg
          this.$notify(Info)
        }
      })
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
