
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, User, LogIn } from "lucide-react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "登录失败",
        description: "请输入邮箱和密码",
        variant: "destructive"
      });
      return;
    }

    // Simulate login success
    toast({
      title: "登录成功",
      description: "欢迎回到小说阁！",
    });
  };

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "手机登录",
      description: "手机登录功能即将上线",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 chinese-header">用户登录</h1>
            <p className="text-gray-600">
              登录您的账号，继续您的阅读之旅
            </p>
          </div>

          <Card className="border-gray-200 shadow-md">
            <CardHeader className="pb-2">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="email" className="flex-1">邮箱登录</TabsTrigger>
                  <TabsTrigger value="phone" className="flex-1">手机登录</TabsTrigger>
                </TabsList>
              
                <TabsContent value="email">
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          电子邮箱
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <Input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10" 
                            placeholder="请输入密码"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2" 
                          />
                          <label htmlFor="rememberMe" className="text-sm text-gray-600">
                            记住我
                          </label>
                        </div>
                        <a href="#" className="text-sm text-novel-red hover:underline">
                          忘记密码？
                        </a>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-novel-red hover:bg-novel-red/90"
                    >
                      <LogIn size={18} className="mr-2" />
                      登录
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form onSubmit={handlePhoneLogin}>
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
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-novel-red hover:bg-novel-red/90"
                    >
                      <LogIn size={18} className="mr-2" />
                      登录
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  没有账号？ 
                  <Link to="/register" className="text-novel-red hover:underline ml-1">
                    立即注册
                  </Link>
                </p>
              </div>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">其他登录方式</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#1D9BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 9C16.4 9.5 15.8 9.9 15.1 10.2C14.7 9.8 14.2 9.5 13.7 9.3C13.2 9.1 12.6 9 12 9C10.9 9 9.9 9.4 9.1 10.1C8.3 10.8 7.8 11.8 7.8 12.9C7.8 13.1 7.8 13.3 7.9 13.5C6.1 13.4 4.5 12.7 3.3 11.6C3 12.1 2.9 12.6 2.9 13.2C2.9 14.2 3.4 15.1 4.2 15.6C3.8 15.6 3.3 15.5 2.9 15.2V15.3C2.9 16.3 3.3 17.1 3.8 17.7C4.4 18.3 5.1 18.6 5.9 18.7C5.5 18.8 5.1 18.8 4.8 18.8C4.6 18.8 4.3 18.8 4.1 18.7C4.3 19.5 4.8 20.1 5.4 20.5C6 21 6.8 21.2 7.6 21.2C6.2 22.2 4.7 22.7 3 22.7C2.7 22.7 2.5 22.7 2.2 22.7C3.9 23.7 5.8 24.2 7.9 24.2C9.3 24.2 10.6 24 11.7 23.5C12.8 23 13.8 22.4 14.6 21.6C15.4 20.8 16.1 19.9 16.6 18.9C17.1 17.9 17.4 16.8 17.6 15.8C17.8 14.7 17.9 13.7 17.9 12.6C17.9 12.4 17.9 12.3 17.9 12.2C18.5 11.8 19 11.2 19.5 10.5C18.9 10.8 18.3 11 17.7 11.1C18.4 10.7 18.9 10 19.1 9.2C18.5 9.6 17.8 9.8 17 9Z" stroke="#1D9BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.129 22 16.99 22 12C22 6.477 17.523 2 12 2Z" fill="#1877F2"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H12V14.0415H17.6515C17.2555 15.1975 16.535 16.1595 15.58 16.8195L19.025 19.4655C21.1 17.5775 22.25 14.9675 22.25 12.0415C22.25 11.3435 22.159 10.6655 22.0145 10.0415H21.8055Z" fill="#4285F4"/>
                    <path d="M12 22.0001C15.295 22.0001 18.07 21.0111 20 19.4651L16.555 16.8191C15.5196 17.5179 13.9695 17.948 12 17.948C8.858 17.948 6.187 15.9201 5.239 13.2001L1.7155 15.8741C3.5599 19.8106 7.50462 22.0004 12 22.0001Z" fill="#34A853"/>
                    <path d="M5.239 13.2001C5.02244 12.5583 4.90591 11.8819 4.90591 11.0001C4.90591 10.1183 5.02244 9.441 5.239 8.8001L1.723 6.1261C0.774 7.5741 0.25 9.2321 0.25 11.0001C0.25 12.7681 0.774 14.4261 1.723 15.8741L5.239 13.2001Z" fill="#FBBC05"/>
                    <path d="M12 4.05C13.735 4.05 15.292 4.65 16.5 5.78L19.53 2.75C17.513 0.918 14.867 -0.00488281 12 -0.00488281C7.50462 -0.00488281 3.5599 2.18962 1.7155 6.12612L5.2395 8.80012C6.187 6.08012 8.858 4.05 12 4.05Z" fill="#EA4335"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2728 12.0605C17.2658 10.2455 18.0878 8.9575 19.7358 7.9995C18.8008 6.6675 17.3488 5.9905 15.4178 5.8905C13.5948 5.7905 11.6338 6.9895 10.9108 6.9895C10.1418 6.9895 8.4258 5.9495 6.9518 5.9495C4.6768 5.9935 2.2578 7.6095 1.0578 10.1395C-1.3132 15.1995 0.4678 22.5565 2.7268 26.5525C3.8358 28.5155 5.1278 30.7085 6.8488 30.6325C8.5138 30.5745 9.1498 29.5805 11.1508 29.5805C13.1378 29.5805 13.7238 30.6325 15.4728 30.6045C17.2658 30.5745 18.3888 28.6255 19.4558 26.6535C20.7328 24.4005 21.2348 22.1995 21.2488 22.1295C21.2068 22.1155 17.2868 20.5495 17.2728 16.1385C17.2728 16.1245 17.2728 14.0325 17.2728 12.0605Z" fill="black"/>
                    <path d="M14.1299 3.6001C15.0639 2.4561 15.7039 0.8901 15.5299 -0.6799C14.1729 -0.6379 12.5359 0.1971 11.5739 1.3121C10.6969 2.3061 9.9329 3.9001 10.1359 5.4391C11.6329 5.5251 13.1719 4.7161 14.1299 3.6001Z" fill="black"/>
                  </svg>
                </button>
              </div>
            </CardHeader>
          </Card>

          <div className="mt-6 text-center">
            <Link to="/admin/login" className="text-sm text-gray-500 hover:text-novel-red">
              管理员登录
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
