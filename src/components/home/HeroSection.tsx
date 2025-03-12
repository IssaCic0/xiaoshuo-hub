import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-novel-deepBlue via-novel-maroon to-novel-red py-24 text-white overflow-hidden">
      <div className="absolute inset-0 bg-chinese-pattern opacity-10"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-float">
              探索无尽的故事世界
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl">
              小说阁汇聚万千优质小说，满足您的阅读渴望。在这里，发现属于您的文学乐园。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="chinese-btn-primary text-lg" asChild>
                <Link to="/categories">
                  <BookOpen className="mr-2" size={20} />
                  开始阅读
                </Link>
              </Button>
              <Button className="bg-white text-novel-gold border-novel-gold hover:bg-novel-gold hover:text-white text-lg" variant="outline" asChild>
                <Link to="/login">注册账户</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-80 md:w-80 md:h-96 bg-white rounded-lg shadow-xl chinese-border overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-novel-gold/30 to-novel-red/30"></div>
              <div className="p-6 h-full flex flex-col justify-between relative z-10">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-novel-maroon">每日推荐</h3>
                  <div className="h-0.5 w-12 bg-novel-gold mx-auto my-2"></div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-novel-deepBlue mb-2">星辰大海</h2>
                  <p className="text-sm text-gray-600">作者: 青云客</p>
                  <div className="my-4">
                    <p className="text-sm line-clamp-5 text-left text-gray-700">
                      在这个星际时代，人类已经拓展至银河系的各个角落。李浩作为一名普通的星际工程师，一次意外的发现让他卷入了一场关乎人类命运的星际风暴...
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-white text-novel-deepBlue border-novel-deepBlue hover:bg-novel-deepBlue hover:text-white" variant="outline" asChild>
                  <Link to="/novel/1">立即阅读</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
