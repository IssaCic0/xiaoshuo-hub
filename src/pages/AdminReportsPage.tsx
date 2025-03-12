import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// 举报类型
type ReportType = "novel" | "comment" | "user";

// 举报状态
type ReportStatus = "pending" | "processing" | "resolved" | "rejected";

// 举报数据接口
interface Report {
  id: string;
  type: ReportType;
  targetId: string;
  targetContent: string;
  reason: string;
  reporter: {
    id: string;
    username: string;
  };
  reportedUser: {
    id: string;
    username: string;
  };
  status: ReportStatus;
  createTime: string;
  updateTime: string;
}

// 模拟举报数据
const mockReports: Report[] = [
  {
    id: "1",
    type: "novel",
    targetId: "novel-1",
    targetContent: "《斗破苍穹》第一章",
    reason: "内容抄袭",
    reporter: {
      id: "user-1",
      username: "举报者1",
    },
    reportedUser: {
      id: "user-2",
      username: "被举报者1",
    },
    status: "pending",
    createTime: "2024-03-12 10:00:00",
    updateTime: "2024-03-12 10:00:00",
  },
  {
    id: "2",
    type: "comment",
    targetId: "comment-1",
    targetContent: "这本书写得真烂",
    reason: "恶意评论",
    reporter: {
      id: "user-3",
      username: "举报者2",
    },
    reportedUser: {
      id: "user-4",
      username: "被举报者2",
    },
    status: "resolved",
    createTime: "2024-03-11 15:30:00",
    updateTime: "2024-03-12 09:00:00",
  },
];

const AdminReportsPage = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // 获取状态对应的徽章样式
  const getStatusBadge = (status: ReportStatus) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      resolved: "bg-green-100 text-green-800 hover:bg-green-200",
      rejected: "bg-red-100 text-red-800 hover:bg-red-200",
    };
    return styles[status];
  };

  // 获取状态对应的中文名称
  const getStatusText = (status: ReportStatus) => {
    const texts = {
      pending: "待处理",
      processing: "处理中",
      resolved: "已处理",
      rejected: "已驳回",
    };
    return texts[status];
  };

  // 获取举报类型对应的中文名称
  const getTypeText = (type: ReportType) => {
    const texts = {
      novel: "小说",
      comment: "评论",
      user: "用户",
    };
    return texts[type];
  };

  // 处理举报
  const handleProcessReport = (reportId: string, action: "resolve" | "reject") => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          status: action === "resolve" ? "resolved" : "rejected",
          updateTime: new Date().toISOString(),
        };
      }
      return report;
    }));

    toast({
      title: action === "resolve" ? "举报已处理" : "举报已驳回",
      description: `举报ID: ${reportId}`,
    });

    setIsDetailsOpen(false);
  };

  // 筛选举报
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.targetContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">举报管理</h1>
          <p className="text-gray-500 mt-2">处理用户举报的内容</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4 items-center">
              <Input
                placeholder="搜索举报内容、原因或用户"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择举报类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="novel">小说</SelectItem>
                  <SelectItem value="comment">评论</SelectItem>
                  <SelectItem value="user">用户</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择处理状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="resolved">已处理</SelectItem>
                  <SelectItem value="rejected">已驳回</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>举报列表</CardTitle>
            <CardDescription>
              共 {filteredReports.length} 条举报
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>举报内容</TableHead>
                  <TableHead>举报原因</TableHead>
                  <TableHead>举报人</TableHead>
                  <TableHead>被举报人</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>举报时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>{getTypeText(report.type)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {report.targetContent}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {report.reason}
                    </TableCell>
                    <TableCell>{report.reporter.username}</TableCell>
                    <TableCell>{report.reportedUser.username}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.createTime}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReport(report);
                          setIsDetailsOpen(true);
                        }}
                      >
                        查看详情
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>举报详情</DialogTitle>
              <DialogDescription>
                查看举报详细信息并进行处理
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">举报ID</p>
                    <p>{selectedReport.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">举报类型</p>
                    <p>{getTypeText(selectedReport.type)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">举报人</p>
                    <p>{selectedReport.reporter.username}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">被举报人</p>
                    <p>{selectedReport.reportedUser.username}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">举报内容</p>
                    <p className="whitespace-pre-wrap">{selectedReport.targetContent}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">举报原因</p>
                    <p className="whitespace-pre-wrap">{selectedReport.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">举报时间</p>
                    <p>{selectedReport.createTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">最后更新</p>
                    <p>{selectedReport.updateTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">当前状态</p>
                    <Badge className={getStatusBadge(selectedReport.status)}>
                      {getStatusText(selectedReport.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() => handleProcessReport(selectedReport!.id, "reject")}
                disabled={selectedReport?.status === "resolved" || selectedReport?.status === "rejected"}
              >
                驳回举报
              </Button>
              <Button
                onClick={() => handleProcessReport(selectedReport!.id, "resolve")}
                disabled={selectedReport?.status === "resolved" || selectedReport?.status === "rejected"}
              >
                处理举报
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminReportsPage; 