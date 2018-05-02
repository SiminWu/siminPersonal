<style lang="less">
</style>
<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="userForm" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="userForm.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="userForm.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
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

<style>

</style>
