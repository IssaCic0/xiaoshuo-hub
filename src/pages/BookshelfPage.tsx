import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Sample bookshelf data
const bookshelfItems = [
  {
    id: 1,
    title: "星辰大海",
    author: "青云客",
    cover: "/placeholder.svg",
    lastRead: "第二十八章 星际风暴",
    progress: 28,
    totalChapters: 352,
    lastReadTime: "今天 14:30"
  },
  {
    id: 2,
    title: "龙吟九天",
    author: "月下客",
    cover: "/placeholder.svg",
    lastRead: "第一百零五章 九天神龙",
    progress: 105,
    totalChapters: 420,
    lastReadTime: "昨天 20:15"
  },
  {
    id: 3,
    title: "九州风云录",
    author: "风清扬",
    cover: "/placeholder.svg",
    lastRead: "第七十三章 群雄逐鹿",
    progress: 73,
    totalChapters: 298,
    lastReadTime: "2天前"
  },
  {
    id: 4,
    title: "仙剑奇缘",
    author: "剑舞红尘",
    cover: "/placeholder.svg",
    lastRead: "第五章 初入仙门",
    progress: 5,
    totalChapters: 180,
    lastReadTime: "1周前"
  }
];

// Sample favorites data
const favoriteItems = [
  {
    id: 5,
    title: "剑归何处",
    author: "沧海一笑",
    cover: "/placeholder.svg",
    description: "一把神秘古剑，引出江湖恩怨，剑客何去何从",
    tags: ["武侠", "江湖"],
    addedTime: "2023-05-10"
  },
  {
    id: 6,
    title: "天外飞仙",
    author: "云中客",
    cover: "/placeholder.svg",
    description: "仙界遗落凡间的少女，与凡人少年的跨界之恋",
    tags: ["仙侠", "恋爱"],
    addedTime: "2023-06-15"
  },
  {
    id: 7,
    title: "侠客行",
    author: "白云飞",
    cover: "/placeholder.svg",
    description: "大侠游历江湖，惩恶扬善，探寻武学真谛",
    tags: ["武侠", "冒险"],
    addedTime: "2023-07-22"
  }
];

// Sample history data
const historyItems = [
  {
    id: 1,
    title: "星辰大海",
    author: "青云客",
    cover: "/placeholder.svg",
    lastRead: "第二十八章 星际风暴",
    readTime: "今天 14:30"
  },
  {
    id: 8,
    title: "青云志",
    author: "逍遥生",
    cover: "/placeholder.svg",
    lastRead: "第一章 山村少年",
    readTime: "今天 10:15"
  },
  {
    id: 2,
    title: "龙吟九天",
    author: "月下客",
    cover: "/placeholder.svg",
    lastRead: "第一百零五章 九天神龙",
    readTime: "昨天 20:15"
  },
  {
    id: 9,
    title: "都市之巅",
    author: "商业奇才",
    cover: "/placeholder.svg",
    lastRead: "第十章 商业谈判",
    readTime: "昨天 18:45"
  },
  {
    id: 3,
    title: "九州风云录",
    author: "风清扬",
    cover: "/placeholder.svg",
    lastRead: "第七十三章 群雄逐鹿",
    readTime: "2天前"
  }
];

