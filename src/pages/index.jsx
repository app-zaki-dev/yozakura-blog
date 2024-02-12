import PageSEO from "@/components/PageSEO";
import { getArticles, I } from "@/function/axios";
import Image from "next/image";
import { autoIndustry } from "@/function/markdown/selectCategory";
import { useState } from "react";
import { IndustrySearch } from "@/function/axios";
import ContentsWrapper from "@/components/ContentsWrapper";
import ArticleCard from "@/components/articles/ArticleCard";
import OtherArticle from "@/components/articles/OtherArticle";
import Loading from "@/components/Loading";
import { topMeta } from "@/config/meta/constMeta";

export default function Home({ articles }) {
    const [selectArticles, setSelectArticles] = useState(articles);
    const [select, setSelect] = useState("すべて");

    async function selectedArticle(industry) {
        console.log("これはなんだ？", industry);
        setSelect(industry.fullLabel);
        const result = await IndustrySearch(industry.category);
        console.log(result);
        if (industry.category !== "all") {
            setSelectArticles(result);
        } else {
            const response = await getArticles();
            console.log("レスポンス", response);
            setSelectArticles(response);
            // setSelectArticles(articles);
        }
    }

    return (
        <>
            <PageSEO title={topMeta.title} description={topMeta.description} />
            {/* カテゴリーゾーン */}
            <div className="category">
                <div className="category-inner">
                    {autoIndustry.map((industry) => (
                        <div
                            className="category-inner__box"
                            key={industry.id}
                            onClick={() => selectedArticle(industry)}
                        >
                            <Image
                                src={industry.src}
                                alt={industry.category}
                                width={50}
                                height={50}
                            />
                            <p>{industry.label}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* ボタン */}
            {selectArticles.length < 0 ? (
                <Loading />
            ) : (
                <ContentsWrapper>
                    <OtherArticle category={select} />
                    {/* 記事 */}
                    <div className="article-link">
                        <ArticleCard articles={selectArticles} />
                    </div>
                </ContentsWrapper>
            )}
        </>
    );
}

// ISRで表示
export const getStaticProps = async () => {
    console.time("test");
    // const articles = await getArticles();
    const articles = await IndustrySearch("frontend");
    // console.log(articles);
    console.timeEnd("test");
    return {
        props: {
            articles: articles,
        },
        // isr
        revalidate: 10, // 新しいリクエストがあってから10秒間は新しいHTMLを生成しない
    };
};
