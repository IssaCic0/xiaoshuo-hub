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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Edit, Plus, Search, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toaster";

// 模拟小说数据
const mockNovels = [
  {
    id: 1,
    title: "星辰大海",
    author: "青云客",
    category: "玄幻奇幻",
    status: "已上线",
    chapters: 120,
    views: 143289,
    updateTime: "2024-03-15"
  },
  {
    id: 2,
    title: "龙吟九天",
    author: "月下客",
    category: "武侠仙侠",
    status: "已上线",
    chapters: 85,
    views: 98752,
    updateTime: "2024-03-14"
  },
  {
    id: 3,
    title: "都市神医",
    author: "风清扬",
    category: "都市言情",
    status: "审核中",
    chapters: 56,
    views: 67453,
    updateTime: "2024-03-13"
  },
  {
    id: 4,
    title: "异界征途",
    author: "剑舞红尘",
    category: "玄幻奇幻",
    status: "已上线",
    chapters: 230,
    views: 245678,
    updateTime: "2024-03-12"
  },
  {
    id: 5,
    title: "科技霸主",
    author: "云中客",
    category: "科幻未来",
    status: "已上线",
    chapters: 78,
    views: 89345,
    updateTime: "2024-03-11"
  },
  {
    id: 6,
    title: "王者归来",
    author: "剑指苍穹",
    category: "玄幻奇幻",
    status: "已上线",
    chapters: 145,
    views: 165432,
    updateTime: "2024-03-10"
  },
  {
    id: 7,
    title: "永恒之歌",
    author: "梦幻星辰",
    category: "仙侠修真",
    status: "已上线",
    chapters: 92,
    views: 112567,
    updateTime: "2024-03-09"
  },
  {
    id: 8,
    title: "商界传奇",
    author: "商业奇才",
    category: "都市言情",
    status: "已下架",
    chapters: 68,
    views: 76354,
    updateTime: "2024-03-08"
  }
];

// 分类数据
const categories = [
  "玄幻奇幻",
  "武侠仙侠",
  "都市言情",
  "历史军事",
  "科幻未来",
  "游戏竞技",
  "悬疑灵异",
  "其他"
];

// 状态数据
const statuses = [
  "全部",
  "已上线",
  "审核中",
  "已下架"
];

