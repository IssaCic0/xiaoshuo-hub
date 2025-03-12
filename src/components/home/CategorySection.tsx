import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Swords, 
  Building, 
  History, 
  Rocket, 
  Heart, 
  Leaf, 
  GraduationCap, 
  Baby
} from "lucide-react";

const categories = [
  {
    id: "fantasy",
    name: "玄幻奇幻",
    icon: <Sparkles size={28} />,
    color: "bg-purple-100 text-purple-600",
    description: "穿越异世界，探索无尽奇幻",
  },
  {
    id: "wuxia",
    name: "武侠仙侠",
    icon: <Swords size={28} />,
    color: "bg-blue-100 text-blue-600",
    description: "剑气纵横，仙道飘渺",
  },
  {
    id: "urban",
    name: "都市言情",
    icon: <Building size={28} />,
    color: "bg-pink-100 text-pink-600",
    description: "都市生活，情感纠葛",
  },
  {
    id: "history",
    name: "历史军事",
    icon: <History size={28} />,
    color: "bg-amber-100 text-amber-600",
    description: "重温历史，感受风云变幻",
  },
  {
    id: "science",
    name: "科幻灵异",
    icon: <Rocket size={28} />,
    color: "bg-cyan-100 text-cyan-600",
    description: "探索未知，揭秘灵异现象",
  },
  {
    id: "romance",
    name: "古代言情",
    icon: <Heart size={28} />,
    color: "bg-red-100 text-red-600",
    description: "穿越古代，邂逅真爱",
  },
  {
    id: "slice",
    name: "轻小说",
    icon: <Leaf size={28} />,
    color: "bg-green-100 text-green-600",
    description: "轻松休闲，青春物语",
  },
  {
    id: "education",
    name: "文学小说",
    icon: <GraduationCap size={28} />,
    color: "bg-indigo-100 text-indigo-600",
    description: "文学经典，人生感悟",
  },
  {
    id: "children",
    name: "少儿读物",
    icon: <Baby size={28} />,
    color: "bg-orange-100 text-orange-600",
    description: "童心童趣，健康成长",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 chinese-header">小说分类</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            多元化的小说分类，总有一类适合您的阅读口味
          </p>
          <div className="h-1 w-24 bg-novel-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`}>
              <Card className="border-gray-200 hover:shadow-lg transition-all hover:scale-105 h-full">
                <CardContent className="p-6 flex items-center">
                  <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
