import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { centerState } from "@/function/atom/Atom";
import { newDisplayName } from "@/function/categoryName";
import ArticleCard from '@/components/articles/ArticleCard';
import ContentsWrapper from "../ContentsWrapper";

export default function CategoryIcon ({articles}) {
  console.log("データが全部入ってる", articles.categoryItems);

  const categories = useRecoilValue(centerState);
  const [categoryItems, setCategoryItems] = useState([]);
  const [category, setCategory] = useState("all");

  // 投稿済カテゴリ画像取得
  useEffect(() => {
    showIconZone();
  },[categories]);

  function showIconZone () {
    setCategoryItems(articles.categoryItems);
  };

  // アイコンクリック時の表示切り替え
  function changeArticle (category) {
    setCategory(category)
  }
  
  return (
    <ContentsWrapper>
      ISRで表示しようと頑張ってます
      <div className="category-image-top">
        {categoryItems.map(category => (
          <div 
            className="category-image-top__box"
            key={category.name}
            onClick={() => changeArticle(category.url)}
          >
            <div
              className="logo"
              dangerouslySetInnerHTML={{ __html: category.svg }}
            >
            </div>
            <div className="name">
              {category.name}
            </div>
          </div>
        ))
        }
      </div>
      <div className="article-title">
        {newDisplayName(category)}の記事⬇️
      </div>
      <ArticleCard select={category} />
    </ContentsWrapper>
  )
}