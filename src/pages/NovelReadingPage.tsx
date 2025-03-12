
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, BookOpen, Settings } from 'lucide-react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Sample chapters data - in a real app this would come from an API
const chapters = [
  {
    id: 1,
    title: "第一章 初入江湖",
    content: `
      <p>清晨，薄雾笼罩着青云山。十六岁的林逍遥站在山顶，俯瞰着脚下的云海。今天是他下山的日子，也是他踏入江湖的开始。</p>
      <p>师父站在他身后，脸上带着欣慰的笑容。"逍遥，十年修行，你已经学会了我能教你的所有武功。江湖险恶，记住我的话：刀剑无情，人心有情；武功再高，也怕菜刀。"</p>
      <p>林逍遥恭敬地鞠了一躬，"师父的教诲，弟子铭记在心。"</p>
      <p>师父递给他一把长剑，"此剑名为'青云'，陪伴我数十年，今日传给你。它不仅是一把武器，更是你的伙伴。"</p>
      <p>林逍遥接过长剑，感受着剑身传来的淡淡温度。他知道，这把剑承载着师父的期望和信任。</p>
      <p>"去吧，去看看那个多姿多彩的世界。记住，无论遇到什么困难，青云山永远是你的家。"师父拍了拍他的肩膀。</p>
      <p>林逍遥深吸一口气，向山下走去。他不知道江湖中等待着他的是什么，但他知道，从今天起，他的人生翻开了新的一页。</p>
      <p>下山的路并不好走，但林逍遥的步伐却很坚定。他相信，凭借师父教给他的武功和处世之道，他能在这个陌生的世界找到属于自己的位置。</p>
      <p>当他走到山脚下，回头望了一眼云雾缭绕的青云山，心中默默许下承诺：他一定会成为一个让师父骄傲的人。</p>
      <p>就这样，林逍遥踏上了他的江湖之路，而这只是故事的开始……</p>
    `
  },
  {
    id: 2,
    title: "第二章 初遇风波",
    content: `
      <p>林逍遥走在去往镇子的小路上，四周的景色与山上截然不同。路边的农田里，农民们正在忙碌地劳作，空气中弥漫着泥土的芬芳。</p>
      <p>这是他十年来第一次接触外面的世界，一切都让他感到新奇。</p>
      <p>走了大约两个时辰，他远远地看到了一座小镇。"应该就是师父说的青阳镇了。"林逍遥加快了脚步。</p>
      <p>刚进镇子，他就被热闹的集市所吸引。各种吆喝声此起彼伏，摊位上摆满了他叫不上名字的物品。正当他好奇地东张西望时，一阵急促的脚步声从身后传来。</p>
      <p>"站住！抓小偷！"几个衙役模样的人追赶着一个衣衫褴褛的少年。</p>
      <p>那少年慌不择路，一头撞在林逍遥身上，手中的几个馒头散落在地。"对...对不起..."少年惊恐地说，然后迅速捡起馒头，准备继续逃跑。</p>
      <p>"抓住他！"衙役们已经跑到近前。</p>
      <p>林逍遥看了看面前饥饿的少年，心中一动。他拦在少年前面，从腰间掏出两枚银币，递给为首的衙役。"这位大人，这是我弟弟，他饿了才偷东西。这些钱应该足够赔偿了吧？"</p>
      <p>衙役看了看银币，又看了看林逍遥腰间的宝剑，态度立刻软化下来。"原来是误会一场。既然赔偿了，这事就算了。不过下次可不能再这样了。"</p>
      <p>衙役们离开后，少年感激地看着林逍遥。"谢谢你救了我。我叫阿志，你呢？"</p>
      <p>"我叫林逍遥，刚从山上下来。"林逍遥友好地说。</p>
      <p>阿志惊讶地看着他，"你是从青云山上下来的？那你一定会武功了！"</p>
      <p>林逍遥谦虚地笑了笑，"学了一些皮毛而已。"</p>
      <p>"太厉害了！"阿志兴奋地说，"你要去哪里？我可以带你在镇上转转，作为你救我的报答。"</p>
      <p>林逍遥想了想，点头同意。他需要一个向导来熟悉这个陌生的地方。</p>
      <p>就这样，林逍遥在青阳镇有了第一个朋友。他不知道的是，这个看似简单的相遇，将会引发一系列意想不到的事件……</p>
    `
  },
  {
    id: 3,
    title: "第三章 客栈风波",
    content: `
      <p>夜幕降临，阿志带着林逍遥来到镇上最大的客栈——青阳客栈。</p>
      <p>"这里的饭菜是全镇最好的，"阿志笑着说，"虽然我很少有机会进来。"</p>
      <p>林逍遥掏出银两，"今天我请客，算是谢谢你一天的带路。"</p>
      <p>客栈内人声鼎沸，大堂里几乎坐满了客人。他们找了个角落的位置坐下，点了几个招牌菜。</p>
      <p>就在他们等待上菜的时候，客栈大门被猛地推开，几个身穿黑衣的大汉走了进来，为首的是一个身材魁梧、面带刀疤的男子。</p>
      <p>整个客栈瞬间安静下来，食客们纷纷低头，不敢与这些人对视。</p>
      <p>阿志的脸色变了，"是黑风寨的人，"他压低声音对林逍遥说，"他们是这一带最凶的山贼，每个月都来镇上收'保护费'。"</p>
      <p>刀疤男大摇大摆地走到柜台前，狠狠拍了一下桌子，"老板，保护费的时间到了！"</p>
      <p>客栈老板满脸陪笑，"黑爷，小的已经准备好了。"说着，从柜台下取出一个钱袋，双手恭敬地递上。</p>
      <p>刀疤男打开钱袋数了数，脸色一沉，"少了一半！老板，你是不是不把我黑风寨放在眼里？"</p>
      <p>"黑爷明鉴，小店这个月生意实在不好，实在是凑不齐啊..."客栈老板擦着汗解释。</p>
      <p>"不好？我看客人挺多的啊！"刀疤男环顾四周，目光突然落在了一位年轻女子身上，"既然没钱，那就用人来抵吧。这位姑娘长得不错，带回山寨陪大爷们喝酒。"</p>
      <p>那女子吓得脸色惨白，旁边的年轻男子站起来挡在她前面，"你们不能这样！"</p>
      <p>"哟，还有不知死活的！"刀疤男一挥手，身后的黑衣人立刻上前，一拳将那男子打倒在地。</p>
      <p>看到这一幕，林逍遥皱起了眉头。</p>
      <p>"别插手，"阿志紧张地拉住他，"这些人很危险。"</p>
      <p>林逍遥轻轻摇头，"师父说过，见义不为，非勇也。"</p>
      <p>他站起身，走向那群黑衣人。整个客栈的目光都聚焦在这个陌生的年轻人身上，人们的眼中既有钦佩，也有担忧。</p>
      <p>谁都不知道，这个看似普通的夜晚，将会成为青阳镇流传多年的传奇……</p>
    `
  },
];

