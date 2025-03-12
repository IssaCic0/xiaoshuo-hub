
import { ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";
import UserSidebar from "@/components/user/UserSidebar";

interface UserDashboardLayoutProps {
  children: ReactNode;
}

const UserDashboardLayout = ({ children }: UserDashboardLayoutProps) => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden min-h-[70vh]">
          <UserSidebar />
          <div className="flex-1 p-8">
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const UserDashboardPage = () => {
  return (
    <UserDashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6 chinese-header">个人中心</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold mb-4">阅读数据</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">总阅读时长</p>
                <p className="text-2xl font-bold text-novel-deepBlue">32小时</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">阅读小说</p>
                <p className="text-2xl font-bold text-novel-deepBlue">18本</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">已收藏</p>
                <p className="text-2xl font-bold text-novel-deepBlue">12本</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">评论数</p>
                <p className="text-2xl font-bold text-novel-deepBlue">25条</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-bold mb-4">最近阅读</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-16 bg-gray-200 rounded"></div>
                <div>
                  <h3 className="font-bold">星辰大海</h3>
                  <p className="text-gray-500 text-sm">阅读至: 第24章 星际风暴</p>
                  <p className="text-xs text-gray-400">2小时前</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-16 bg-gray-200 rounded"></div>
                <div>
                  <h3 className="font-bold">剑归何处</h3>
                  <p className="text-gray-500 text-sm">阅读至: 第12章 江湖恩怨</p>
                  <p className="text-xs text-gray-400">昨天</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">推荐小说</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
                <h3 className="font-bold truncate">推荐小说标题 {i}</h3>
                <p className="text-gray-500 text-sm truncate">作者名称</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserDashboardPage;
