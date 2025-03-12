
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toaster";
import { Lock, Mail, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "登录失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      });
      return;
    }
    
    // Mock login - just redirect to user dashboard for now
    toast({
      title: "登录成功",
      description: "欢迎回来！",
    });
    
    navigate('/user');
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "注册失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      });
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "注册失败",
        description: "两次输入的密码不一致",
        variant: "destructive",
      });
      return;
    }
    
    // Mock registration - just show success and redirect
    toast({
      title: "注册成功",
      description: "账户已创建，欢迎加入！",
    });
    
    navigate('/user');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md mx-4 chinese-border">
        <Tabs defaultValue="login">
          <CardHeader>
            <div className="text-center">
              <CardTitle className="text-2xl font-bold mb-2 chinese-header">小说阁</CardTitle>
              <CardDescription>登录或注册以获得完整体验</CardDescription>
            </div>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="email" 
                      name="email"
                      placeholder="请输入邮箱" 
                      className="pl-10" 
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">密码</Label>
                    <Link to="/forgot-password" className="text-sm text-novel-red hover:underline">
                      忘记密码?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="请输入密码" 
                      className="pl-10"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" className="w-full chinese-btn-primary">
                  登录
                </Button>
                <div className="text-center">
                  <Link to="/admin/login" className="text-sm text-novel-deepBlue hover:underline">
                    管理员登录
                  </Link>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="username" 
                      name="username"
                      placeholder="请输入用户名" 
                      className="pl-10"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">邮箱</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="register-email" 
                      name="email"
                      placeholder="请输入邮箱" 
                      className="pl-10"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="register-password" 
                      name="password"
                      type="password" 
                      placeholder="请输入密码" 
                      className="pl-10"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">确认密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="confirm-password" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="请再次输入密码" 
                      className="pl-10"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full chinese-btn-primary">
                  注册
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default LoginForm;