const NovelReadingPage = () => {
  const { novelId, chapterId } = useParams();
  const { toast } = useToast();
  const [currentChapter, setCurrentChapter] = useState<typeof chapters[0] | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Simulate fetching novel and chapter data
  useEffect(() => {
    // In a real application, we would fetch chapter data based on novelId and chapterId
    // For now, we'll use our sample data
    const chapter = chapters.find(c => c.id === Number(chapterId)) || chapters[0];
    setCurrentChapter(chapter);
    
    // Update document title
    document.title = `阅读 - ${chapter.title}`;
    
    // Scroll to top when changing chapters
    window.scrollTo(0, 0);
  }, [novelId, chapterId]);

  const handleNextChapter = () => {
    if (!currentChapter) return;
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    if (currentIndex < chapters.length - 1) {
      setCurrentChapter(chapters[currentIndex + 1]);
      // In a real app, we would use navigate to update the URL
      toast({
        title: "章节切换",
        description: `已跳转至${chapters[currentIndex + 1].title}`,
      });
    } else {
      toast({
        title: "已是最后一章",
        description: "没有更多章节了",
      });
    }
  };

  const handlePrevChapter = () => {
    if (!currentChapter) return;
    
    const currentIndex = chapters.findIndex(c => c.id === currentChapter.id);
    if (currentIndex > 0) {
      setCurrentChapter(chapters[currentIndex - 1]);
      // In a real app, we would use navigate to update the URL
      toast({
        title: "章节切换",
        description: `已跳转至${chapters[currentIndex - 1].title}`,
      });
    } else {
      toast({
        title: "已是第一章",
        description: "没有更早的章节了",
      });
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  if (!currentChapter) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 text-center">
          <p>加载中...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        {/* Top navigation bar */}
        <div className="flex justify-between items-center mb-8 px-4 py-2 border-b">
          <Link to="/bookshelf" className="flex items-center text-novel-red">
            <ChevronLeft size={20} />
            <span>返回书架</span>
          </Link>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={toggleSettings}
            >
              <Settings size={18} />
              <span>设置</span>
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Home size={18} />
                <span>首页</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Chapter title */}
        <h1 className="text-2xl font-bold text-center mb-8">{currentChapter.title}</h1>
        
        {/* Settings panel (conditional render) */}
        {isSettingsOpen && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">阅读设置</h3>
            <div className="flex items-center gap-4">
              <span>字体大小:</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
              >
                A-
              </Button>
              <span>{fontSize}px</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
              >
                A+
              </Button>
            </div>
          </div>
        )}
        
        {/* Chapter content */}
        <div 
          className="mb-8 mx-auto max-w-3xl px-4 leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: currentChapter.content }} 
            className="text-gray-800"
          />
        </div>
        
        {/* Chapter navigation */}
        <div className="flex justify-between items-center mt-8 border-t pt-4 px-4">
          <Button 
            variant="outline" 
            onClick={handlePrevChapter}
            disabled={currentChapter.id === chapters[0].id}
            className="flex items-center gap-1"
          >
            <ChevronLeft size={18} />
            <span>上一章</span>
          </Button>
          
          <Button 
            className="bg-novel-red hover:bg-novel-red/90 flex items-center gap-1"
            onClick={() => {
              // Add to bookshelf logic would go here
              toast({
                title: "已加入书架",
                description: "您可以稍后在书架中继续阅读",
              });
            }}
          >
            <BookOpen size={18} />
            <span>加入书架</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleNextChapter}
            disabled={currentChapter.id === chapters[chapters.length - 1].id}
            className="flex items-center gap-1"
          >
            <span>下一章</span>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NovelReadingPage;