const BookshelfPage = () => {
  const [activeTab, setActiveTab] = useState("reading");
  const { toast } = useToast();

  const handleContinueReading = (book: typeof bookshelfItems[0]) => {
    toast({
      title: "继续阅读",
      description: `开始阅读《${book.title}》: ${book.lastRead}`,
    });
  };

  const handleRemoveBook = (bookId: number) => {
    toast({
      title: "移除成功",
      description: "已从书架中移除作品",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <BookOpen className="text-novel-red mr-2" size={32} />
            <span className="chinese-header">我的书架</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            管理您的阅读列表，继续享受阅读乐趣
          </p>
          <div className="h-1 w-24 bg-novel-gold mx-auto mt-4"></div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-center mb-8">
            <TabsTrigger value="reading" className="flex items-center gap-1">
              <BookOpen size={18} />
              <span>在读作品</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <Star size={18} />
              <span>收藏作品</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock size={18} />
              <span>阅读历史</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading">
            {bookshelfItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookshelfItems.map(book => (
                  <Card key={book.id} className="border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={book.cover} 
                            alt={book.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <Link to={`/novel/${book.id}`}>
                            <h3 className="font-bold text-lg hover:text-novel-red transition-colors">
                              {book.title}
                            </h3>
                          </Link>
                          <p className="text-gray-500 text-sm mb-2">
                            {book.author}
                          </p>
                          <p className="text-sm mb-1">
                            <span className="text-novel-red">最近阅读：</span> {book.lastRead}
                          </p>
                          <p className="text-sm mb-2">
                            <span className="text-novel-red">阅读进度：</span> {Math.round((book.progress / book.totalChapters) * 100)}% ({book.progress}/{book.totalChapters}章)
                          </p>
                          <p className="text-gray-500 text-xs mb-3">
                            {book.lastReadTime}
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-novel-red hover:bg-novel-red/90"
                              onClick={() => handleContinueReading(book)}
                            >
                              继续阅读
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoveBook(book.id)}
                            >
                              移除
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">书架空空如也</h3>
                <p className="text-gray-500 mb-4">您尚未添加任何阅读中的作品</p>
                <Link to="/categories">
                  <Button className="bg-novel-red hover:bg-novel-red/90">
                    浏览小说
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteItems.map(book => (
                  <Card key={book.id} className="border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="w-full h-40 overflow-hidden rounded-md">
                          <img 
                            src={book.cover} 
                            alt={book.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link to={`/novel/${book.id}`}>
                            <h3 className="font-bold text-lg hover:text-novel-red transition-colors">
                              {book.title}
                            </h3>
                          </Link>
                          <p className="text-gray-500 text-sm mb-2">
                            {book.author}
                          </p>
                          <p className="text-sm mb-2 line-clamp-2">
                            {book.description}
                          </p>
                          <div className="flex gap-1 mb-3">
                            {book.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="bg-gray-50">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-gray-500 text-xs mb-3">
                            收藏于: {book.addedTime}
                          </p>
                          <div className="flex gap-2">
                            <Button 
                              variant="default" 
                              size="sm" 
                              className="bg-novel-red hover:bg-novel-red/90"
                            >
                              开始阅读
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoveBook(book.id)}
                            >
                              取消收藏
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">暂无收藏作品</h3>
                <p className="text-gray-500 mb-4">您尚未收藏任何小说作品</p>
                <Link to="/categories">
                  <Button className="bg-novel-red hover:bg-novel-red/90">
                    浏览小说
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {historyItems.length > 0 ? (
              <Card>
                <CardContent className="p-6">
                  <ul className="divide-y">
                    {historyItems.map((item) => (
                      <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                        <Link to={`/novel/${item.id}`} className="flex items-center gap-4 group">
                          <div className="w-14 h-20 flex-shrink-0 overflow-hidden rounded-md">
                            <img 
                              src={item.cover} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg group-hover:text-novel-red transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                              {item.author}
                            </p>
                            <p className="text-sm text-novel-red">
                              {item.lastRead}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Eye size={14} className="mr-1" />
                              <span>{item.readTime}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-novel-red hover:bg-red-50"
                              onClick={() => handleRemoveBook(item.id)}
                            >
                              删除
                            </Button>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "清除成功",
                          description: "已清除所有阅读历史",
                        });
                      }}
                    >
                      清除全部历史
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">暂无阅读历史</h3>
                <p className="text-gray-500 mb-4">您尚未阅读任何小说</p>
                <Link to="/categories">
                  <Button className="bg-novel-red hover:bg-novel-red/90">
                    浏览小说
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BookshelfPage;