const AdminNovelsPage = () => {
  const { toast } = useToast();
  const [novels, setNovels] = useState(mockNovels);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNovel, setCurrentNovel] = useState<any>(null);
  const [newNovel, setNewNovel] = useState({
    title: "",
    author: "",
    category: "",
    description: ""
  });

  // 过滤小说
  const filteredNovels = novels.filter(novel => {
    const matchesSearch = novel.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         novel.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "全部" || novel.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // 添加小说
  const handleAddNovel = () => {
    if (!newNovel.title || !newNovel.author || !newNovel.category) {
      toast({
        title: "添加失败",
        description: "请填写所有必填字段",
        variant: "destructive"
      });
      return;
    }

    const id = novels.length > 0 ? Math.max(...novels.map(n => n.id)) + 1 : 1;
    const currentDate = new Date().toISOString().slice(0, 10);
    
    const novel = {
      id,
      title: newNovel.title,
      author: newNovel.author,
      category: newNovel.category,
      status: "审核中",
      chapters: 0,
      views: 0,
      updateTime: currentDate
    };

    setNovels([novel, ...novels]);
    setIsAddDialogOpen(false);
    setNewNovel({
      title: "",
      author: "",
      category: "",
      description: ""
    });

    toast({
      title: "添加成功",
      description: `小说《${novel.title}》已添加，等待审核。`
    });
  };

  // 编辑小说
  const handleEditNovel = () => {
    if (!currentNovel) return;

    const updatedNovels = novels.map(novel => 
      novel.id === currentNovel.id ? currentNovel : novel
    );

    setNovels(updatedNovels);
    setIsEditDialogOpen(false);
    
    toast({
      title: "更新成功",
      description: `小说《${currentNovel.title}》信息已更新。`
    });
  };

  // 删除小说
  const handleDeleteNovel = () => {
    if (!currentNovel) return;

    const updatedNovels = novels.filter(novel => novel.id !== currentNovel.id);
    setNovels(updatedNovels);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "删除成功",
      description: `小说《${currentNovel.title}》已删除。`
    });
  };

  // 改变小说状态
  const handleStatusChange = (novelId: number, newStatus: string) => {
    const updatedNovels = novels.map(novel => 
      novel.id === novelId ? { ...novel, status: newStatus } : novel
    );

    setNovels(updatedNovels);
    
    toast({
      title: "状态更新",
      description: `小说状态已更改为"${newStatus}"。`
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">小说管理</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加小说
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="搜索小说名或作者"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select 
                value={selectedStatus} 
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              小说列表
            </CardTitle>
            <CardDescription>
              共 {filteredNovels.length} 部小说
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>书名</TableHead>
                    <TableHead>作者</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>章节数</TableHead>
                    <TableHead>阅读量</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNovels.length > 0 ? (
                    filteredNovels.map((novel) => (
                      <TableRow key={novel.id}>
                        <TableCell>{novel.id}</TableCell>
                        <TableCell className="font-medium">{novel.title}</TableCell>
                        <TableCell>{novel.author}</TableCell>
                        <TableCell>{novel.category}</TableCell>
                        <TableCell>{novel.chapters}</TableCell>
                        <TableCell>{novel.views.toLocaleString()}</TableCell>
                        <TableCell>
                          <Select 
                            value={novel.status} 
                            onValueChange={(value) => handleStatusChange(novel.id, value)}
                          >
                            <SelectTrigger className="w-24 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="已上线">已上线</SelectItem>
                              <SelectItem value="审核中">审核中</SelectItem>
                              <SelectItem value="已下架">已下架</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{novel.updateTime}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentNovel(novel);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentNovel(novel);
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
                      <TableCell colSpan={9} className="text-center py-4">
                        没有找到匹配的小说
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 添加小说对话框 */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加新小说</DialogTitle>
              <DialogDescription>
                请填写小说的基本信息，添加后状态默认为"审核中"
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">小说名称 *</Label>
                <Input
                  id="title"
                  placeholder="请输入小说名称"
                  value={newNovel.title}
                  onChange={(e) => setNewNovel({ ...newNovel, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">作者 *</Label>
                <Input
                  id="author"
                  placeholder="请输入作者名"
                  value={newNovel.author}
                  onChange={(e) => setNewNovel({ ...newNovel, author: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">分类 *</Label>
                <Select 
                  value={newNovel.category} 
                  onValueChange={(value) => setNewNovel({ ...newNovel, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">简介</Label>
                <Textarea
                  id="description"
                  placeholder="请输入小说简介"
                  rows={4}
                  value={newNovel.description}
                  onChange={(e) => setNewNovel({ ...newNovel, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddNovel}>
                添加
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 编辑小说对话框 */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>编辑小说</DialogTitle>
              <DialogDescription>
                修改小说的基本信息
              </DialogDescription>
            </DialogHeader>
            {currentNovel && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">小说名称</Label>
                  <Input
                    id="edit-title"
                    value={currentNovel.title}
                    onChange={(e) => setCurrentNovel({ ...currentNovel, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-author">作者</Label>
                  <Input
                    id="edit-author"
                    value={currentNovel.author}
                    onChange={(e) => setCurrentNovel({ ...currentNovel, author: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">分类</Label>
                  <Select 
                    value={currentNovel.category} 
                    onValueChange={(value) => setCurrentNovel({ ...currentNovel, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleEditNovel}>
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 删除小说对话框 */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>删除小说</DialogTitle>
              <DialogDescription>
                您确定要删除这部小说吗？此操作无法撤销。
              </DialogDescription>
            </DialogHeader>
            {currentNovel && (
              <div className="py-4">
                <p className="mb-2">即将删除：</p>
                <p className="font-bold">{currentNovel.title}</p>
                <p className="text-sm text-gray-500">作者：{currentNovel.author}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                取消
              </Button>
              <Button variant="destructive" onClick={handleDeleteNovel}>
                确认删除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminNovelsPage; 