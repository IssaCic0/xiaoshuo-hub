
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toaster";
import { Lock, User } from "lucide-react";

const AdminLoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      toast({
        title: "登录失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      });
      return;
    }
    
    // Mock admin login
    if (loginData.username === 'admin' && loginData.password === 'admin') {
      toast({
        title: "登录成功",
        description: "欢迎回到管理后台！",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "登录失败",
        description: "用户名或密码错误",
        variant: "destructive",
      });
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md mx-4 chinese-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2 chinese-header">管理员登录</CardTitle>
          <CardDescription>请输入您的管理员账号和密码</CardDescription>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">管理员账号</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  id="username" 
                  name="username"
                  placeholder="请输入管理员账号" 
                  className="pl-10" 
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
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
            <Button type="submit" className="w-full bg-novel-deepBlue hover:bg-novel-deepBlue/90">
              登录管理后台
            </Button>
            <div className="text-center">
              <a href="/" className="text-sm text-novel-red hover:underline">
                返回首页
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginForm;
