import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Search, Trash2, Tag } from "lucide-react";
import { useToast } from "@/components/ui/toaster";

// 模拟分类数据
const mockCategories = [
  {
    id: 1,
    name: "玄幻奇幻",
    description: "包含魔法、异世界、超能力等元素的作品",
    novelCount: 248,
    createTime: "2023-10-15"
  },
  {
    id: 2,
    name: "武侠仙侠",
    description: "描述古代侠客或修仙者的故事",
    novelCount: 156,
    createTime: "2023-10-15"
  },
  {
    id: 3,
    name: "都市言情",
    description: "发生在现代都市中的爱情故事",
    novelCount: 189,
    createTime: "2023-10-15"
  },
  {
    id: 4,
    name: "历史军事",
    description: "以历史事件或军事为背景的小说",
    novelCount: 87,
    createTime: "2023-10-15"
  },
  {
    id: 5,
    name: "科幻未来",
    description: "探索科技和未来世界的作品",
    novelCount: 63,
    createTime: "2023-10-15"
  },
  {
    id: 6,
    name: "游戏竞技",
    description: "围绕电子游戏或体育竞技展开的故事",
    novelCount: 42,
    createTime: "2023-10-15"
  },
  {
    id: 7,
    name: "悬疑灵异",
    description: "包含悬疑、推理、恐怖元素的作品",
    novelCount: 57,
    createTime: "2023-10-15"
  }
];

interface Category {
  id: number;
  name: string;
  description: string;
  novelCount: number;
  createTime: string;
}

const AdminCategoriesPage = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  });

  // 过滤分类
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 添加分类
  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "添加失败",
        description: "请填写分类名称",
        variant: "destructive"
      });
      return;
    }

    // 检查分类名称是否已存在
    if (categories.some(category => category.name === newCategory.name)) {
      toast({
        title: "添加失败",
        description: "该分类名称已存在",
        variant: "destructive"
      });
      return;
    }

    const id = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const currentDate = new Date().toISOString().slice(0, 10);
    
    const category = {
      id,
      name: newCategory.name,
      description: newCategory.description,
      novelCount: 0,
      createTime: currentDate
    };

    setCategories([...categories, category]);
    setIsAddDialogOpen(false);
    setNewCategory({
      name: "",
      description: ""
    });

    toast({
      title: "添加成功",
      description: `分类"${category.name}"已成功添加。`
    });
  };

  // 编辑分类
  const handleEditCategory = () => {
    if (!currentCategory) return;

    if (!currentCategory.name) {
      toast({
        title: "更新失败",
        description: "分类名称不能为空",
        variant: "destructive"
      });
      return;
    }

    // 检查分类名称是否已存在（排除当前编辑的分类）
    if (categories.some(category => 
      category.name === currentCategory.name && category.id !== currentCategory.id
    )) {
      toast({
        title: "更新失败",
        description: "该分类名称已存在",
        variant: "destructive"
      });
      return;
    }

    const updatedCategories = categories.map(category => 
      category.id === currentCategory.id ? currentCategory : category
    );

    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    
    toast({
      title: "更新成功",
      description: `分类"${currentCategory.name}"信息已更新。`
    });
  };

  // 删除分类
  const handleDeleteCategory = () => {
    if (!currentCategory) return;

    if (currentCategory.novelCount > 0) {
      toast({
        title: "删除失败",
        description: `该分类下还有 ${currentCategory.novelCount} 部小说，请先移动或删除这些小说。`,
        variant: "destructive"
      });
      setIsDeleteDialogOpen(false);
      return;
    }

    const updatedCategories = categories.filter(category => category.id !== currentCategory.id);
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "删除成功",
      description: `分类"${currentCategory.name}"已删除。`
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">分类管理</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加分类
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="搜索分类名称"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="mr-2 h-5 w-5" />
              分类列表
            </CardTitle>
            <CardDescription>
              共 {filteredCategories.length} 个分类
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>分类名称</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead>小说数量</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                        <TableCell>{category.novelCount}</TableCell>
                        <TableCell>{category.createTime}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentCategory(category);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentCategory(category);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        没有找到匹配的分类
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 添加分类对话框 */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加新分类</DialogTitle>
              <DialogDescription>
                添加一个新的小说分类
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">分类名称 *</Label>
                <Input
                  id="name"
                  placeholder="请输入分类名称"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">分类描述</Label>
                <Textarea
                  id="description"
                  placeholder="请输入分类描述"
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddCategory}>
                添加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 编辑分类对话框 */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>编辑分类</DialogTitle>
              <DialogDescription>
                修改分类的基本信息
              </DialogDescription>
            </DialogHeader>
            {currentCategory && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">分类名称 *</Label>
                  <Input
                    id="edit-name"
                    value={currentCategory.name}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">分类描述</Label>
                  <Textarea
                    id="edit-description"
                    rows={3}
                    value={currentCategory.description}
                    onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleEditCategory}>
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 删除分类对话框 */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>删除分类</DialogTitle>
              <DialogDescription>
                您确定要删除这个分类吗？此操作无法撤销。
              </DialogDescription>
            </DialogHeader>
            {currentCategory && (
              <div className="py-4">
                <p className="mb-2">即将删除：</p>
                <p className="font-bold">{currentCategory.name}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {currentCategory.novelCount > 0 
                    ? `警告：该分类下有 ${currentCategory.novelCount} 部小说，删除前请先移动或删除这些小说。` 
                    : "该分类下没有小说，可以安全删除。"}
                </p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                取消
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteCategory}
                disabled={currentCategory?.novelCount ? currentCategory.novelCount > 0 : false}
              >
                确认删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminCategoriesPage; 