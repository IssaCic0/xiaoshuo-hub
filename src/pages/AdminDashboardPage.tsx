import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  BookOpen,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
  Star,
  AlertTriangle
} from "lucide-react";

// 模拟数据
const userGrowthData = [
  { date: "03-01", total: 3200, new: 120, active: 2100 },
  { date: "03-02", total: 3300, new: 100, active: 2200 },
  { date: "03-03", total: 3450, new: 150, active: 2300 },
  { date: "03-04", total: 3600, new: 150, active: 2400 },
  { date: "03-05", total: 3721, new: 121, active: 2500 }
];

const readingData = [
  { time: "00:00", value: 350 },
  { time: "03:00", value: 200 },
  { time: "06:00", value: 450 },
  { time: "09:00", value: 1200 },
  { time: "12:00", value: 1800 },
  { time: "15:00", value: 2100 },
  { time: "18:00", value: 2400 },
  { time: "21:00", value: 1900 }
];

const categoryData = [
  { name: "玄幻", value: 35 },
  { name: "武侠", value: 25 },
  { name: "都市", value: 20 },
  { name: "科幻", value: 15 },
  { name: "其他", value: 5 }
];

const recentNovels = [
  { id: 1, title: "星辰大海", author: "青云客", category: "玄幻奇幻", status: "已上线", addTime: "2024-03-15" },
  { id: 2, title: "武道巅峰", author: "云天明", category: "武侠仙侠", status: "审核中", addTime: "2024-03-15" },
  { id: 3, title: "都市之巅", author: "李白", category: "都市言情", status: "已上线", addTime: "2024-03-14" },
  { id: 4, title: "科技霸主", author: "未来客", category: "科幻未来", status: "已上线", addTime: "2024-03-14" },
  { id: 5, title: "修仙传说", author: "道一", category: "武侠仙侠", status: "审核中", addTime: "2024-03-13" }
];

const recentReports = [
  { id: 1, type: "小说", content: "《星辰大海》内容抄袭", status: "待处理", time: "10分钟前" },
  { id: 2, type: "评论", content: "恶意攻击作者", status: "已处理", time: "30分钟前" },
  { id: 3, type: "用户", content: "垃圾广告账号", status: "待处理", time: "1小时前" },
  { id: 4, type: "小说", content: "《武道巅峰》章节重复", status: "已驳回", time: "2小时前" },
  { id: 5, type: "评论", content: "不当言论", status: "已处理", time: "3小时前" }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboardPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">管理控制台</h1>
            <p className="text-gray-500 mt-2">欢迎回来，管理员</p>
          </div>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>

        {/* 数据概览卡片 */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">总用户数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,721</div>
              <div className="flex items-center pt-1 text-xs">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500">12.5%</span>
                <span className="text-muted-foreground ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">小说数量</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">842</div>
              <div className="flex items-center pt-1 text-xs">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500">5.3%</span>
                <span className="text-muted-foreground ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">评论数量</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,938</div>
              <div className="flex items-center pt-1 text-xs">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500">18.2%</span>
                <span className="text-muted-foreground ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">总阅读量</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,293,842</div>
              <div className="flex items-center pt-1 text-xs">
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500">8.7%</span>
                <span className="text-muted-foreground ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>用户增长趋势</CardTitle>
                  <CardDescription>显示用户总数和新增用户变化</CardDescription>
                </div>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" name="总用户" />
                    <Area type="monotone" dataKey="active" stroke="#82ca9d" fillOpacity={1} fill="url(#active)" name="活跃用户" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>今日阅读趋势</CardTitle>
                  <CardDescription>24小时阅读量分布</CardDescription>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={readingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="阅读量" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 小说分类和最新动态 */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>小说分类占比</CardTitle>
                  <CardDescription>各类型小说数量分布</CardDescription>
                </div>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>最新小说</CardTitle>
                  <CardDescription>最近添加的小说</CardDescription>
                </div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {recentNovels.map((novel) => (
                    <div key={novel.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{novel.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {novel.author} · {novel.category}
                        </p>
                      </div>
                      <Badge
                        variant={novel.status === "已上线" ? "default" : "secondary"}
                      >
                        {novel.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>最新举报</CardTitle>
                  <CardDescription>需要处理的举报信息</CardDescription>
                </div>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center space-x-4">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {report.type}：{report.content}
                        </p>
                        <p className="text-sm text-muted-foreground">{report.time}</p>
                      </div>
                      <Badge
                        variant={
                          report.status === "待处理"
                            ? "destructive"
                            : report.status === "已处理"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
