
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  User, 
  BookOpen, 
  Home, 
  List,
  LogIn
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toaster";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "搜索功能",
      description: "搜索功能即将推出",
    });
  };

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 text-novel-red hover:text-novel-red/80">
                  <Home size={18} />
                  <span>首页</span>
                </Link>
                <Link to="/categories" className="flex items-center gap-2 text-novel-red hover:text-novel-red/80">
                  <List size={18} />
                  <span>分类</span>
                </Link>
                <Link to="/bookshelf" className="flex items-center gap-2 text-novel-red hover:text-novel-red/80">
                  <BookOpen size={18} />
                  <span>书架</span>
                </Link>
                <Link to="/user" className="flex items-center gap-2 text-novel-red hover:text-novel-red/80">
                  <User size={18} />
                  <span>我的</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-novel-red mr-1">小说</span>
            <span className="text-2xl font-bold text-novel-gold">阁</span>
          </Link>

          <nav className="hidden md:flex ml-10">
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-gray-700 hover:text-novel-red font-medium transition">首页</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-700 hover:text-novel-red font-medium transition">分类</Link>
              </li>
              <li>
                <Link to="/ranking" className="text-gray-700 hover:text-novel-red font-medium transition">排行榜</Link>
              </li>
              <li>
                <Link to="/bookshelf" className="text-gray-700 hover:text-novel-red font-medium transition">书架</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {isSearchVisible ? (
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索小说或作者"
                className="chinese-input w-36 md:w-64"
                autoFocus
                onBlur={() => setIsSearchVisible(false)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost"
                className="absolute right-0 top-0"
              >
                <Search size={18} />
              </Button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchVisible(true)}
            >
              <Search size={20} />
            </Button>
          )}

          <Link to="/login" className="hidden md:flex items-center gap-1 text-novel-red hover:text-novel-red/80">
            <LogIn size={18} />
            <span>登录</span>
          </Link>

          <Link to="/user">
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
