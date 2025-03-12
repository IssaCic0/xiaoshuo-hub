
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  BookOpen, 
  Heart, 
  History, 
  Settings, 
  MessageSquare, 
  Bell,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const userMenuItems = [
    {
      path: '/user',
      icon: <User size={18} />,
      label: '个人中心'
    },
    {
      path: '/user/bookshelf',
      icon: <BookOpen size={18} />,
      label: '我的书架'
    },
    {
      path: '/user/favorites',
      icon: <Heart size={18} />,
      label: '我的收藏'
    },
    {
      path: '/user/history',
      icon: <History size={18} />,
      label: '阅读历史'
    },
    {
      path: '/user/messages',
      icon: <MessageSquare size={18} />,
      label: '我的消息'
    },
    {
      path: '/user/notifications',
      icon: <Bell size={18} />,
      label: '我的通知'
    },
    {
      path: '/user/settings',
      icon: <Settings size={18} />,
      label: '账号设置'
    }
  ];
  
  const handleLogout = () => {
    toast({
      title: "已退出登录",
      description: "您已成功退出登录",
    });
    
    // Would normally clear auth state here
    window.location.href = '/';
  };

  return (
    <div className="w-64 border-r border-gray-200 h-full py-8 px-4 flex flex-col">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-20 h-20 mb-3">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="用户头像" />
          <AvatarFallback>用户</AvatarFallback>
        </Avatar>
        <h3 className="font-bold text-lg">李小明</h3>
        <p className="text-gray-500 text-sm">普通会员</p>
      </div>
      
      <nav className="flex-grow">
        <ul className="space-y-2">
          {userMenuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-novel-red/10 text-novel-red font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
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
        variant="outline" 
        className="mt-6 flex items-center justify-center gap-2 text-gray-700 hover:text-novel-red border-gray-300"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>退出登录</span>
      </Button>
    </div>
  );
};

export default UserSidebar;
