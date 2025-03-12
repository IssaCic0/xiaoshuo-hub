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
import { Ban, BookOpen, Check, Eye, Flag, MessageSquare, Search, Shield, Trash2, User } from "lucide-react";
import { useToast } from "@/components/ui/toaster";

// 模拟举报数据
const mockReports = [
  {
    id: 1,
    type: "评论",
    reason: "垃圾广告",
    content: "这个网站真好用，我要去推荐给我的朋友们，大家都来看小说！http://spam-website.com",
    reporter: {
      id: 2,
      username: "li_si",
      nickname: "李四",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    },
    target: {
      id: 5,
      type: "评论",
      user: {
        id: 5,
        username: "qian_qi",
        nickname: "钱七",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
      }
    },
    status: "待处理",
    createTime: "2024-03-15 13:20"
  },
  {
    id: 2,
    type: "小说",
    reason: "内容低俗",
    content: "这本小说含有大量不适宜青少年阅读的低俗内容，建议加强审核或下架",
    reporter: {
      id: 3,
      username: "wang_wu",
      nickname: "王五",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12"
    },
    target: {
      id: 6,
      type: "小说",
      title: "王者归来"
    },
    status: "待处理",
    createTime: "2024-03-14 18:45"
  },
  {
    id: 3,
    type: "评论",
    reason: "人身攻击",
    content: "该评论对作者进行了严重的人身攻击，语言恶劣，影响社区氛围",
    reporter: {
      id: 6,
      username: "sun_ba",
      nickname: "孙八",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    target: {
      id: 8,
      type: "评论",
      user: {
        id: 8,
        username: "wu_shi",
        nickname: "吴十",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
      }
    },
    status: "已处理",
    createTime: "2024-03-13 10:30",
    processingTime: "2024-03-13 14:15",
    processingResult: "已屏蔽评论并警告用户"
  },
  {
    id: 4,
    type: "用户",
    reason: "冒充他人",
    content: "该用户使用与官方相似的名称和头像，冒充平台客服欺骗其他用户",
    reporter: {
      id: 4,
      username: "zhao_liu",
      nickname: "赵六",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    target: {
      id: 10,
      type: "用户",
      user: {
        id: 10,
        username: "fake_admin",
        nickname: "系统管理员(官方)",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
      }
    },
    status: "待处理",
    createTime: "2024-03-12 20:18"
  },
  {
    id: 5,
    type: "小说",
    reason: "盗版内容",
    content: "该小说是从其他网站盗版而来，侵犯了原作者的版权",
    reporter: {
      id: 7,
      username: "zhou_jiu",
      nickname: "周九",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    },
    target: {
      id: 4,
      type: "小说",
      title: "异界征途"
    },
    status: "已拒绝",
    createTime: "2024-03-11 09:45",
    processingTime: "2024-03-11 15:20",
    processingResult: "经核实，该小说为作者原创，非盗版内容"
  },
  {
    id: 6,
    type: "评论",
    reason: "政治敏感",
    content: "该评论含有政治敏感内容，可能引起争议",
    reporter: {
      id: 1,
      username: "zhang_san",
      nickname: "张三",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    target: {
      id: 11,
      type: "评论",
      user: {
        id: 11,
        username: "political_user",
        nickname: "政治爱好者",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
      }
    },
    status: "已处理",
    createTime: "2024-03-10 14:25",
    processingTime: "2024-03-10 16:40",
    processingResult: "已删除评论并警告用户"
  },
  {
    id: 7,
    type: "用户",
    reason: "发布垃圾信息",
    content: "该用户大量发布无关内容的广告信息，干扰正常阅读体验",
    reporter: {
      id: 5,
      username: "qian_qi",
      nickname: "钱七",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    target: {
      id: 12,
      type: "用户",
      user: {
        id: 12,
        username: "spammer_123",
        nickname: "好物分享君",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      }
    },
    status: "已处理",
    createTime: "2024-03-09 08:10",
    processingTime: "2024-03-09 10:30",
    processingResult: "已禁用用户"
  }
];

interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
}

interface Target {
  id: number;
  type: "评论" | "小说" | "用户";
  user?: User;
  title?: string;
}

interface Report {
  id: number;
  type: "评论" | "小说" | "用户";
  reason: string;
  content: string;
  reporter: User;
  target: Target;
  status: "待处理" | "已处理" | "已拒绝";
  createTime: string;
  processingTime?: string;
  processingResult?: string;
}

const AdminReportsPage = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("全部类型");
  const [selectedStatus, setSelectedStatus] = useState("全部状态");
  const [viewingReport, setViewingReport] = useState<Report | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [processingResult, setProcessingResult] = useState("");
  const [actionType, setActionType] = useState<"处理" | "拒绝">("处理");

  // 过滤举报
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.reporter.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (report.target.type === "小说" && report.target.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (report.target.type !== "小说" && report.target.user?.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "全部类型" || report.type === selectedType;
    const matchesStatus = selectedStatus === "全部状态" || report.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // 查看举报详情
  const handleViewReport = (report: Report) => {
    setViewingReport(report);
    setIsViewDialogOpen(true);
  };

  // 打开处理举报对话框
  const handleOpenActionDialog = (report: Report, type: "处理" | "拒绝") => {
    setViewingReport(report);
    setActionType(type);
    setProcessingResult(type === "处理" ? "已审核并" : "");
    setIsActionDialogOpen(true);
  };

  // 处理举报
  const handleProcessReport = () => {
    if (!viewingReport || !processingResult) {
      toast({
        title: "操作失败",
        description: "请填写处理结果",
        variant: "destructive"
      });
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 10) + " " + 
                        new Date().toTimeString().slice(0, 5);
    
    const updatedReports = reports.map(report => 
      report.id === viewingReport.id 
        ? { 
            ...report, 
            status: actionType === "处理" ? "已处理" : "已拒绝", 
            processingTime: currentDate,
            processingResult: processingResult
          } 
        : report
    );
    
    setReports(updatedReports);
    setIsActionDialogOpen(false);
    
    toast({
      title: actionType === "处理" ? "举报已处理" : "举报已拒绝",
      description: `举报ID ${viewingReport.id} 已成功${actionType === "处理" ? "处理" : "拒绝"}。`
    });
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch(status) {
      case "待处理": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "已处理": return "bg-green-100 text-green-800 border-green-200";
      case "已拒绝": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch(type) {
      case "评论": return <MessageSquare className="h-4 w-4" />;
      case "小说": return <BookOpen className="h-4 w-4" />;
      case "用户": return <User className="h-4 w-4" />;
      default: return <Flag className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">举报管理</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="搜索举报内容、用户或小说"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select 
                  value={selectedType} 
                  onValueChange={setSelectedType}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部类型">全部类型</SelectItem>
                    <SelectItem value="评论">评论</SelectItem>
                    <SelectItem value="小说">小说</SelectItem>
                    <SelectItem value="用户">用户</SelectItem>
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
                    <SelectItem value="全部状态">全部状态</SelectItem>
                    <SelectItem value="待处理">待处理</SelectItem>
                    <SelectItem value="已处理">已处理</SelectItem>
                    <SelectItem value="已拒绝">已拒绝</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedStatus === "待处理" && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <Flag className="h-4 w-4 text-yellow-800" />
            <AlertTitle>待处理举报</AlertTitle>
            <AlertDescription>
              有 {reports.filter(r => r.status === "待处理").length} 条举报需要处理。
              请及时审核并采取相应措施，以维护社区环境。
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Flag className="mr-2 h-5 w-5" />
              举报列表
            </CardTitle>
            <CardDescription>
              共 {filteredReports.length} 条举报
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>举报原因</TableHead>
                    <TableHead>举报人</TableHead>
                    <TableHead>被举报对象</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>举报时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(report.type)}
                            <span>{report.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={report.reporter.avatar} alt={report.reporter.nickname} />
                              <AvatarFallback>{report.reporter.nickname[0]}</AvatarFallback>
                            </Avatar>
                            <span>{report.reporter.nickname}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {report.target.type === "小说" ? (
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-gray-500" />
                              <span>{report.target.title}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={report.target.user?.avatar} alt={report.target.user?.nickname} />
                                <AvatarFallback>{report.target.user?.nickname?.[0]}</AvatarFallback>
                              </Avatar>
                              <span>{report.target.user?.nickname}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(report.status)}
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.createTime}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewReport(report)}
                            title="查看详情"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {report.status === "待处理" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenActionDialog(report, "处理")}
                                title="处理举报"
                              >
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenActionDialog(report, "拒绝")}
                                title="拒绝举报"
                              >
                                <Ban className="h-4 w-4 text-red-600" />
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        没有找到匹配的举报
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 查看举报详情对话框 */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>举报详情</DialogTitle>
            </DialogHeader>
            {viewingReport && (
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(viewingReport.type)}
                    <div className="font-medium">{viewingReport.type}举报 #{viewingReport.id}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(viewingReport.status)}
                  >
                    {viewingReport.status}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">举报原因</div>
                  <div className="font-medium">{viewingReport.reason}</div>
                </div>

                <div className="border rounded-md p-4 bg-gray-50 mb-4">
                  <div className="text-sm text-gray-500 mb-1">举报内容</div>
                  <p className="whitespace-pre-line">{viewingReport.content}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">举报人</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={viewingReport.reporter.avatar} alt={viewingReport.reporter.nickname} />
                        <AvatarFallback>{viewingReport.reporter.nickname[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{viewingReport.reporter.nickname}</div>
                        <div className="text-xs text-gray-500">@{viewingReport.reporter.username}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">被举报对象</div>
                    {viewingReport.target.type === "小说" ? (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-500" />
                        <div className="font-medium">{viewingReport.target.title}</div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={viewingReport.target.user?.avatar} alt={viewingReport.target.user?.nickname} />
                          <AvatarFallback>{viewingReport.target.user?.nickname?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{viewingReport.target.user?.nickname}</div>
                          <div className="text-xs text-gray-500">@{viewingReport.target.user?.username}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">举报时间</div>
                    <div className="font-medium">{viewingReport.createTime}</div>
                  </div>
                  {viewingReport.status !== "待处理" && (
                    <div>
                      <div className="text-sm text-gray-500 mb-1">处理时间</div>
                      <div className="font-medium">{viewingReport.processingTime}</div>
                    </div>
                  )}
                </div>

                {viewingReport.status !== "待处理" && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">处理结果</div>
                    <div className="font-medium">{viewingReport.processingResult}</div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {viewingReport.status === "待处理" && (
                    <>
                      <Button 
                        onClick={() => {
                          setIsViewDialogOpen(false);
                          handleOpenActionDialog(viewingReport, "处理");
                        }}
                        className="flex-1"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        处理举报
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsViewDialogOpen(false);
                          handleOpenActionDialog(viewingReport, "拒绝");
                        }}
                        className="flex-1"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        拒绝举报
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* 处理举报对话框 */}
        <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {actionType === "处理" ? "处理举报" : "拒绝举报"}
              </DialogTitle>
              <DialogDescription>
                {actionType === "处理" 
                  ? "请填写处理结果，如已删除评论、已禁用用户等" 
                  : "请填写拒绝原因，如举报内容不实、不违反规定等"}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {viewingReport && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(viewingReport.type)}
                    <div className="font-medium">
                      {viewingReport.type === "小说" 
                        ? `《${viewingReport.target.title}》` 
                        : `${viewingReport.target.user?.nickname}`}
                      被举报为：{viewingReport.reason}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded border">
                    {viewingReport.content}
                  </p>
                </div>
              )}
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {actionType === "处理" ? "处理结果" : "拒绝原因"}
                  </label>
                  <Input
                    value={processingResult}
                    onChange={(e) => setProcessingResult(e.target.value)}
                    placeholder={actionType === "处理" 
                      ? "例如：已删除评论并警告用户" 
                      : "例如：经核实，不违反社区规定"
                    }
                  />
                </div>
                {actionType === "处理" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {viewingReport?.target.type === "评论" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => 
                          setProcessingResult("已删除评论")
                        }>
                          <Trash2 className="mr-1 h-3 w-3" />
                          删除评论
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => 
                          setProcessingResult("已屏蔽评论")
                        }>
                          <Ban className="mr-1 h-3 w-3" />
                          屏蔽评论
                        </Button>
                      </>
                    )}
                    {viewingReport?.target.type === "小说" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => 
                          setProcessingResult("已下架小说")
                        }>
                          <Ban className="mr-1 h-3 w-3" />
                          下架小说
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => 
                          setProcessingResult("已修改小说")
                        }>
                          <Check className="mr-1 h-3 w-3" />
                          修改小说
                        </Button>
                      </>
                    )}
                    {viewingReport?.target.type !== "小说" && (
                      <Button variant="outline" size="sm" onClick={() => 
                        setProcessingResult(viewingReport?.target.type === "用户" 
                          ? "已禁用用户" 
                          : "已封禁用户")
                      }>
                        <Shield className="mr-1 h-3 w-3" />
                        {viewingReport?.target.type === "用户" ? "禁用用户" : "封禁用户"}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => 
                      setProcessingResult("已警告用户")
                    }>
                      <Flag className="mr-1 h-3 w-3" />
                      警告用户
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleProcessReport}>
                {actionType === "处理" ? "确认处理" : "确认拒绝"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminReportsPage; 