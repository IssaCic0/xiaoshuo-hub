
import { useParams } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/components/home/CategorySection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NovelCard from "@/components/home/NovelCard";

// Sample novel data for each category
const sampleNovels = [
  {
    id: 1,
    title: "星辰大海",
    author: "青云客",
    cover: "/placeholder.svg",
    tags: ["热血", "冒险"],
    description: "一个平凡少年的星际冒险，开启了震撼宇宙的传奇之旅",
    rating: 4.8,
    views: 1256789
  },
  {
    id: 2,
    title: "龙吟九天",
    author: "月下客",
    cover: "/placeholder.svg",
    tags: ["玄幻", "修真"],
    description: "修真世界的绝世天才，踏上寻找真相的旅程",
    rating: 4.7,
    views: 987432
  },
  {
    id: 3,
    title: "九州风云录",
    author: "风清扬",
    cover: "/placeholder.svg",
    tags: ["历史", "战争"],
    description: "乱世之中，英雄崛起，谱写一段荡气回肠的历史传奇",
    rating: 4.9,
    views: 876543
  },
  {
    id: 4,
    title: "仙剑奇缘",
    author: "剑舞红尘",
    cover: "/placeholder.svg",
    tags: ["仙侠", "奇幻"],
    description: "踏入仙途，寻找失落的记忆，解开身世之谜",
    rating: 4.6,
    views: 765432
  },
  {
    id: 5,
    title: "剑归何处",
    author: "沧海一笑",
    cover: "/placeholder.svg",
    tags: ["武侠", "江湖"],
    description: "一把神秘古剑，引出江湖恩怨，剑客何去何从",
    rating: 4.5,
    views: 654321
  },
  {
    id: 6,
    title: "天外飞仙",
    author: "云中客",
    cover: "/placeholder.svg",
    tags: ["仙侠", "恋爱"],
    description: "仙界遗落凡间的少女，与凡人少年的跨界之恋",
    rating: 4.7,
    views: 543210
  }
];

const CategoriesPage = () => {
  const { categoryId } = useParams();
  
  // Find the selected category or default to showing all categories
  const selectedCategory = categoryId 
    ? categories.find(cat => cat.id === categoryId) 
    : null;

  return (
    <MainLayout>
      <div className="container mx-auto py-12">
        {!selectedCategory ? (
          // Display all categories if no specific category is selected
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 chinese-header">小说分类</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                浏览我们丰富多彩的小说分类，找到您喜爱的作品
              </p>
              <div className="h-1 w-24 bg-novel-gold mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Card key={category.id} className="border-gray-200 hover:shadow-lg transition-all hover:scale-105 h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Display novels for the selected category
          <>
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-12 h-12 rounded-full ${selectedCategory.color} flex items-center justify-center mr-3`}>
                  {selectedCategory.icon}
                </div>
                <h1 className="text-3xl font-bold chinese-header">{selectedCategory.name}</h1>
              </div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto">
                {selectedCategory.description}
              </p>
              <div className="h-1 w-24 bg-novel-gold mx-auto mt-4 mb-8"></div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Badge variant="outline" className="bg-gray-100">全部</Badge>
              <Badge variant="outline" className="bg-gray-100">人气最高</Badge>
              <Badge variant="outline" className="bg-gray-100">最新发布</Badge>
              <Badge variant="outline" className="bg-gray-100">完结作品</Badge>
              <Badge variant="outline" className="bg-gray-100">连载中</Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sampleNovels.map(novel => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
