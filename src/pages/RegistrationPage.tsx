
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus, Mail, Lock, User } from "lucide-react";

const RegistrationPage = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "注册失败",
        description: "请填写所有必填字段",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "两次输入的密码不一致",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "请同意条款",
        description: "请阅读并同意用户协议和隐私政策",
        variant: "destructive"
      });
      return;
    }

    // Success registration
    toast({
      title: "注册成功",
      description: "欢迎加入小说阁！",
    });
  };

  const handlePhoneRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "手机注册",
      description: "手机注册功能即将上线",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 chinese-header">注册账号</h1>
            <p className="text-gray-600">
              创建您的小说阁账号，开启阅读之旅
            </p>
          </div>

          <Card className="border-gray-200 shadow-md">
            <CardHeader className="pb-2">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="email" className="flex-1">邮箱注册</TabsTrigger>
                  <TabsTrigger value="phone" className="flex-1">手机注册</TabsTrigger>
                </TabsList>
              
                <TabsContent value="email">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                          用户名
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="text" 
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full pl-10" 
                            placeholder="请输入用户名"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          电子邮箱
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10" 
                            placeholder="请输入电子邮箱"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          密码
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10" 
                            placeholder="请设置密码"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">密码长度至少8位，包含字母和数字</p>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          确认密码
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10" 
                            placeholder="请再次输入密码"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <input 
                          type="checkbox" 
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="mt-1 mr-2" 
                        />
                        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                          我已阅读并同意<a href="#" className="text-novel-red hover:underline">用户协议</a>和<a href="#" className="text-novel-red hover:underline">隐私政策</a>
                        </label>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-novel-red hover:bg-novel-red/90"
                    >
                      <UserPlus size={18} className="mr-2" />
                      注册账号
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={handlePhoneRegistration}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          手机号码
                        </label>
                        <Input 
                          type="tel" 
                          id="phone" 
                          className="w-full" 
                          placeholder="请输入手机号码"
                        />
                      </div>
                      <div>
                        <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                          验证码
                        </label>
                        <div className="flex gap-2">
                          <Input 
                            type="text" 
                            id="verificationCode" 
                            className="w-full" 
                            placeholder="请输入验证码"
                          />
                          <Button variant="outline" type="button">
                            获取验证码
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phonePassword" className="block text-sm font-medium text-gray-700 mb-1">
                          设置密码
                        </label>
                        <Input 
                          type="password" 
                          id="phonePassword" 
                          className="w-full" 
                          placeholder="请设置密码"
                        />
                      </div>
                      <div className="flex items-start">
                        <input type="checkbox" id="phoneAgreeTerms" className="mt-1 mr-2" />
                        <label htmlFor="phoneAgreeTerms" className="text-sm text-gray-600">
                          我已阅读并同意<a href="#" className="text-novel-red hover:underline">用户协议</a>和<a href="#" className="text-novel-red hover:underline">隐私政策</a>
                        </label>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-novel-red hover:bg-novel-red/90"
                    >
                      <UserPlus size={18} className="mr-2" />
                      注册账号
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  已有账号？ 
                  <Link to="/login" className="text-novel-red hover:underline ml-1">
                    立即登录
                  </Link>
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegistrationPage;
