
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, TrendingUp, Heart, Star } from "lucide-react";

// Sample ranking data
const rankings = [
  {
    id: 1,
    title: "人气榜",
    icon: <Heart className="text-novel-red" size={24} />,
    novels: [
      { id: 5, title: "剑归何处", author: "沧海一笑", views: "1,289,543" },
      { id: 1, title: "星辰大海", author: "青云客", views: "1,156,230" },
      { id: 10, title: "豪门第一婚", author: "春暖花开", views: "1,045,678" },
      { id: 2, title: "龙吟九天", author: "月下客", views: "987,432" },
      { id: 8, title: "青云志", author: "逍遥生", views: "876,345" },
    ]
  },
  {
    id: 2,
    title: "新书榜",
    icon: <TrendingUp className="text-novel-gold" size={24} />,
    novels: [
      { id: 9, title: "都市之巅", author: "商业奇才", views: "345,123" },
      { id: 6, title: "天外飞仙", author: "云中客", views: "321,456" },
      { id: 3, title: "九州风云录", author: "风清扬", views: "298,765" },
      { id: 12, title: "医者无双", author: "妙手回春", views: "276,543" },
      { id: 1, title: "星辰大海", author: "青云客", views: "256,789" },
    ]
  },
  {
    id: 3,
    title: "完结榜",
    icon: <Star className="text-novel-deepBlue" size={24} />,
    novels: [
      { id: 11, title: "霸道总裁爱上我", author: "花好月圆", views: "2,453,123" },
      { id: 7, title: "侠客行", author: "白云飞", views: "2,341,678" },
      { id: 4, title: "仙剑奇缘", author: "剑舞红尘", views: "2,156,789" },
      { id: 10, title: "豪门第一婚", author: "春暖花开", views: "1,987,654" },
      { id: 5, title: "剑归何处", author: "沧海一笑", views: "1,876,543" },
    ]
  }
];

const RankingSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Trophy className="text-novel-gold mr-2" size={28} />
            <span className="chinese-header">热门榜单</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            最受读者喜爱的小说作品，每周更新
          </p>
          <div className="h-1 w-24 bg-novel-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rankings.map((ranking) => (
            <Card key={ranking.id} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {ranking.icon}
                  <h3 className="text-xl font-bold ml-2">{ranking.title}</h3>
                </div>
                
                <ul className="space-y-4">
                  {ranking.novels.map((novel, index) => (
                    <li key={novel.id} className="group">
                      <Link to={`/novel/${novel.id}`} className="flex items-start">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full mr-3 flex-shrink-0">
                          <span className={`text-sm font-bold ${
                            index < 3 
                              ? 'text-white bg-novel-red rounded-full w-6 h-6 flex items-center justify-center' 
                              : 'text-gray-500'
                          }`}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium group-hover:text-novel-red transition-colors truncate">
                            {novel.title}
                          </h4>
                          <p className="text-gray-500 text-sm">
                            {novel.author} · {novel.views} 阅读
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 text-right">
                  <Link to="/ranking" className="text-novel-red hover:text-novel-red/80 text-sm font-medium">
                    查看完整榜单 →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RankingSection;
