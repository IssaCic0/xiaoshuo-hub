
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 chinese-header">小说阁</h3>
            <p className="text-gray-600">
              专注于提供最优质的小说阅读体验，汇集各类精彩作品，让您随时随地享受阅读的乐趣。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-novel-deepBlue">作品分类</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/fantasy" className="text-gray-600 hover:text-novel-red">玄幻奇幻</Link></li>
              <li><Link to="/categories/wuxia" className="text-gray-600 hover:text-novel-red">武侠仙侠</Link></li>
              <li><Link to="/categories/urban" className="text-gray-600 hover:text-novel-red">都市言情</Link></li>
              <li><Link to="/categories/history" className="text-gray-600 hover:text-novel-red">历史军事</Link></li>
              <li><Link to="/categories/science" className="text-gray-600 hover:text-novel-red">科幻灵异</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-novel-deepBlue">关于我们</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-novel-red">关于小说阁</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-novel-red">联系我们</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-novel-red">帮助中心</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-novel-red">用户协议</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-novel-red">隐私政策</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-novel-deepBlue">作者专区</h3>
            <ul className="space-y-2">
              <li><Link to="/author/submit" className="text-gray-600 hover:text-novel-red">作品提交</Link></li>
              <li><Link to="/author/guidelines" className="text-gray-600 hover:text-novel-red">创作指南</Link></li>
              <li><Link to="/author/copyright" className="text-gray-600 hover:text-novel-red">版权说明</Link></li>
              <li><Link to="/author/rewards" className="text-gray-600 hover:text-novel-red">福利奖励</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="chinese-divider"></div>
        
        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 小说阁 - 精品小说阅读平台. 保留所有权利</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
