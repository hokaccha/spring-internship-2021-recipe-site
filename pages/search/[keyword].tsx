import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GlobalHeader } from "../../components/GlobalHeader";
import { SearchForm } from "../../components/SearchForm";
import { Recipe, searchRecipe } from "../../lib/recipe";

type Props = {};

const SearchPage: NextPage<Props> = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const router = useRouter();
  const keyword = router.query.keyword?.toString() || "";
  const page = Number(router.query.page) || 1;

  useEffect(() => {
    (async () => {
      const { recipes, prevPage, nextPage } = await searchRecipe(keyword, page);
      setRecipes(recipes);
      setPrevPage(prevPage);
      setNextPage(nextPage);
    })();
  }, [keyword, page]);

  return (
    <div className="SearchPage">
      <GlobalHeader />
      <SearchForm keyword={keyword} />
      <main>
        {keyword && <h1 className="searchTitle">大根の検索結果</h1>}
        <ul className="recipeList">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/recipes/${recipe.id}`}>
                <a>
                  <div className="image">
                    {recipe.image_url && <img src={recipe.image_url} alt="" />}
                  </div>
                  <div className="text">
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        {(nextPage || prevPage) && (
          <div className="paginator">
            {prevPage && (
              <Link href={prevPage}>
                <a className="prevLink">前へ</a>
              </Link>
            )}
            {nextPage && (
              <Link href={nextPage}>
                <a className="nextLink">次へ</a>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
