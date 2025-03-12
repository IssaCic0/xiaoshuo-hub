import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare, LineChart } from "lucide-react";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart,
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

// 用户增长数据
const userGrowthData = [
  { name: "3月1日", 用户数: 50 },
  { name: "3月3日", 用户数: 80 },
  { name: "3月5日", 用户数: 85 },
  { name: "3月7日", 用户数: 120 },
  { name: "3月9日", 用户数: 150 },
  { name: "3月11日", 用户数: 180 },
  { name: "3月13日", 用户数: 210 },
  { name: "3月15日", 用户数: 230 },
  { name: "3月17日", 用户数: 250 },
  { name: "3月19日", 用户数: 275 },
  { name: "3月21日", 用户数: 290 },
  { name: "3月23日", 用户数: 310 },
  { name: "3月25日", 用户数: 335 },
  { name: "3月27日", 用户数: 360 },
  { name: "3月29日", 用户数: 380 },
  { name: "3月31日", 用户数: 410 },
];

// 阅读量数据
const readingData = [
  { name: "3月1日", 阅读量: 2200 },
  { name: "3月3日", 阅读量: 2800 },
  { name: "3月5日", 阅读量: 3500 },
  { name: "3月7日", 阅读量: 4200 },
  { name: "3月9日", 阅读量: 4800 },
  { name: "3月11日", 阅读量: 5500 },
  { name: "3月13日", 阅读量: 6200 },
  { name: "3月15日", 阅读量: 6800 },
  { name: "3月17日", 阅读量: 7500 },
  { name: "3月19日", 阅读量: 8200 },
  { name: "3月21日", 阅读量: 9000 },
  { name: "3月23日", 阅读量: 9800 },
  { name: "3月25日", 阅读量: 10500 },
  { name: "3月27日", 阅读量: 11200 },
  { name: "3月29日", 阅读量: 12000 },
  { name: "3月31日", 阅读量: 12800 },
];

// 最新小说数据
const latestNovels = [
  {
    id: 1,
    title: "星辰大海",
    author: "青云客",
    category: "玄幻奇幻",
    date: "2024-03-15",
    status: "已上线"
  },
  {
    id: 2,
    title: "龙吟九天",
    author: "月下客",
    category: "武侠仙侠",
    date: "2024-03-14",
    status: "已上线"
  },
  {
    id: 3,
    title: "都市神医",
    author: "风清扬",
    category: "都市言情",
    date: "2024-03-13",
    status: "审核中"
  },
  {
    id: 4,
    title: "异界征途",
    author: "剑舞红尘",
    category: "玄幻奇幻",
    date: "2024-03-12",
    status: "已上线"
  },
  {
    id: 5,
    title: "科技霸主",
    author: "云中客",
    category: "科幻未来",
    date: "2024-03-11",
    status: "已上线"
  }
];

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  return (
    <AdminDashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">管理控制台</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,721</div>
              <p className="text-xs text-gray-500">
                较上月 +12.5%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">小说数量</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">842</div>
              <p className="text-xs text-gray-500">
                较上月 +5.3%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">评论数量</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,938</div>
              <p className="text-xs text-gray-500">
                较上月 +18.2%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">总阅读量</CardTitle>
              <LineChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,293,842</div>
              <p className="text-xs text-gray-500">
                较上月 +8.7%
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>新增用户统计</CardTitle>
              <CardDescription>最近30天新增用户趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                    <YAxis fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: "8px" }} />
                    <Legend verticalAlign="top" height={36} />
                    <Area 
                      type="monotone" 
                      dataKey="用户数" 
                      stroke="#2C5282" 
                      fill="#2C5282" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>阅读量统计</CardTitle>
              <CardDescription>最近30天阅读量趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={readingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                    <XAxis dataKey="name" fontSize={12} tickMargin={10} />
                    <YAxis fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: "8px" }} />
                    <Legend verticalAlign="top" height={36} />
                    <Bar 
                      dataKey="阅读量" 
                      fill="#C53030" 
                      radius={[4, 4, 0, 0]} 
                      barSize={20} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>最新小说</CardTitle>
              <CardDescription>最近添加的小说</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">小说名称</th>
                      <th className="text-left p-3">作者</th>
                      <th className="text-left p-3">类别</th>
                      <th className="text-left p-3">添加时间</th>
                      <th className="text-left p-3">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestNovels.map((novel) => (
                      <tr key={novel.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{novel.title}</td>
                        <td className="p-3">{novel.author}</td>
                        <td className="p-3">{novel.category}</td>
                        <td className="p-3">{novel.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            novel.status === "已上线" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {novel.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboardPage;
