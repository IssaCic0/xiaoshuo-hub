
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toaster";
import { 
  User, 
  Settings, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Award, 
  LogOut, 
  Edit, 
  Bell, 
  Gift 
} from "lucide-react";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  // User info (mock data)
  const userInfo = {
    username: "书香客",
    avatar: "/placeholder.svg",
    level: 5,
    joinDate: "2023年3月15日",
    readCount: 127,
    favoriteCount: 45,
    commentCount: 23,
    points: 520,
    description: "热爱阅读，尤其喜欢武侠和科幻类小说。欢迎交流讨论！"
  };

  // Notification data (mock)
  const notifications = [
    {
      id: 1,
      type: "system",
      content: "您关注的作品《星辰大海》已更新最新章节",
      time: "今天 12:30",
      isRead: false
    },
    {
      id: 2,
      type: "comment",
      content: "用户「潇洒书生」回复了您的评论",
      time: "昨天 18:45",
      isRead: true
    },
    {
      id: 3,
      type: "system",
      content: "恭喜您升级到 Lv.5 读者等级！",
      time: "3天前",
      isRead: true
    },
    {
      id: 4,
      type: "system",
      content: "您的月票已更新，本月可投 5 张月票",
      time: "7天前",
      isRead: true
    }
  ];

  // Points history (mock)
  const pointsHistory = [
    {
      id: 1,
      type: "earn",
      amount: 20,
      description: "每日签到",
      time: "今天 08:30"
    },
    {
      id: 2,
      type: "earn",
      amount: 50,
      description: "阅读时长达到1小时",
      time: "昨天 21:15"
    },
    {
      id: 3,
      type: "spend",
      amount: -100,
      description: "购买章节",
      time: "3天前"
    },
    {
      id: 4,
      type: "earn",
      amount: 200,
      description: "完成每周阅读任务",
      time: "1周前"
    }
  ];

  const handleLogout = () => {
    toast({
      title: "登出成功",
      description: "您已成功退出登录",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* User sidebar */}
          <div className="md:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img src={userInfo.avatar} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">{userInfo.username}</h2>
                  <div className="flex items-center mb-3">
                    <Badge className="bg-novel-gold">Lv.{userInfo.level}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    注册于 {userInfo.joinDate}
                  </p>
                  <div className="w-full grid grid-cols-3 divide-x text-center mb-4">
                    <div className="px-2">
                      <div className="font-bold text-novel-red">{userInfo.readCount}</div>
                      <div className="text-xs text-gray-500">已读</div>
                    </div>
                    <div className="px-2">
                      <div className="font-bold text-novel-red">{userInfo.favoriteCount}</div>
                      <div className="text-xs text-gray-500">收藏</div>
                    </div>
                    <div className="px-2">
                      <div className="font-bold text-novel-red">{userInfo.commentCount}</div>
                      <div className="text-xs text-gray-500">评论</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mb-2"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings size={16} className="mr-1" />
                    账户设置
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-1" />
                    退出登录
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-bold">快捷导航</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <Link to="/bookshelf" className="flex items-center text-gray-700 hover:text-novel-red transition-colors p-2 rounded-md hover:bg-gray-50">
                    <BookOpen size={18} className="mr-2" />
                    <span>我的书架</span>
                  </Link>
                  <button className="flex items-center text-gray-700 hover:text-novel-red transition-colors p-2 rounded-md hover:bg-gray-50 text-left">
                    <Heart size={18} className="mr-2" />
                    <span>我的收藏</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-novel-red transition-colors p-2 rounded-md hover:bg-gray-50 text-left">
                    <MessageSquare size={18} className="mr-2" />
                    <span>我的评论</span>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-novel-red transition-colors p-2 rounded-md hover:bg-gray-50 text-left">
                    <Bell size={18} className="mr-2" />
                    <span>消息通知</span>
                    <Badge className="ml-auto bg-novel-red">3</Badge>
                  </button>
                  <button className="flex items-center text-gray-700 hover:text-novel-red transition-colors p-2 rounded-md hover:bg-gray-50 text-left">
                    <Award size={18} className="mr-2" />
                    <span>我的积分</span>
                    <span className="ml-auto text-novel-gold">{userInfo.points}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="profile" className="flex items-center gap-1">
                  <User size={16} />
                  <span>个人主页</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-1">
                  <Bell size={16} />
                  <span>消息通知</span>
                </TabsTrigger>
                <TabsTrigger value="points" className="flex items-center gap-1">
                  <Gift size={16} />
                  <span>积分中心</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings size={16} />
                  <span>账户设置</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="mb-6">
                  <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <h3 className="text-lg font-bold">个人简介</h3>
                    <Button variant="ghost" size="sm">
                      <Edit size={16} className="mr-1" />
                      编辑
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700">{userInfo.description}</p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">阅读动态</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img src={userInfo.avatar} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p><span className="font-bold">{userInfo.username}</span> 阅读了 <Link to="/novel/1" className="text-novel-red hover:underline">《星辰大海》</Link> 第28章</p>
                          <p className="text-sm text-gray-500">今天 14:30</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img src={userInfo.avatar} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p><span className="font-bold">{userInfo.username}</span> 收藏了 <Link to="/novel/7" className="text-novel-red hover:underline">《侠客行》</Link></p>
                          <p className="text-sm text-gray-500">昨天 20:15</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <img src={userInfo.avatar} alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p><span className="font-bold">{userInfo.username}</span> 评论了 <Link to="/novel/2" className="text-novel-red hover:underline">《龙吟九天》</Link>: 情节扣人心弦，期待后续发展！</p>
                          <p className="text-sm text-gray-500">2天前</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">阅读成就</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <Award size={32} className="mx-auto mb-2 text-novel-gold" />
                        <h4 className="font-bold">阅读达人</h4>
                        <p className="text-sm text-gray-500">累计阅读100本书</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <Award size={32} className="mx-auto mb-2 text-gray-400" />
                        <h4 className="font-bold">评论大师</h4>
                        <p className="text-sm text-gray-500">发表50条评论</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <Award size={32} className="mx-auto mb-2 text-amber-600" />
                        <h4 className="font-bold">收藏控</h4>
                        <p className="text-sm text-gray-500">收藏30本小说</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <h3 className="text-lg font-bold">消息通知</h3>
                    <Button variant="ghost" size="sm">
                      全部标为已读
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6">
                    {notifications.length > 0 ? (
                      <ul className="divide-y">
                        {notifications.map(notification => (
                          <li key={notification.id} className={`py-4 first:pt-0 last:pb-0 ${!notification.isRead ? 'bg-gray-50' : ''}`}>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0">
                                {notification.type === 'system' ? (
                                  <Bell size={20} className="text-novel-gold" />
                                ) : (
                                  <MessageSquare size={20} className="text-novel-red" />
                                )}
                              </div>
                              <div className="flex-grow">
                                <p className={`${!notification.isRead ? 'font-medium' : ''}`}>
                                  {notification.content}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.isRead && (
                                <div className="flex-shrink-0">
                                  <Badge className="bg-novel-red">新</Badge>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8">
                        <Bell size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">暂无消息通知</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="points">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">积分中心</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <Award size={40} className="text-novel-gold mr-4" />
                        <div>
                          <p className="text-gray-500">当前积分</p>
                          <p className="text-2xl font-bold text-novel-gold">{userInfo.points}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-novel-red hover:bg-novel-red/90">
                          每日签到
                        </Button>
                        <Button variant="outline">
                          兑换商城
                        </Button>
                      </div>
                    </div>

                    <h4 className="font-bold mb-4">积分记录</h4>
                    <ul className="divide-y">
                      {pointsHistory.map(record => (
                        <li key={record.id} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex justify-between">
                            <div>
                              <p>{record.description}</p>
                              <p className="text-sm text-gray-500">{record.time}</p>
                            </div>
                            <div className={`font-bold ${record.type === 'earn' ? 'text-green-500' : 'text-red-500'}`}>
                              {record.type === 'earn' ? '+' : ''}{record.amount}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">获取更多积分</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-bold mb-2">每日签到</h4>
                        <p className="text-sm text-gray-600 mb-3">每日登录签到可获得20积分，连续签到额外奖励</p>
                        <Button size="sm" className="bg-novel-red hover:bg-novel-red/90">
                          立即签到
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-bold mb-2">阅读奖励</h4>
                        <p className="text-sm text-gray-600 mb-3">每日阅读时长达到1小时可获得50积分</p>
                        <Button size="sm" variant="outline">
                          去阅读
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-bold mb-2">发表评论</h4>
                        <p className="text-sm text-gray-600 mb-3">发表小说评论可获得10积分，每日上限5次</p>
                        <Button size="sm" variant="outline">
                          去评论
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="font-bold mb-2">邀请好友</h4>
                        <p className="text-sm text-gray-600 mb-3">成功邀请一位好友注册可获得100积分</p>
                        <Button size="sm" variant="outline">
                          立即邀请
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">账户设置</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-4">基本信息</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              用户名
                            </label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md" 
                              value={userInfo.username}
                              readOnly
                            />
                            <p className="text-xs text-gray-500 mt-1">用户名不可更改</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              个人简介
                            </label>
                            <textarea 
                              className="w-full p-2 border rounded-md" 
                              rows={3}
                              defaultValue={userInfo.description}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="bg-novel-red hover:bg-novel-red/90">
                            保存修改
                          </Button>
                        </div>
                      </div>

                      <hr />

                      <div>
                        <h4 className="font-bold mb-4">修改密码</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              当前密码
                            </label>
                            <input 
                              type="password" 
                              className="w-full p-2 border rounded-md" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              新密码
                            </label>
                            <input 
                              type="password" 
                              className="w-full p-2 border rounded-md" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              确认新密码
                            </label>
                            <input 
                              type="password" 
                              className="w-full p-2 border rounded-md" 
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="bg-novel-red hover:bg-novel-red/90">
                            更新密码
                          </Button>
                        </div>
                      </div>

                      <hr />

                      <div>
                        <h4 className="font-bold mb-4">通知设置</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">新章节通知</p>
                              <p className="text-sm text-gray-500">收到关注作品的更新提醒</p>
                            </div>
                            <div>
                              <input type="checkbox" defaultChecked className="mr-2" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">评论回复通知</p>
                              <p className="text-sm text-gray-500">他人回复您评论时提醒</p>
                            </div>
                            <div>
                              <input type="checkbox" defaultChecked className="mr-2" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">系统通知</p>
                              <p className="text-sm text-gray-500">接收系统更新和活动提醒</p>
                            </div>
                            <div>
                              <input type="checkbox" defaultChecked className="mr-2" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="bg-novel-red hover:bg-novel-red/90">
                            保存设置
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserPage;
