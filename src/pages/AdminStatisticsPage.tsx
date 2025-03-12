import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, 
  AreaChart, Area, 
  PieChart, Pie, Cell, 
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Users, BookOpen, MessageSquare, CalendarDays } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// 模拟数据 - 用户增长
const userGrowthData = [
  { date: "2024-01", total: 1200, new: 200, active: 800 },
  { date: "2024-02", total: 1500, new: 300, active: 1000 },
  { date: "2024-03", total: 2000, new: 500, active: 1300 },
  { date: "2024-04", total: 2800, new: 800, active: 1800 },
  { date: "2024-05", total: 3500, new: 700, active: 2200 },
  { date: "2024-06", total: 4200, new: 700, active: 2800 }
];

// 模拟数据 - 内容增长
const contentGrowthData = [
  { date: "2024-01", 小说数量: 45, 章节数量: 450 },
  { date: "2024-02", 小说数量: 55, 章节数量: 530 },
  { date: "2024-03", 小说数量: 60, 章节数量: 620 },
  { date: "2024-04", 小说数量: 68, 章节数量: 710 },
  { date: "2024-05", 小说数量: 75, 章节数量: 820 },
  { date: "2024-06", 小说数量: 85, 章节数量: 940 },
];

// 模拟数据 - 阅读量分布
const readingVolumeData = [
  { name: "玄幻奇幻", 阅读量: 15000 },
  { name: "武侠仙侠", 阅读量: 12000 },
  { name: "都市言情", 阅读量: 18000 },
  { name: "历史军事", 阅读量: 8500 },
  { name: "科幻未来", 阅读量: 7000 },
  { name: "游戏竞技", 阅读量: 5500 },
  { name: "悬疑灵异", 阅读量: 6000 },
];

// 模拟数据 - 访问时段分布
const visitTimeData = [
  { time: "00:00-02:00", 访问量: 450 },
  { time: "02:00-04:00", 访问量: 200 },
  { time: "04:00-06:00", 访问量: 150 },
  { time: "06:00-08:00", 访问量: 350 },
  { time: "08:00-10:00", 访问量: 800 },
  { time: "10:00-12:00", 访问量: 1200 },
  { time: "12:00-14:00", 访问量: 1500 },
  { time: "14:00-16:00", 访问量: 1800 },
  { time: "16:00-18:00", 访问量: 2000 },
  { time: "18:00-20:00", 访问量: 2400 },
  { time: "20:00-22:00", 访问量: 2100 },
  { time: "22:00-00:00", 访问量: 1400 },
];

// 模拟数据 - 设备分布
const deviceData = [
  { name: "手机", 占比: 65 },
  { name: "平板", 占比: 15 },
  { name: "电脑", 占比: 20 },
];

// 模拟数据 - 用户评分分布
const ratingData = [
  { name: "1星", 数量: 25 },
  { name: "2星", 数量: 50 },
  { name: "3星", 数量: 180 },
  { name: "4星", 数量: 320 },
  { name: "5星", 数量: 425 },
];

// 模拟数据 - 阅读数据
const readingData = [
  { date: "2024-01", views: 50000, duration: 25000 },
  { date: "2024-02", views: 65000, duration: 32000 },
  { date: "2024-03", views: 85000, duration: 42000 },
  { date: "2024-04", views: 120000, duration: 58000 },
  { date: "2024-05", views: 150000, duration: 72000 },
  { date: "2024-06", views: 180000, duration: 85000 }
];

// 模拟数据 - 小说分类占比
const categoryData = [
  { name: "玄幻", value: 35 },
  { name: "武侠", value: 25 },
  { name: "都市", value: 20 },
  { name: "科幻", value: 15 },
  { name: "其他", value: 5 }
];

// 饼图颜色
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminStatisticsPage = () => {
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">数据统计</h1>
          <p className="text-gray-500 mt-2">查看网站运营数据和趋势分析</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">最近7天</SelectItem>
              <SelectItem value="30">最近30天</SelectItem>
              <SelectItem value="90">最近90天</SelectItem>
              <SelectItem value="365">最近一年</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,200</div>
              <p className="text-xs text-muted-foreground">
                较上月增长 16.7%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总阅读量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">180,000</div>
              <p className="text-xs text-muted-foreground">
                较上月增长 20%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">小说总数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,500</div>
              <p className="text-xs text-muted-foreground">
                较上月增长 12.5%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">日活跃用户</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,800</div>
              <p className="text-xs text-muted-foreground">
                较上月增长 27.3%
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">用户分析</TabsTrigger>
            <TabsTrigger value="reading">阅读分析</TabsTrigger>
            <TabsTrigger value="novels">小说分析</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>用户增长趋势</CardTitle>
                <CardDescription>
                  展示用户总数、新增用户和活跃用户的变化趋势
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="new" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" name="总用户数" />
                      <Area type="monotone" dataKey="new" stroke="#82ca9d" fillOpacity={1} fill="url(#new)" name="新增用户" />
                      <Area type="monotone" dataKey="active" stroke="#ffc658" fillOpacity={1} fill="url(#active)" name="活跃用户" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>阅读数据分析</CardTitle>
                <CardDescription>
                  展示阅读量和阅读时长的变化趋势
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={readingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="views" stroke="#8884d8" name="阅读量" />
                      <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#82ca9d" name="阅读时长(分钟)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="novels" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>小说分类占比</CardTitle>
                  <CardDescription>
                    各类型小说数量分布
                  </CardDescription>
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

              <Card>
                <CardHeader>
                  <CardTitle>热门小说排行</CardTitle>
                  <CardDescription>
                    按阅读量排序的前10本小说
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: "斗破苍穹", views: 15000 },
                          { name: "武动乾坤", views: 12000 },
                          { name: "大主宰", views: 10000 },
                          { name: "完美世界", views: 8000 },
                          { name: "遮天", views: 7000 }
                        ]}
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="views" fill="#8884d8" name="阅读量" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminStatisticsPage; 