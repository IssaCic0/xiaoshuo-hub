import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toaster";
import {
  Settings,
  Globe,
  Shield,
  Mail,
  FileText,
  Upload,
  Save,
  RefreshCw
} from "lucide-react";

// 模拟系统设置数据
const mockSettings = {
  site: {
    name: "小说阅读网",
    description: "最好的在线小说阅读平台",
    keywords: "小说,网络小说,在线阅读",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    icp: "京ICP备12345678号",
    copyright: "© 2024 小说阅读网. All rights reserved."
  },
  security: {
    enableRegistration: true,
    requireEmailVerification: true,
    passwordMinLength: 8,
    loginAttempts: 5,
    lockoutDuration: 30,
    enableCaptcha: true,
    enableTwoFactor: false
  },
  mail: {
    smtpHost: "smtp.example.com",
    smtpPort: 587,
    smtpUser: "noreply@example.com",
    smtpPass: "********",
    fromName: "小说阅读网",
    fromEmail: "noreply@example.com",
    enableSSL: true
  },
  content: {
    novelPerPage: 20,
    commentPerPage: 10,
    enableComment: true,
    requireApproval: true,
    allowAnonymous: false,
    enableReport: true
  }
};

// 定义设置类型
interface SiteSettings {
  name: string;
  description: string;
  keywords: string;
  logo: string;
  favicon: string;
  icp: string;
  copyright: string;
}

interface SecuritySettings {
  enableRegistration: boolean;
  requireEmailVerification: boolean;
  passwordMinLength: number;
  loginAttempts: number;
  lockoutDuration: number;
  enableCaptcha: boolean;
  enableTwoFactor: boolean;
}

interface MailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  fromName: string;
  fromEmail: string;
  enableSSL: boolean;
}

interface ContentSettings {
  novelPerPage: number;
  commentPerPage: number;
  enableComment: boolean;
  requireApproval: boolean;
  allowAnonymous: boolean;
  enableReport: boolean;
}

interface Settings {
  site: SiteSettings;
  security: SecuritySettings;
  mail: MailSettings;
  content: ContentSettings;
}

const AdminSettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(mockSettings);
  const [isLoading, setIsLoading] = useState(false);

  // 处理设置更改
  const handleSettingChange = (
    category: keyof Settings,
    field: string,
    value: string | number | boolean
  ) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value
      }
    });
  };

  // 保存设置
  const handleSave = async () => {
    setIsLoading(true);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({
      title: "设置已保存",
      description: "系统设置已成功更新。"
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">系统设置</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-end gap-4">
              <Button variant="outline" disabled={isLoading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                重置
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                保存设置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="site" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="site" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>网站设置</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>安全设置</span>
            </TabsTrigger>
            <TabsTrigger value="mail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>邮件设置</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>内容设置</span>
            </TabsTrigger>
          </TabsList>

          {/* 网站设置 */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  网站基本设置
                </CardTitle>
                <CardDescription>
                  配置网站的基本信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">网站名称</Label>
                    <Input
                      id="site-name"
                      value={settings.site.name}
                      onChange={(e) => handleSettingChange("site", "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-keywords">网站关键词</Label>
                    <Input
                      id="site-keywords"
                      value={settings.site.keywords}
                      onChange={(e) => handleSettingChange("site", "keywords", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">网站描述</Label>
                  <Textarea
                    id="site-description"
                    value={settings.site.description}
                    onChange={(e) => handleSettingChange("site", "description", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-logo">网站 Logo</Label>
                    <div className="flex gap-2">
                      <Input
                        id="site-logo"
                        value={settings.site.logo}
                        onChange={(e) => handleSettingChange("site", "logo", e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-favicon">网站图标</Label>
                    <div className="flex gap-2">
                      <Input
                        id="site-favicon"
                        value={settings.site.favicon}
                        onChange={(e) => handleSettingChange("site", "favicon", e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-icp">ICP 备案号</Label>
                    <Input
                      id="site-icp"
                      value={settings.site.icp}
                      onChange={(e) => handleSettingChange("site", "icp", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-copyright">版权信息</Label>
                    <Input
                      id="site-copyright"
                      value={settings.site.copyright}
                      onChange={(e) => handleSettingChange("site", "copyright", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  安全设置
                </CardTitle>
                <CardDescription>
                  配置系统安全相关选项
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>开放注册</Label>
                      <div className="text-sm text-gray-500">
                        允许新用户注册账号
                      </div>
                    </div>
                    <Switch
                      checked={settings.security.enableRegistration}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "enableRegistration", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>邮箱验证</Label>
                      <div className="text-sm text-gray-500">
                        要求用户验证邮箱后才能使用完整功能
                      </div>
                    </div>
                    <Switch
                      checked={settings.security.requireEmailVerification}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "requireEmailVerification", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>验证码</Label>
                      <div className="text-sm text-gray-500">
                        在登录和注册时启用验证码
                      </div>
                    </div>
                    <Switch
                      checked={settings.security.enableCaptcha}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "enableCaptcha", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>两步验证</Label>
                      <div className="text-sm text-gray-500">
                        允许用户启用两步验证
                      </div>
                    </div>
                    <Switch
                      checked={settings.security.enableTwoFactor}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "enableTwoFactor", checked)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password-min-length">密码最小长度</Label>
                    <Input
                      id="password-min-length"
                      type="number"
                      min={6}
                      value={settings.security.passwordMinLength}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "passwordMinLength",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">登录尝试次数</Label>
                    <Input
                      id="login-attempts"
                      type="number"
                      min={1}
                      value={settings.security.loginAttempts}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "loginAttempts",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockout-duration">账号锁定时长（分钟）</Label>
                  <Input
                    id="lockout-duration"
                    type="number"
                    min={1}
                    value={settings.security.lockoutDuration}
                    onChange={(e) =>
                      handleSettingChange(
                        "security",
                        "lockoutDuration",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 邮件设置 */}
          <TabsContent value="mail">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  邮件服务设置
                </CardTitle>
                <CardDescription>
                  配置系统邮件发送服务
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP 服务器</Label>
                    <Input
                      id="smtp-host"
                      value={settings.mail.smtpHost}
                      onChange={(e) => handleSettingChange("mail", "smtpHost", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP 端口</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={settings.mail.smtpPort}
                      onChange={(e) =>
                        handleSettingChange("mail", "smtpPort", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">SMTP 用户名</Label>
                    <Input
                      id="smtp-user"
                      value={settings.mail.smtpUser}
                      onChange={(e) => handleSettingChange("mail", "smtpUser", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">SMTP 密码</Label>
                    <Input
                      id="smtp-pass"
                      type="password"
                      value={settings.mail.smtpPass}
                      onChange={(e) => handleSettingChange("mail", "smtpPass", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from-name">发件人名称</Label>
                    <Input
                      id="from-name"
                      value={settings.mail.fromName}
                      onChange={(e) => handleSettingChange("mail", "fromName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">发件人邮箱</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={settings.mail.fromEmail}
                      onChange={(e) => handleSettingChange("mail", "fromEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>启用 SSL/TLS</Label>
                    <div className="text-sm text-gray-500">
                      使用安全连接发送邮件
                    </div>
                  </div>
                  <Switch
                    checked={settings.mail.enableSSL}
                    onCheckedChange={(checked) =>
                      handleSettingChange("mail", "enableSSL", checked)
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="outline">
                    发送测试邮件
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 内容设置 */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  内容设置
                </CardTitle>
                <CardDescription>
                  配置内容展示和互动相关选项
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="novel-per-page">每页小说数量</Label>
                    <Input
                      id="novel-per-page"
                      type="number"
                      min={1}
                      value={settings.content.novelPerPage}
                      onChange={(e) =>
                        handleSettingChange(
                          "content",
                          "novelPerPage",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment-per-page">每页评论数量</Label>
                    <Input
                      id="comment-per-page"
                      type="number"
                      min={1}
                      value={settings.content.commentPerPage}
                      onChange={(e) =>
                        handleSettingChange(
                          "content",
                          "commentPerPage",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>启用评论</Label>
                      <div className="text-sm text-gray-500">
                        允许用户发表评论
                      </div>
                    </div>
                    <Switch
                      checked={settings.content.enableComment}
                      onCheckedChange={(checked) =>
                        handleSettingChange("content", "enableComment", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>评论审核</Label>
                      <div className="text-sm text-gray-500">
                        评论需要审核后才能显示
                      </div>
                    </div>
                    <Switch
                      checked={settings.content.requireApproval}
                      onCheckedChange={(checked) =>
                        handleSettingChange("content", "requireApproval", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>允许匿名评论</Label>
                      <div className="text-sm text-gray-500">
                        允许未登录用户发表评论
                      </div>
                    </div>
                    <Switch
                      checked={settings.content.allowAnonymous}
                      onCheckedChange={(checked) =>
                        handleSettingChange("content", "allowAnonymous", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>启用举报</Label>
                      <div className="text-sm text-gray-500">
                        允许用户举报不当内容
                      </div>
                    </div>
                    <Switch
                      checked={settings.content.enableReport}
                      onCheckedChange={(checked) =>
                        handleSettingChange("content", "enableReport", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettingsPage; 