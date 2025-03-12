
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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const adminMenuItems = [
    {
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />,
      label: '控制台'
    },
    {
      path: '/admin/novels',
      icon: <BookOpen size={18} />,
      label: '小说管理'
    },
    {
      path: '/admin/categories',
      icon: <Tag size={18} />,
      label: '分类管理'
    },
    {
      path: '/admin/users',
      icon: <Users size={18} />,
      label: '用户管理'
    },
    {
      path: '/admin/comments',
      icon: <MessageSquare size={18} />,
      label: '评论管理'
    },
    {
      path: '/admin/reports',
      icon: <FileText size={18} />,
      label: '举报管理'
    },
    {
      path: '/admin/statistics',
      icon: <LineChart size={18} />,
      label: '数据统计'
    },
    {
      path: '/admin/permissions',
      icon: <Shield size={18} />,
      label: '权限管理'
    },
    {
      path: '/admin/settings',
      icon: <Settings size={18} />,
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
    <div className="w-64 bg-gray-900 text-white h-full py-8 px-4 flex flex-col">
      <div className="flex items-center mb-8">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="管理员头像" />
          <AvatarFallback className="bg-novel-gold text-white">管理</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold">系统管理员</h3>
          <p className="text-gray-400 text-xs">超级管理员</p>
        </div>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-1">
          {adminMenuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-novel-gold/20 text-novel-gold font-medium' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <Button 
        variant="ghost" 
        className="mt-6 flex items-center justify-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>退出登录</span>
      </Button>
    </div>
  );
};

export default AdminSidebar;
