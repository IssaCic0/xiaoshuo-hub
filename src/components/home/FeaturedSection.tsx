
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NovelCard from './NovelCard';

// Sample data for novels
const featuredNovels = {
  fantasy: [
    {
      id: 1,
      title: "星辰大海",
      author: "青云客",
      cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
      category: "玄幻奇幻",
      description: "在这个星际时代，人类已经拓展至银河系的各个角落。李浩作为一名普通的星际工程师，一次意外的发现让他卷入了一场关乎人类命运的星际风暴...",
      tags: ["星际", "科幻", "冒险"],
      isNew: true,
      isHot: true
    },
    {
      id: 2,
      title: "龙吟九天",
      author: "月下客",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
      category: "玄幻奇幻",
      description: "少年林天从小被遗弃山林，被一位隐世老人收养。在习得一身本领后，他决定下山寻找身世之谜，却无意中卷入了一场轰动修真界的大风波...",
      tags: ["修真", "热血", "机缘"],
      isHot: true
    },
    {
      id: 3,
      title: "九州风云录",
      author: "风清扬",
      cover: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee",
      category: "玄幻奇幻",
      description: "乱世之中，群雄并起。少年张天羽意外获得上古神器，从此踏上强者之路，在这个充满危机与机遇的大陆上，书写自己的传奇...",
      tags: ["争霸", "机智", "成长"],
      isNew: true
    },
    {
      id: 4,
      title: "仙剑奇缘",
      author: "剑舞红尘",
      cover: "https://images.unsplash.com/photo-1641353989082-9b15fa661805",
      category: "玄幻奇幻",
      description: "李逍遥自幼生活在小村庄，天赋异禀却不学无术。一日，村中来了一位神秘的老者，将他引入了修仙之路，也由此揭开了他不平凡的命运...",
      tags: ["修仙", "情缘", "奇遇"]
    }
  ],
  wuxia: [
    {
      id: 5,
      title: "剑归何处",
      author: "沧海一笑",
      cover: "https://images.unsplash.com/photo-1519638399535-1b036603ac77",
      category: "武侠仙侠",
      description: "大侠李寒枫隐退江湖多年，却因一封求助信重出江湖。当年的恩怨情仇再度浮现，这一次他能否了却心中执念，找到剑的归处...",
      tags: ["武侠", "情仇", "江湖"],
      isHot: true
    },
    {
      id: 6,
      title: "天外飞仙",
      author: "云中客",
      cover: "https://images.unsplash.com/photo-1490131784822-b4626a8ec96a",
      category: "武侠仙侠",
      description: "少女柳如烟自小生活在仙门，却因体质特殊无法修炼。一场变故让她坠入凡间，从此踏上不同寻常的修真之路...",
      tags: ["仙侠", "奇遇", "逆袭"],
      isNew: true
    },
    {
      id: 7,
      title: "侠客行",
      author: "白云飞",
      cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      category: "武侠仙侠",
      description: "张无忌误入武林秘境，得到了失传已久的武学秘籍。从此，他在江湖中游走，解决纷争，同时寻找失散多年的亲人...",
      tags: ["功法", "机智", "侠义"]
    },
    {
      id: 8,
      title: "青云志",
      author: "逍遥生",
      cover: "https://images.unsplash.com/photo-1614851099511-773084f6911d",
      category: "武侠仙侠",
      description: "青云门弟子林云因一场意外失去了修炼能力，被逐出师门。在绝境中，他发现了另一条修炼之路，踏上了复仇之旅...",
      tags: ["修真", "复仇", "逆袭"],
      isHot: true
    }
  ],
  urban: [
    {
      id: 9,
      title: "都市之巅",
      author: "商业奇才",
      cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
      category: "都市言情",
      description: "大学毕业生李阳意外继承了一家濒临破产的公司。凭借智慧和毅力，他在商海沉浮中逆风翻盘，同时收获了真挚的爱情...",
      tags: ["创业", "职场", "逆袭"],
      isNew: true
    },
    {
      id: 10,
      title: "豪门第一婚",
      author: "春暖花开",
      cover: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a",
      category: "都市言情",
      description: "林小夏为还医药费被迫与富二代陆远假结婚，谁知这场交易婚姻却渐渐生出真情，而陆远的家族秘密也逐渐浮出水面...",
      tags: ["豪门", "契约", "甜宠"],
      isHot: true
    },
    {
      id: 11,
      title: "霸道总裁爱上我",
      author: "花好月圆",
      cover: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
      category: "都市言情",
      description: "普通白领苏小小因一次误会成为了霸道总裁秦北的私人助理。两人从针锋相对到日久生情，但秦北的家族恩怨却让这段感情充满波折...",
      tags: ["霸总", "职场", "虐恋"]
    },
    {
      id: 12,
      title: "医者无双",
      author: "妙手回春",
      cover: "https://images.unsplash.com/photo-1504813184591-01572f98c85f",
      category: "都市言情",
      description: "张医生拥有超常的医术，却淡泊名利。在一次救人事件后，他被卷入了一场关于医学秘方的争夺战，同时邂逅了美丽的医学研究者李雨...",
      tags: ["医术", "悬疑", "情缘"],
      isNew: true
    }
  ]
};

const FeaturedSection = () => {
  const [activeTab, setActiveTab] = useState("fantasy");

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 chinese-header">精选小说</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            为您精心挑选的各类精彩小说，让您开启一段奇妙的阅读之旅
          </p>
          <div className="h-1 w-24 bg-novel-gold mx-auto mt-4"></div>
        </div>

        <Tabs defaultValue="fantasy" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="fantasy" className="text-base">玄幻奇幻</TabsTrigger>
            <TabsTrigger value="wuxia" className="text-base">武侠仙侠</TabsTrigger>
            <TabsTrigger value="urban" className="text-base">都市言情</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fantasy" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredNovels.fantasy.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="wuxia" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredNovels.wuxia.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="urban" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredNovels.urban.map((novel) => (
                <NovelCard key={novel.id} {...novel} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Link to={`/categories/${activeTab}`} className="chinese-btn-primary inline-block">
            查看更多
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
