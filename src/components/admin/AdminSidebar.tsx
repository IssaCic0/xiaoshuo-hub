import { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Settings, 
  FileText,
  Tag,
  LineChart,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// 将 MenuItem 组件提取出来并使用 memo
const MenuItem = memo(({ 
  path,
  icon,
  label,
  isActive, 
  collapsed 
}: { 
  path: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
}) => (
  <Link 
    to={path}
    className={cn(
      "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
      isActive 
        ? "bg-novel-gold text-white" 
        : "text-gray-300 hover:bg-gray-800 hover:text-white",
      collapsed ? "justify-center" : "space-x-3"
    )}
  >
    <span className={cn(
      "flex items-center justify-center",
      collapsed ? "h-6 w-6" : ""
    )}>
      {icon}
    </span>
    {!collapsed && <span>{label}</span>}
    {collapsed && (
      <div className="absolute left-full ml-2 hidden rounded-md bg-gray-800 px-2 py-1 group-hover:block">
        {label}
      </div>
    )}
  </Link>
));

MenuItem.displayName = 'MenuItem';

const AdminSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  
  const adminMenuItems = [
    {
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
      label: '控制台'
    },
    {
      path: '/admin/novels',
      icon: <BookOpen size={20} />,
      label: '小说管理'
    },
    {
      path: '/admin/categories',
      icon: <Tag size={20} />,
      label: '分类管理'
    },
    {
      path: '/admin/users',
      icon: <Users size={20} />,
      label: '用户管理'
    },
    {
      path: '/admin/comments',
      icon: <MessageSquare size={20} />,
      label: '评论管理'
    },
    {
      path: '/admin/reports',
      icon: <FileText size={20} />,
      label: '举报管理'
    },
    {
      path: '/admin/statistics',
      icon: <LineChart size={20} />,
      label: '数据统计'
    },
    {
      path: '/admin/permissions',
      icon: <Shield size={20} />,
      label: '权限管理'
    },
    {
      path: '/admin/settings',
      icon: <Settings size={20} />,
      label: '系统设置'
    }
  ];
  
  const handleLogout = () => {
    toast({
      title: "已退出登录",
      description: "您已成功退出管理员登录",
    });
    
    // Would normally clear auth state here
    window.location.href = '/';
  };

  return (
    <div 
      className={cn(
        "relative min-h-full bg-gray-900 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="sticky top-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full border bg-gray-800 text-white hover:bg-gray-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <div className={cn(
          "flex flex-col",
          collapsed ? "items-center" : "px-4"
        )}>
          <div className={cn(
            "flex items-center py-8",
            collapsed ? "justify-center" : "space-x-3"
          )}>
            <Avatar className={cn(
              "transition-all duration-300",
              collapsed ? "h-10 w-10" : "h-12 w-12"
            )}>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="管理员头像" />
              <AvatarFallback className="bg-novel-gold text-white">管理</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-semibold">系统管理员</span>
                <span className="text-sm text-gray-400">超级管理员</span>
              </div>
            )}
          </div>
          
          <nav className="flex-1 space-y-1">
            {adminMenuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
                collapsed={collapsed}
              />
            ))}
          </nav>
          
          <Button 
            variant="ghost" 
            className={cn(
              "my-8 flex items-center text-gray-300 hover:bg-gray-800 hover:text-white",
              collapsed ? "justify-center px-2" : "space-x-2"
            )}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!collapsed && <span>退出登录</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
