import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Check, Edit, Eye, Lock, Plus, Search, ShieldAlert,
  ShieldCheck, Trash2, User, UserCheck, UserCog, Users 
} from "lucide-react";
import { useToast } from "@/components/ui/toaster";

// 模拟角色数据
const mockRoles = [
  {
    id: 1,
    name: "超级管理员",
    description: "系统最高权限，可以操作系统中的任何功能",
    userCount: 2,
    permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    createdAt: "2024-01-01 10:00"
  },
  {
    id: 2,
    name: "内容管理员",
    description: "负责管理系统内容，包括小说、评论、分类等",
    userCount: 5,
    permissions: [1, 2, 3, 5, 6, 7, 8, 9, 10, 13, 14],
    createdAt: "2024-01-02 14:30"
  },
  {
    id: 3,
    name: "用户管理员",
    description: "负责管理用户账号、权限及用户相关数据",
    userCount: 3,
    permissions: [1, 2, 4, 11, 12, 15, 16],
    createdAt: "2024-01-03 09:15"
  },
  {
    id: 4,
    name: "数据分析员",
    description: "只能查看系统数据统计，不能进行任何修改操作",
    userCount: 4,
    permissions: [1, 20],
    createdAt: "2024-01-04 11:45"
  },
  {
    id: 5,
    name: "小说编辑",
    description: "只能管理小说内容，不能管理用户和系统设置",
    userCount: 8,
    permissions: [1, 5, 6, 7, 8],
    createdAt: "2024-01-05 15:20"
  }
];

// 模拟权限数据
const mockPermissions = [
  { id: 1, name: "登录后台", description: "允许用户登录管理后台", category: "基础权限" },
  { id: 2, name: "查看仪表盘", description: "允许用户查看后台仪表盘数据", category: "基础权限" },
  
  { id: 3, name: "查看分类", description: "允许用户查看分类列表", category: "分类管理" },
  { id: 4, name: "添加分类", description: "允许用户添加新分类", category: "分类管理" },
  { id: 5, name: "编辑分类", description: "允许用户编辑分类信息", category: "分类管理" },
  { id: 6, name: "删除分类", description: "允许用户删除分类", category: "分类管理" },
  
  { id: 7, name: "查看小说", description: "允许用户查看小说列表", category: "小说管理" },
  { id: 8, name: "添加小说", description: "允许用户添加新小说", category: "小说管理" },
  { id: 9, name: "编辑小说", description: "允许用户编辑小说信息", category: "小说管理" },
  { id: 10, name: "删除小说", description: "允许用户删除小说", category: "小说管理" },
  
  { id: 11, name: "查看用户", description: "允许用户查看用户列表", category: "用户管理" },
  { id: 12, name: "添加用户", description: "允许用户添加新用户", category: "用户管理" },
  { id: 13, name: "编辑用户", description: "允许用户编辑用户信息", category: "用户管理" },
  { id: 14, name: "删除用户", description: "允许用户删除用户", category: "用户管理" },
  
  { id: 15, name: "查看评论", description: "允许用户查看评论列表", category: "评论管理" },
  { id: 16, name: "审核评论", description: "允许用户审核评论", category: "评论管理" },
  { id: 17, name: "删除评论", description: "允许用户删除评论", category: "评论管理" },
  
  { id: 18, name: "查看举报", description: "允许用户查看举报列表", category: "举报管理" },
  { id: 19, name: "处理举报", description: "允许用户处理举报", category: "举报管理" },
  
  { id: 20, name: "查看统计", description: "允许用户查看统计数据", category: "统计分析" },
];

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: "admin",
    nickname: "系统管理员",
    email: "admin@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    role: 1,
    lastLogin: "2024-03-15 10:30"
  },
  {
    id: 2,
    username: "wang_admin",
    nickname: "王管理",
    email: "wang@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    role: 1,
    lastLogin: "2024-03-14 16:45"
  },
  {
    id: 3,
    username: "li_content",
    nickname: "李内容",
    email: "li@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    role: 2,
    lastLogin: "2024-03-15 09:15"
  },
  {
    id: 4,
    username: "zhang_content",
    nickname: "张内容",
    email: "zhang@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    role: 2,
    lastLogin: "2024-03-13 11:20"
  },
  {
    id: 5,
    username: "liu_user",
    nickname: "刘用户",
    email: "liu@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    role: 3,
    lastLogin: "2024-03-14 14:30"
  },
  {
    id: 6,
    username: "chen_data",
    nickname: "陈数据",
    email: "chen@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    role: 4,
    lastLogin: "2024-03-15 08:45"
  },
  {
    id: 7,
    username: "yang_editor",
    nickname: "杨编辑",
    email: "yang@xiaoshuo-hub.com",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    role: 5,
    lastLogin: "2024-03-12 16:10"
  }
];

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: number[];
  createdAt: string;
}

