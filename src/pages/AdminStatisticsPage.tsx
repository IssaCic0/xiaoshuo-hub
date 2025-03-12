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

// 模拟数据 - 用户增长
const userGrowthData = [
  { date: "2024-01", 注册用户数: 120, 活跃用户数: 95 },
  { date: "2024-02", 注册用户数: 145, 活跃用户数: 105 },
  { date: "2024-03", 注册用户数: 175, 活跃用户数: 130 },
  { date: "2024-04", 注册用户数: 190, 活跃用户数: 145 },
  { date: "2024-05", 注册用户数: 220, 活跃用户数: 165 },
  { date: "2024-06", 注册用户数: 250, 活跃用户数: 180 },
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

// 模拟数据 - 平台关键指标
const platformMetrics = [
  { date: "2024-01", DAU: 3200, MAU: 5500, 留存率: 65, 转化率: 7.5 },
  { date: "2024-02", DAU: 3400, MAU: 6200, 留存率: 68, 转化率: 7.8 },
  { date: "2024-03", DAU: 3650, MAU: 6800, 留存率: 70, 转化率: 8.0 },
  { date: "2024-04", DAU: 3800, MAU: 7100, 留存率: 72, 转化率: 8.3 },
  { date: "2024-05", DAU: 4200, MAU: 7500, 留存率: 74, 转化率: 8.7 },
  { date: "2024-06", DAU: 4500, MAU: 8000, 留存率: 75, 转化率: 9.0 },
];

// 饼图颜色
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#45B39D'];

const AdminStatisticsPage = () => {
  const [timeRange, setTimeRange] = useState("6个月");
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">数据统计</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">时间范围：</span>
            <Select 
              value={timeRange} 
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="选择时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7天">7天</SelectItem>
                <SelectItem value="30天">30天</SelectItem>
                <SelectItem value="3个月">3个月</SelectItem>
                <SelectItem value="6个月">6个月</SelectItem>
                <SelectItem value="1年">1年</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="growth" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="growth" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>增长趋势</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>内容分析</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>用户分析</span>
            </TabsTrigger>
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>平台指标</span>
            </TabsTrigger>
          </TabsList>
          
          {/* 增长趋势标签页 */}
          <TabsContent value="growth">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>用户增长趋势</span>
                  </CardTitle>
                  <CardDescription>显示平台用户数量增长情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="注册用户数" 
                          stackId="1"
                          stroke="#8884d8" 
                          fill="#8884d8" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="活跃用户数" 
                          stackId="2"
                          stroke="#82ca9d" 
                          fill="#82ca9d" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>内容增长趋势</span>
                  </CardTitle>
                  <CardDescription>显示平台小说和章节数量增长情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={contentGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="小说数量" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="章节数量" 
                          stroke="#82ca9d" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* 内容分析标签页 */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    <span>各类型小说阅读量分布</span>
                  </CardTitle>
                  <CardDescription>显示不同类型小说的阅读量比例</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={readingVolumeData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="阅读量"
                        >
                          {readingVolumeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toLocaleString()} 次`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>用户评分分布</span>
                  </CardTitle>
                  <CardDescription>显示用户对小说的评分分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="数量" fill="#8884d8">
                          {ratingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    <span>访问时段分布</span>
                  </CardTitle>
                  <CardDescription>显示用户访问的时间段分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={visitTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="访问量" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* 用户分析标签页 */}
          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    <span>用户设备分布</span>
                  </CardTitle>
                  <CardDescription>显示用户访问设备类型分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="占比"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>评论互动分析</span>
                  </CardTitle>
                  <CardDescription>展示用户评论和互动情况趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="注册用户数" 
                          name="评论数"
                          stroke="#8884d8" 
                          fill="#8884d8" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="活跃用户数" 
                          name="互动数"
                          stroke="#82ca9d" 
                          fill="#82ca9d" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* 平台指标标签页 */}
          <TabsContent value="platform">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>平台关键指标</span>
                  </CardTitle>
                  <CardDescription>显示平台关键业务指标走势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={platformMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="DAU" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="MAU" 
                          stroke="#82ca9d" 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="留存率" 
                          stroke="#ffc658" 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="转化率" 
                          stroke="#ff8042" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">总用户数</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8,431</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+12.5%</span> 较上月
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">总小说数</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,024</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+8.3%</span> 较上月
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">总阅读量</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">892,356</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+18.2%</span> 较上月
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">转化率</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">9.0%</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+0.5%</span> 较上月
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminStatisticsPage; 