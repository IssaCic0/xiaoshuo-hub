
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface NovelCardProps {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  description: string;
  tags?: string[];
  isNew?: boolean;
  isHot?: boolean;
}

const NovelCard = ({
  id,
  title,
  author,
  cover,
  category,
  description,
  tags = [],
  isNew = false,
  isHot = false,
}: NovelCardProps) => {
  return (
    <Link to={`/novel/${id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200 hover:border-novel-gold">
        <div className="relative h-56 overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-novel-gold text-white">
                新书
              </Badge>
            )}
            {isHot && (
              <Badge className="bg-novel-red text-white">
                热门
              </Badge>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <h3 className="text-white font-bold text-lg truncate">{title}</h3>
            <p className="text-white/80 text-sm">{author}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2 text-novel-deepBlue border-novel-deepBlue">
            {category}
          </Badge>
          <p className="text-gray-600 text-sm line-clamp-3 h-14">{description}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NovelCard;
