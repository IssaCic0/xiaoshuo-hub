
import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Heart, Star, Calendar, FlameKindling } from "lucide-react";
import { Link } from 'react-router-dom';

// Sample ranking data
const rankingCategories = [
  {
    id: "popularity",
    name: "人气榜",
    icon: <Heart className="text-novel-red" />
  },
  {
    id: "trending",
    name: "飙升榜",
    icon: <TrendingUp className="text-novel-gold" />
  },
  {
    id: "completed",
    name: "完结榜",
    icon: <Star className="text-novel-deepBlue" />
  },
  {
    id: "monthly",
    name: "月榜",
    icon: <Calendar className="text-green-600" />
  },
  {
    id: "recommended",
    name: "推荐榜",
    icon: <FlameKindling className="text-orange-500" />
  }
];

// Sample ranking novels
const rankingNovels = [
  {
    id: 1,
    title: "星辰大海",
    author: "青云客",
    cover: "/placeholder.svg",
    category: "科幻灵异",
    views: "1,256,789",
    trending: "+12%",
    rating: 4.8
  },
  {
    id: 2,
    title: "龙吟九天",
    author: "月下客",
    cover: "/placeholder.svg",
    category: "玄幻奇幻",
    views: "1,156,432",
    trending: "+8%",
    rating: 4.7
  },
  {
    id: 3,
    title: "九州风云录",
    author: "风清扬",
    cover: "/placeholder.svg",
    category: "历史军事",
    views: "987,543",
    trending: "+5%",
    rating: 4.6
  },
  {
    id: 4,
    title: "仙剑奇缘",
    author: "剑舞红尘",
    cover: "/placeholder.svg",
    category: "武侠仙侠",
    views: "876,543",
    trending: "+15%",
    rating: 4.9
  },
  {
    id: 5,
    title: "剑归何处",
    author: "沧海一笑",
    cover: "/placeholder.svg",
    category: "武侠仙侠",
    views: "865,432",
    trending: "+3%",
    rating: 4.5
  },
  {
    id: 6,
    title: "天外飞仙",
    author: "云中客",
    cover: "/placeholder.svg",
    category: "武侠仙侠",
    views: "854,321",
    trending: "+7%",
    rating: 4.8
  },
  {
    id: 7,
    title: "侠客行",
    author: "白云飞",
    cover: "/placeholder.svg",
    category: "武侠仙侠",
    views: "843,210",
    trending: "+9%",
    rating: 4.6
  },
  {
    id: 8,
    title: "青云志",
    author: "逍遥生",
    cover: "/placeholder.svg",
    category: "玄幻奇幻",
    views: "832,109",
    trending: "+4%",
    rating: 4.7
  },
  {
    id: 9,
    title: "都市之巅",
    author: "商业奇才",
    cover: "/placeholder.svg",
    category: "都市言情",
    views: "821,098",
    trending: "+11%",
    rating: 4.5
  },
  {
    id: 10,
    title: "豪门第一婚",
    author: "春暖花开",
    cover: "/placeholder.svg",
    category: "都市言情",
    views: "810,987",
    trending: "+6%",
    rating: 4.8
  }
];

// Time period filters
const timePeriods = [
  { id: "day", name: "24小时" },
  { id: "week", name: "本周" },
  { id: "month", name: "本月" },
  { id: "year", name: "年度" },
  { id: "all", name: "总榜" }
];

const RankingPage = () => {
  const [activeTab, setActiveTab] = useState("popularity");
  const [timePeriod, setTimePeriod] = useState("week");

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Trophy className="text-novel-gold mr-2" size={32} />
            <span className="chinese-header">热门榜单</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            发现最受欢迎的小说作品，跟随读者的选择
          </p>
          <div className="h-1 w-24 bg-novel-gold mx-auto mt-4"></div>
        </div>

        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-center mb-6">
              {rankingCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                  {category.icon}
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {rankingCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="pt-4">
                <div className="flex justify-center mb-6 flex-wrap gap-2">
                  {timePeriods.map(period => (
                    <Badge 
                      key={period.id}
                      variant={timePeriod === period.id ? "default" : "outline"}
                      className={`cursor-pointer ${timePeriod === period.id ? 'bg-novel-red' : ''}`}
                      onClick={() => setTimePeriod(period.id)}
                    >
                      {period.name}
                    </Badge>
                  ))}
                </div>

                <Card>
                  <CardContent className="p-6">
                    <ul className="divide-y">
                      {rankingNovels.map((novel, index) => (
                        <li key={novel.id} className="py-4 first:pt-0 last:pb-0">
                          <Link to={`/novel/${novel.id}`} className="flex items-center gap-4 group">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                              <span className={`font-bold text-lg ${
                                index < 3 
                                  ? 'text-novel-gold' 
                                  : 'text-gray-400'
                              }`}>
                                {index + 1}
                              </span>
                            </div>
                            <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-md">
                              <img 
                                src={novel.cover} 
                                alt={novel.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-bold text-lg group-hover:text-novel-red transition-colors">
                                {novel.title}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <span>{novel.author}</span>
                                <span className="mx-2">|</span>
                                <span>{novel.category}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-gray-600">{novel.views} 阅读</div>
                              <div className="text-green-500">{novel.trending}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default RankingPage;