interface Permission {
  id: number;
  name: string;
  description: string;
  category: string;
}

interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  role: number;
  lastLogin: string;
}

const AdminPermissionsPage = () => {
  const { toast } = useToast();

  // Role 状态
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  // 对话框状态
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [isUserRoleDialogOpen, setIsUserRoleDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [viewingRole, setViewingRole] = useState<Role | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  // 过滤角色
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 过滤用户
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 添加/编辑角色对话框
  const handleOpenRoleDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setNewRoleName(role.name);
      setNewRoleDescription(role.description);
      setSelectedPermissions([...role.permissions]);
    } else {
      setEditingRole(null);
      setNewRoleName("");
      setNewRoleDescription("");
      setSelectedPermissions([]);
    }
    setIsRoleDialogOpen(true);
  };

  // 保存角色
  const handleSaveRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "错误",
        description: "角色名称不能为空",
        variant: "destructive"
      });
      return;
    }

    if (editingRole) {
      // 更新角色
      const updatedRoles = roles.map(role =>
        role.id === editingRole.id
          ? { ...role, name: newRoleName, description: newRoleDescription, permissions: selectedPermissions }
          : role
      );
      setRoles(updatedRoles);
      toast({
        title: "角色已更新",
        description: `角色 "${newRoleName}" 已成功更新。`
      });
    } else {
      // 创建新角色
      const newRole: Role = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: newRoleName,
        description: newRoleDescription,
        permissions: selectedPermissions,
        userCount: 0,
        createdAt: new Date().toISOString().slice(0, 10) + " " + 
                  new Date().toTimeString().slice(0, 5)
      };
      setRoles([...roles, newRole]);
      toast({
        title: "角色已创建",
        description: `角色 "${newRoleName}" 已成功创建。`
      });
    }
    setIsRoleDialogOpen(false);
  };

  // 删除角色
  const handleDeleteRole = (roleId: number) => {
    const roleToDelete = roles.find(r => r.id === roleId);
    if (roleToDelete && roleToDelete.userCount > 0) {
      toast({
        title: "无法删除",
        description: `角色 "${roleToDelete.name}" 仍有 ${roleToDelete.userCount} 个用户使用中，无法删除。`,
        variant: "destructive"
      });
      return;
    }

    setRoles(roles.filter(role => role.id !== roleId));
    toast({
      title: "角色已删除",
      description: `角色已成功删除。`
    });
  };

  // 查看角色权限
  const handleViewPermissions = (role: Role) => {
    setViewingRole(role);
    setIsPermissionDialogOpen(true);
  };

  // 更改用户角色
  const handleOpenUserRoleDialog = (user: User) => {
    setViewingUser(user);
    setSelectedRole(user.role);
    setIsUserRoleDialogOpen(true);
  };

  // 保存用户角色
  const handleSaveUserRole = () => {
    if (!viewingUser || !selectedRole) {
      toast({
        title: "错误",
        description: "请选择角色",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = users.map(user =>
      user.id === viewingUser.id
        ? { ...user, role: selectedRole }
        : user
    );
    setUsers(updatedUsers);

    // 更新角色的用户计数
    const updatedRoles = [...roles];
    const oldRole = roles.find(r => r.id === viewingUser.role);
    const newRole = roles.find(r => r.id === selectedRole);
    
    if (oldRole && oldRole.id !== selectedRole) {
      oldRole.userCount -= 1;
    }
    if (newRole) {
      newRole.userCount += 1;
    }
    
    setRoles(updatedRoles);
    
    setIsUserRoleDialogOpen(false);
    toast({
      title: "角色已更新",
      description: `用户 "${viewingUser.nickname}" 的角色已更新。`
    });
  };

  // 获取角色名称
  const getRoleName = (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : "未分配";
  };

  // 切换权限选择
  const togglePermission = (permissionId: number) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  // 按类别选择所有权限
  const toggleCategoryPermissions = (category: string, checked: boolean) => {
    const categoryPermissionIds = permissions
      .filter(p => p.category === category)
      .map(p => p.id);
    
    let newSelectedPermissions = [...selectedPermissions];
    
    if (checked) {
      // 添加所有分类权限
      categoryPermissionIds.forEach(id => {
        if (!newSelectedPermissions.includes(id)) {
          newSelectedPermissions.push(id);
        }
      });
    } else {
      // 移除所有分类权限
      newSelectedPermissions = newSelectedPermissions.filter(
        id => !categoryPermissionIds.includes(id)
      );
    }
    
    setSelectedPermissions(newSelectedPermissions);
  };

  // 检查分类权限是否全部选中
  const isCategoryFullySelected = (category: string) => {
    const categoryPermissionIds = permissions
      .filter(p => p.category === category)
      .map(p => p.id);
    
    return categoryPermissionIds.every(id => selectedPermissions.includes(id));
  };
  
  // 检查分类权限是否部分选中
  const isCategoryPartiallySelected = (category: string) => {
    const categoryPermissionIds = permissions
      .filter(p => p.category === category)
      .map(p => p.id);
    
    const hasSelected = categoryPermissionIds.some(id => selectedPermissions.includes(id));
    const allSelected = categoryPermissionIds.every(id => selectedPermissions.includes(id));
    
    return hasSelected && !allSelected;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">权限管理</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="搜索角色或用户..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => handleOpenRoleDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                添加角色
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="roles" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>角色管理</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              <span>用户角色</span>
            </TabsTrigger>
          </TabsList>
          
          {/* 角色管理标签页 */}
          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  角色列表
                </CardTitle>
                <CardDescription>
                  管理系统角色及其权限
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>角色名称</TableHead>
                        <TableHead>描述</TableHead>
                        <TableHead>权限数量</TableHead>
                        <TableHead>用户数量</TableHead>
                        <TableHead>创建时间</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRoles.length > 0 ? (
                        filteredRoles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell className="font-medium">{role.name}</TableCell>
                            <TableCell>{role.description}</TableCell>
                            <TableCell>
                              {role.permissions.length} / {permissions.length}
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(role.permissions.length / permissions.length) * 100}%` }}
                                ></div>
                              </div>
                            </TableCell>
                            <TableCell>{role.userCount}</TableCell>
                            <TableCell>{role.createdAt}</TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewPermissions(role)}
                                title="查看权限"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenRoleDialog(role)}
                                title="编辑角色"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteRole(role.id)}
                                title="删除角色"
                                disabled={role.userCount > 0}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            没有找到匹配的角色
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 用户角色标签页 */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  用户角色分配
                </CardTitle>
                <CardDescription>
                  管理用户的角色分配
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>用户名</TableHead>
                        <TableHead>昵称</TableHead>
                        <TableHead>邮箱</TableHead>
                        <TableHead>当前角色</TableHead>
                        <TableHead>最后登录</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={user.avatar} alt={user.nickname} />
                                  <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                                </Avatar>
                                <span>{user.username}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.nickname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                                {getRoleName(user.role)}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenUserRoleDialog(user)}
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                更改角色
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            没有找到匹配的用户
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 添加/编辑角色对话框 */}
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? "编辑角色" : "添加新角色"}
              </DialogTitle>
              <DialogDescription>
                {editingRole 
                  ? "修改角色信息和权限" 
                  : "创建新角色并分配权限"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">角色名称</Label>
                  <Input
                    id="name"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="例如：内容管理员"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">角色描述</Label>
                  <Input
                    id="description"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    placeholder="例如：负责管理系统内容"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="mb-2">权限分配</Label>
                  
                  {/* 按类别分组的权限 */}
                  {Array.from(new Set(permissions.map(p => p.category))).map(category => (
                    <div key={category} className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={isCategoryFullySelected(category)}
                          ref={(input) => {
                            if (input) {
                              input.indeterminate = isCategoryPartiallySelected(category);
                            }
                          }}
                          onCheckedChange={(checked) => 
                            toggleCategoryPermissions(category, checked === true)
                          }
                        />
                        <Label htmlFor={`category-${category}`} className="font-bold">
                          {category}
                        </Label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                        {permissions
                          .filter(p => p.category === category)
                          .map(permission => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`permission-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                              <Label 
                                htmlFor={`permission-${permission.id}`}
                                className="text-sm"
                              >
                                {permission.name}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveRole}>
                {editingRole ? "保存更改" : "创建角色"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 查看角色权限对话框 */}
        <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {viewingRole && `角色权限 - ${viewingRole.name}`}
              </DialogTitle>
              <DialogDescription>
                该角色拥有的权限列表
              </DialogDescription>
            </DialogHeader>
            {viewingRole && (
              <div className="py-4">
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">角色描述</div>
                  <div className="font-medium">{viewingRole.description}</div>
                </div>
                
                <div className="mb-2">
                  <div className="text-sm text-gray-500 mb-1">权限列表</div>
                  <div className="text-xs text-gray-500">
                    {viewingRole.permissions.length} / {permissions.length} 权限
                  </div>
                </div>

                {/* 按类别分组的权限 */}
                {Array.from(new Set(permissions.map(p => p.category))).map(category => (
                  <div key={category} className="mb-4">
                    <div className="font-semibold mb-2">{category}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {permissions
                        .filter(p => p.category === category)
                        .map(permission => (
                          <div key={permission.id} className="flex items-center gap-2">
                            {viewingRole.permissions.includes(permission.id) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-gray-300" />
                            )}
                            <span className={viewingRole.permissions.includes(permission.id) 
                              ? "text-sm" 
                              : "text-sm text-gray-400"
                            }>
                              {permission.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button 
                onClick={() => viewingRole && handleOpenRoleDialog(viewingRole)}
                variant="outline"
              >
                <Edit className="mr-2 h-4 w-4" />
                编辑权限
              </Button>
              <Button onClick={() => setIsPermissionDialogOpen(false)}>
                关闭
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 更改用户角色对话框 */}
        <Dialog open={isUserRoleDialogOpen} onOpenChange={setIsUserRoleDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                更改用户角色
              </DialogTitle>
              <DialogDescription>
                为用户分配新的角色
              </DialogDescription>
            </DialogHeader>
            {viewingUser && (
              <div className="py-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={viewingUser.avatar} alt={viewingUser.nickname} />
                    <AvatarFallback>{viewingUser.nickname[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-lg">{viewingUser.nickname}</div>
                    <div className="text-sm text-gray-500">@{viewingUser.username}</div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="role" className="mb-2 block">
                      选择角色
                    </Label>
                    <Select 
                      value={selectedRole?.toString()} 
                      onValueChange={(value) => setSelectedRole(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.id.toString()}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRole && (
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <div className="font-medium mb-1">
                        角色描述
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {roles.find(r => r.id === selectedRole)?.description}
                      </div>
                      <div className="font-medium mb-1">
                        权限数量
                      </div>
                      <div className="text-sm text-gray-600">
                        {roles.find(r => r.id === selectedRole)?.permissions.length} / {permissions.length}
                      </div>
                    </div>
                  )}

                  {viewingUser.role === selectedRole && (
                    <div className="text-amber-600 text-sm flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      用户已经拥有此角色
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserRoleDialogOpen(false)}>
                取消
              </Button>
              <Button 
                onClick={handleSaveUserRole}
                disabled={viewingUser?.role === selectedRole}
              >
                保存更改
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPermissionsPage; 