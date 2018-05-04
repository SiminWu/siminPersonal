<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <!--<Card :bordered="false">-->
                <p slot="title">
                    欢迎登录
                </p>
                <div class="form-con">
                    <i-form ref="loginForm" :model="userForm" :rules="rules">
                        <!--<FormItem prop="userName">-->
                            <!--<i-input v-model="userForm.userName" placeholder="请输入用户名">-->
                                <!--<span slot="prepend">-->
                                    <!--<Icon :size="16" type="person"></Icon>-->
                                <!--</span>-->
                            <!--</i-input>-->
                        <!--</FormItem>-->
                        <!--<FormItem prop="password">-->
                            <!--<i-input type="password" v-model="userForm.password" placeholder="请输入密码">-->
                                <!--<span slot="prepend">-->
                                    <!--<Icon :size="14" type="locked"></Icon>-->
                                <!--</span>-->
                            <!--</i-input>-->
                        <!--</FormItem>-->
                        <FormItem>
                            <Button @click="handleSubmit" type="primary">登录</Button>
                        </FormItem>
                    </i-form>
                </div>
            <!--</Card>-->
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    data () {
        return {
          userForm: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    Cookies.set('user', this.userForm.userName);
                    Cookies.set('password', this.userForm.password);
                  this.$api.login({ mobile: this.userForm.userName, password: this.userForm.password }, (data) => { // 登录接口
                    this.$Message.success('登录成功');
                  }, (error) => {
                    this.$Message.error("登录失败")
                  })

                }
            });
        }
    }
};
</script>
<style lang="less"  rel="stylesheet/less" scoped>
  .login{
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con{
        padding: 10px 0 0;
      }
    }
  }
</style>
