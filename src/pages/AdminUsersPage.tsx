import { useState, useMemo, useCallback, memo } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Ban, Eye, MoreHorizontal, Search, Shield, User, UserCog } from "lucide-react";
import { useToast } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: "zhang_san",
    nickname: "张三",
    email: "zhangsan@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    role: "普通用户",
    status: "正常",
    registerDate: "2024-02-10",
    lastLoginDate: "2024-03-15",
    bookshelfCount: 12
  },
  {
    id: 2,
    username: "li_si",
    nickname: "李四",
    email: "lisi@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    role: "普通用户",
    status: "正常",
    registerDate: "2024-02-12",
    lastLoginDate: "2024-03-14",
    bookshelfCount: 8
  },
  {
    id: 3,
    username: "wang_wu",
    nickname: "王五",
    email: "wangwu@example.com",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    role: "VIP用户",
    status: "正常",
    registerDate: "2024-02-15",
    lastLoginDate: "2024-03-13",
    bookshelfCount: 24
  },
  {
    id: 4,
    username: "zhao_liu",
    nickname: "赵六",
    email: "zhaoliu@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    role: "普通用户",
    status: "已禁用",
    registerDate: "2024-02-18",
    lastLoginDate: "2024-02-25",
    bookshelfCount: 3
  },
  {
    id: 5,
    username: "qian_qi",
    nickname: "钱七",
    email: "qianqi@example.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    role: "管理员",
    status: "正常",
    registerDate: "2024-01-10",
    lastLoginDate: "2024-03-15",
    bookshelfCount: 16
  },
  {
    id: 6,
    username: "sun_ba",
    nickname: "孙八",
    email: "sunba@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    role: "普通用户",
    status: "正常",
    registerDate: "2024-02-20",
    lastLoginDate: "2024-03-10",
    bookshelfCount: 6
  },
  {
    id: 7,
    username: "zhou_jiu",
    nickname: "周九",
    email: "zhoujiu@example.com",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    role: "VIP用户",
    status: "正常",
    registerDate: "2024-02-22",
    lastLoginDate: "2024-03-14",
    bookshelfCount: 18
  },
  {
    id: 8,
    username: "wu_shi",
    nickname: "吴十",
    email: "wushi@example.com",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    role: "普通用户",
    status: "已禁用",
    registerDate: "2024-02-25",
    lastLoginDate: "2024-03-05",
    bookshelfCount: 2
  }
];

interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
  registerDate: string;
  lastLoginDate: string;
  bookshelfCount: number;
}

// 提取用户表格行组件
const UserTableRow = memo(({ 
  user, 
  onViewUser, 
  onResetPassword, 
  onBanUser, 
  onChangeRole 
}: {
  user: User;
  onViewUser: (user: User) => void;
  onResetPassword: (user: User) => void;
  onBanUser: (user: User) => void;
  onChangeRole: (user: User, role: string) => void;
}) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.nickname} />
            <AvatarFallback>{user.nickname[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.nickname}</div>
            <div className="text-xs text-gray-500">@{user.username}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={cn({
            "bg-blue-100 text-blue-800 border-blue-200": user.role === "管理员",
            "bg-gold-100 text-gold-800 border-gold-200": user.role === "VIP用户",
            "bg-gray-100 text-gray-800 border-gray-200": user.role === "普通用户"
          })}
        >
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={cn({
            "bg-green-100 text-green-800 border-green-200": user.status === "正常",
            "bg-red-100 text-red-800 border-red-200": user.status === "已禁用"
          })}
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>{user.registerDate}</TableCell>
      <TableCell>{user.lastLoginDate}</TableCell>
      <TableCell>{user.bookshelfCount}</TableCell>
      <TableCell className="text-right">
        <UserActions 
          user={user}
          onViewUser={onViewUser}
          onResetPassword={onResetPassword}
          onBanUser={onBanUser}
          onChangeRole={onChangeRole}
        />
      </TableCell>
    </TableRow>
  );
});

// 提取用户操作下拉菜单组件
const UserActions = memo(({ 
  user, 
  onViewUser, 
  onResetPassword, 
  onBanUser, 
  onChangeRole 
}: {
  user: User;
  onViewUser: (user: User) => void;
  onResetPassword: (user: User) => void;
  onBanUser: (user: User) => void;
  onChangeRole: (user: User, role: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>用户操作</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onViewUser(user)}>
          <Eye className="mr-2 h-4 w-4" />
          查看详情
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onResetPassword(user)}>
          <Shield className="mr-2 h-4 w-4" />
          重置密码
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onBanUser(user)}>
          <Ban className="mr-2 h-4 w-4" />
          {user.status === "正常" ? "禁用用户" : "解除禁用"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserCog className="mr-2 h-4 w-4" />
          更改角色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeRole(user, "普通用户")}>
          <div className="ml-6">普通用户</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeRole(user, "VIP用户")}>
          <div className="ml-6">VIP用户</div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeRole(user, "管理员")}>
          <div className="ml-6">管理员</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

