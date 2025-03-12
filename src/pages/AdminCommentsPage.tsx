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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ban, BookOpen, Check, Eye, MessageSquare, Search, ThumbsDown, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toaster";

// 模拟评论数据
const mockComments = [
  {
    id: 1,
    content: "这本小说情节紧凑，人物形象鲜明，非常喜欢！",
    user: {
      id: 1,
      username: "zhang_san",
      nickname: "张三",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    novel: {
      id: 1,
      title: "星辰大海",
      chapter: "第一章 启程"
    },
    status: "正常",
    likes: 12,
    replyCount: 2,
    reportCount: 0,
    createTime: "2024-03-15 10:32"
  },
  {
    id: 2,
    content: "作者文笔优美，描写细腻，仿佛身临其境。期待后续发展！",
    user: {
      id: 2,
      username: "li_si",
      nickname: "李四",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    },
    novel: {
      id: 1,
      title: "星辰大海",
      chapter: "第二章 遇险"
    },
    status: "正常",
    likes: 8,
    replyCount: 1,
    reportCount: 0,
    createTime: "2024-03-14 15:45"
  },
  {
    id: 3,
    content: "这本书真的非常垃圾，浪费了我的时间，强烈不推荐！",
    user: {
      id: 3,
      username: "wang_wu",
      nickname: "王五",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
    },
    novel: {
      id: 2,
      title: "龙吟九天",
      chapter: "第三章 激战"
    },
    status: "待审核",
    likes: 0,
    replyCount: 0,
    reportCount: 3,
    createTime: "2024-03-13 21:18"
  },
  {
    id: 4,
    content: "情节设计太牵强，人物性格不一致，感觉作者在为了情节而情节。",
    user: {
      id: 4,
      username: "zhao_liu",
      nickname: "赵六",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    novel: {
      id: 3,
      title: "都市神医",
      chapter: "第一章 初临都市"
    },
    status: "待审核",
    likes: 2,
    replyCount: 1,
    reportCount: 1,
    createTime: "2024-03-12 08:55"
  },
  {
    id: 5,
    content: "这个网站真好用，我要去推荐给我的朋友们，大家都来看小说！http://spam-website.com",
    user: {
      id: 5,
      username: "qian_qi",
      nickname: "钱七",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    novel: {
      id: 1,
      title: "星辰大海",
      chapter: "第五章 归途"
    },
    status: "已屏蔽",
    likes: 0,
    replyCount: 0,
    reportCount: 5,
    createTime: "2024-03-11 17:22"
  },
  {
    id: 6,
    content: "角色刻画独特，剧情扣人心弦，看得我废寝忘食，强烈推荐！",
    user: {
      id: 6,
      username: "sun_ba",
      nickname: "孙八",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    novel: {
      id: 4,
      title: "异界征途",
      chapter: "第十章 觉醒"
    },
    status: "正常",
    likes: 18,
    replyCount: 3,
    reportCount: 0,
    createTime: "2024-03-10 12:10"
  },
  {
    id: 7,
    content: "故事结构完整，世界观设定合理，是一部值得细细品味的作品。",
    user: {
      id: 7,
      username: "zhou_jiu",
      nickname: "周九",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    },
    novel: {
      id: 5,
      title: "科技霸主",
      chapter: "第七章 突破"
    },
    status: "正常",
    likes: 10,
    replyCount: 0,
    reportCount: 0,
    createTime: "2024-03-09 09:30"
  },
  {
    id: 8,
    content: "全是脏话和低俗内容，应该封禁这种作品和作者！***** ******",
    user: {
      id: 8,
      username: "wu_shi",
      nickname: "吴十",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
    },
    novel: {
      id: 6,
      title: "王者归来",
      chapter: "第四章 复仇"
    },
    status: "已屏蔽",
    likes: 1,
    replyCount: 0,
    reportCount: 7,
    createTime: "2024-03-08 22:45"
  }
];

interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
}

interface Novel {
  id: number;
  title: string;
  chapter: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
  novel: Novel;
  status: "正常" | "待审核" | "已屏蔽";
  likes: number;
  replyCount: number;
  reportCount: number;
  createTime: string;
}

const AdminCommentsPage = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("所有状态");
  const [selectedNovel, setSelectedNovel] = useState("所有小说");
  const [viewingComment, setViewingComment] = useState<Comment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    description: string;
    action: () => void;
  } | null>(null);
  
  // 获取所有小说的去重列表
  const novels = Array.from(new Set(comments.map(comment => comment.novel.title)));

  // 过滤评论
  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "所有状态" || comment.status === selectedStatus;
    const matchesNovel = selectedNovel === "所有小说" || comment.novel.title === selectedNovel;
    return matchesSearch && matchesStatus && matchesNovel;
  });

  // 查看评论详情
  const handleViewComment = (comment: Comment) => {
    setViewingComment(comment);
    setIsViewDialogOpen(true);
  };

  // 屏蔽评论
  const handleBlockComment = (comment: Comment) => {
    setConfirmAction({
      title: comment.status === "正常" || comment.status === "待审核" ? "屏蔽评论" : "取消屏蔽",
      description: comment.status === "正常" || comment.status === "待审核"
        ? `确定要屏蔽这条评论吗？屏蔽后将对所有用户隐藏。`
        : `确定要取消屏蔽这条评论吗？取消后将对所有用户可见。`,
      action: () => {
        const updatedComments = comments.map(c => 
          c.id === comment.id 
            ? { ...c, status: c.status === "已屏蔽" ? "正常" : "已屏蔽" } 
            : c
        );
        
        setComments(updatedComments);
        setIsConfirmDialogOpen(false);
        
        toast({
          title: comment.status === "已屏蔽" ? "评论已恢复" : "评论已屏蔽",
          description: comment.status === "已屏蔽" 
            ? "评论已成功恢复显示。" 
            : "评论已成功屏蔽。"
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  };

  // 批准评论
  const handleApproveComment = (comment: Comment) => {
    if (comment.status !== "待审核") return;

    setConfirmAction({
      title: "批准评论",
      description: "确定要批准这条评论吗？批准后将对所有用户可见。",
      action: () => {
        const updatedComments = comments.map(c => 
          c.id === comment.id ? { ...c, status: "正常" } : c
        );
        
        setComments(updatedComments);
        setIsConfirmDialogOpen(false);
        
        toast({
          title: "评论已批准",
          description: "评论已成功批准，现在对所有用户可见。"
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  };

  // 删除评论
  const handleDeleteComment = (comment: Comment) => {
    setConfirmAction({
      title: "删除评论",
      description: "确定要删除这条评论吗？此操作无法撤销。",
      action: () => {
        const updatedComments = comments.filter(c => c.id !== comment.id);
        
        setComments(updatedComments);
        setIsConfirmDialogOpen(false);
        
        toast({
          title: "评论已删除",
          description: "评论已成功删除。"
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  };

  // 封禁用户
  const handleBanUser = (comment: Comment) => {
    setConfirmAction({
      title: "封禁用户",
      description: `确定要封禁用户"${comment.user.nickname}"吗？封禁后该用户将无法登录系统，其所有评论将被屏蔽。`,
      action: () => {
        // 在实际应用中，这里应该调用API来封禁用户
        // 这里仅模拟操作
        setIsConfirmDialogOpen(false);
        
        toast({
          title: "用户已封禁",
          description: `用户"${comment.user.nickname}"已成功封禁。`
        });
      }
    });
    
    setIsConfirmDialogOpen(true);
  };

  // 状态颜色映射
  const getStatusColor = (status: string) => {
    switch(status) {
      case "正常": return "bg-green-100 text-green-800 border-green-200";
      case "待审核": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "已屏蔽": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">评论管理</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="搜索评论内容或用户"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select 
                  value={selectedNovel} 
                  onValueChange={setSelectedNovel}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="选择小说" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="所有小说">所有小说</SelectItem>
                    {novels.map(novel => (
                      <SelectItem key={novel} value={novel}>
                        {novel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={selectedStatus} 
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="所有状态">所有状态</SelectItem>
                    <SelectItem value="正常">正常</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                    <SelectItem value="已屏蔽">已屏蔽</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedStatus === "待审核" && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <ThumbsDown className="h-4 w-4 text-yellow-800" />
            <AlertTitle>待审核评论</AlertTitle>
            <AlertDescription>
              有 {comments.filter(c => c.status === "待审核").length} 条评论需要审核。评论通常在含有敏感词、被多次举报或系统自动检测为风险内容时会被标记为待审核状态。
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              评论列表
            </CardTitle>
            <CardDescription>
              共 {filteredComments.length} 条评论
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>评论内容</TableHead>
                    <TableHead>用户</TableHead>
                    <TableHead>小说</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>点赞</TableHead>
                    <TableHead>举报</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                      <TableRow key={comment.id}>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={comment.content}>
                            {comment.content}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.user.avatar} alt={comment.user.nickname} />
                              <AvatarFallback>{comment.user.nickname[0]}</AvatarFallback>
                            </Avatar>
                            <span>{comment.user.nickname}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gray-500" />
                            <div className="truncate max-w-[120px]" title={`${comment.novel.title} - ${comment.novel.chapter}`}>
                              {comment.novel.title}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(comment.status)}
                          >
                            {comment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{comment.likes}</TableCell>
                        <TableCell>
                          {comment.reportCount > 0 ? (
                            <Badge variant="outline" className="bg-red-50 text-red-600">
                              {comment.reportCount}
                            </Badge>
                          ) : (
                            "0"
                          )}
                        </TableCell>
                        <TableCell>{comment.createTime}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewComment(comment)}
                            title="查看详情"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {comment.status === "待审核" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApproveComment(comment)}
                              title="批准评论"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleBlockComment(comment)}
                            title={comment.status === "已屏蔽" ? "取消屏蔽" : "屏蔽评论"}
                          >
                            <Ban className="h-4 w-4 text-yellow-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteComment(comment)}
                            title="删除评论"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        没有找到匹配的评论
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 查看评论详情对话框 */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>评论详情</DialogTitle>
            </DialogHeader>
            {viewingComment && (
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={viewingComment.user.avatar} alt={viewingComment.user.nickname} />
                      <AvatarFallback>{viewingComment.user.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{viewingComment.user.nickname}</div>
                      <div className="text-xs text-gray-500">@{viewingComment.user.username}</div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(viewingComment.status)}
                  >
                    {viewingComment.status}
                  </Badge>
                </div>

                <div className="border rounded-md p-4 bg-gray-50 mb-4">
                  <p className="whitespace-pre-line">{viewingComment.content}</p>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">小说与章节</div>
                  <div className="font-medium">{viewingComment.novel.title} - {viewingComment.novel.chapter}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">点赞数</div>
                    <div className="font-medium">{viewingComment.likes}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">回复数</div>
                    <div className="font-medium">{viewingComment.replyCount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">举报数</div>
                    <div className="font-medium">{viewingComment.reportCount}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">发表时间</div>
                  <div className="font-medium">{viewingComment.createTime}</div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {viewingComment.status === "待审核" && (
                    <Button 
                      variant="outline" 
                      className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        handleApproveComment(viewingComment);
                      }}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      批准评论
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleBlockComment(viewingComment);
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    {viewingComment.status === "已屏蔽" ? "取消屏蔽" : "屏蔽评论"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleDeleteComment(viewingComment);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除评论
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleBanUser(viewingComment);
                    }}
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    封禁用户
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
                variant={confirmAction?.title.includes("删除") || confirmAction?.title.includes("封禁") ? "destructive" : "default"}
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

export default AdminCommentsPage; 