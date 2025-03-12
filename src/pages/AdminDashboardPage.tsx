
import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, MessageSquare, LineChart } from "lucide-react";

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
              <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">用户统计图表</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>阅读量统计</CardTitle>
              <CardDescription>最近30天阅读量趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">阅读量统计图表</p>
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
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3">星辰大海 {i}</td>
                        <td className="p-3">青云客</td>
                        <td className="p-3">玄幻奇幻</td>
                        <td className="p-3">2024-03-{10 + i}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">已上线</span>
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