// 提取搜索和过滤组件
const SearchAndFilter = memo(({
  searchTerm,
  selectedRole,
  selectedStatus,
  onSearchChange,
  onRoleChange,
  onStatusChange
}: {
  searchTerm: string;
  selectedRole: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索用户名、昵称或邮箱"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select 
              value={selectedRole} 
              onValueChange={onRoleChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="选择角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="所有角色">所有角色</SelectItem>
                <SelectItem value="普通用户">普通用户</SelectItem>
                <SelectItem value="VIP用户">VIP用户</SelectItem>
                <SelectItem value="管理员">管理员</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={selectedStatus} 
              onValueChange={onStatusChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="所有状态">所有状态</SelectItem>
                <SelectItem value="正常">正常</SelectItem>
                <SelectItem value="已禁用">已禁用</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

// 提取用户列表组件
const UserList = memo(({
  users,
  onViewUser,
  onResetPassword,
  onBanUser,
  onChangeRole
}: {
  users: User[];
  onViewUser: (user: User) => void;
  onResetPassword: (user: User) => void;
  onBanUser: (user: User) => void;
  onChangeRole: (user: User, role: string) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          用户列表
        </CardTitle>
        <CardDescription>
          共 {users.length} 位用户
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户信息</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>注册日期</TableHead>
                <TableHead>最后登录</TableHead>
                <TableHead>书架数</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <UserTableRow
                    key={user.id}
                    user={user}
                    onViewUser={onViewUser}
                    onResetPassword={onResetPassword}
                    onBanUser={onBanUser}
                    onChangeRole={onChangeRole}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    没有找到匹配的用户
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
});

const AdminUsersPage = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("所有角色");
  const [selectedStatus, setSelectedStatus] = useState("所有状态");
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    description: string;
    action: () => void;
  } | null>(null);

  // 使用 useMemo 优化过滤逻辑
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "所有角色" || user.role === selectedRole;
      const matchesStatus = selectedStatus === "所有状态" || user.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, selectedRole, selectedStatus]);

  // 使用 useCallback 优化事件处理函数
  const handleBanUser = useCallback((user: User) => {
    setConfirmAction({
      title: user.status === "正常" ? "禁用用户" : "解除禁用",
      description: user.status === "正常" 
        ? `确定要禁用用户"${user.nickname}"吗？禁用后该用户将无法登录系统。` 
        : `确定要解除用户"${user.nickname}"的禁用状态吗？`,
      action: () => {
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === user.id 
              ? { ...u, status: u.status === "正常" ? "已禁用" : "正常" } 
              : u
          )
        );
        
        setIsConfirmDialogOpen(false);
        
        toast({
          title: user.status === "正常" ? "用户已禁用" : "用户已启用",
          description: user.status === "正常" 
            ? `用户"${user.nickname}"已被成功禁用。` 
            : `用户"${user.nickname}"已被成功启用。`
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  }, [toast]);

  const handleChangeRole = useCallback((user: User, newRole: string) => {
    if (user.role === newRole) return;

    setConfirmAction({
      title: "更改用户角色",
      description: `确定要将"${user.nickname}"的角色从"${user.role}"更改为"${newRole}"吗？`,
      action: () => {
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === user.id ? { ...u, role: newRole } : u
          )
        );
        
        setIsConfirmDialogOpen(false);
        
        toast({
          title: "角色已更改",
          description: `用户"${user.nickname}"的角色已更改为"${newRole}"。`
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  }, [toast]);

  const handleViewUser = useCallback((user: User) => {
    setViewingUser(user);
    setIsViewDialogOpen(true);
  }, []);

  const handleResetPassword = useCallback((user: User) => {
    setConfirmAction({
      title: "重置密码",
      description: `确定要重置"${user.nickname}"的密码吗？系统将生成一个随机密码并发送到用户邮箱。`,
      action: () => {
        setIsConfirmDialogOpen(false);
        
        toast({
          title: "密码已重置",
          description: `新密码已发送至用户邮箱"${user.email}"。`
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  }, [toast]);

  // 优化搜索和过滤的回调函数
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleRoleChange = useCallback((value: string) => {
    setSelectedRole(value);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">用户管理</h1>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          selectedRole={selectedRole}
          selectedStatus={selectedStatus}
          onSearchChange={handleSearchChange}
          onRoleChange={handleRoleChange}
          onStatusChange={handleStatusChange}
        />

        <UserList
          users={filteredUsers}
          onViewUser={handleViewUser}
          onResetPassword={handleResetPassword}
          onBanUser={handleBanUser}
          onChangeRole={handleChangeRole}
        />

        {/* 用户详情对话框 */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>用户详情</DialogTitle>
            </DialogHeader>
            {viewingUser && (
              <div className="py-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={viewingUser.avatar} alt={viewingUser.nickname} />
                    <AvatarFallback>{viewingUser.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{viewingUser.nickname}</h3>
                    <p className="text-sm text-gray-500">@{viewingUser.username}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge 
                        variant="outline" 
                        className={`${
                          viewingUser.role === "管理员" 
                            ? "bg-blue-100 text-blue-800 border-blue-200" 
                            : viewingUser.role === "VIP用户" 
                            ? "bg-gold-100 text-gold-800 border-gold-200" 
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {viewingUser.role}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={viewingUser.status === "正常" 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {viewingUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <Label className="text-gray-500">电子邮箱</Label>
                    <p>{viewingUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">注册日期</Label>
                    <p>{viewingUser.registerDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">最后登录</Label>
                    <p>{viewingUser.lastLoginDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">书架藏书</Label>
                    <p>{viewingUser.bookshelfCount} 本</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button 
                    variant={viewingUser.status === "正常" ? "destructive" : "outline"}
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleBanUser(viewingUser);
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    {viewingUser.status === "正常" ? "禁用用户" : "解除禁用"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleResetPassword(viewingUser);
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    重置密码
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 确认操作对话框 */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{confirmAction?.title}</DialogTitle>
              <DialogDescription>
                {confirmAction?.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                取消
              </Button>
              <Button 
                variant={confirmAction?.title.includes("禁用") ? "destructive" : "default"}
                onClick={confirmAction?.action}
              >
                确认
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminUsersPage; 