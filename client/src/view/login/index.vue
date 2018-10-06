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
        <el-form-item class="page-login--title">
          <h2>{{ yiyan.source }}<span>{{ yiyan.author }}</span></h2>
          <p>{{ yiyan.text }}</p>
        </el-form-item>
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
import { mapGetters } from 'vuex'
import * as user from '@/store/modules/user'
import api from '../../api'
import { getQueryString } from '../../util/get-param.js'
export default {
  asyncData ({ store, route, context }) {
    return Promise.all([
      store.dispatch('user/GET_YIYAN_TXT', { context })
    ])
  },
  computed: {
    ...mapGetters(user.name, [
      'yiyan'
    ])
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
            type: '',
            duration: 2000,
            position: 'bottom-right'
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
          // 跳转至首屏进入的页面
          let url = getQueryString('target')
          url ? this.$location.to(url) : this.$location.to('/')
        } else {
          Info.title = '登录失败'
          Info.type = 'err'
          Info.message = data.msg
        }
        this.$notify(Info)
      })
    }
  }
}
</script>

<style lang="less">
.page-login--main {
  margin: 30% auto;
  max-width: 375px;
  .page-login--title {
    text-align: center;
  }
}
</style>
