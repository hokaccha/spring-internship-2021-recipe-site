import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Recipe } from "../../lib/recipe";
import { getRecipe } from "../../lib/recipe";
import { GlobalHeader } from "../../components/GlobalHeader";
import { SearchForm } from "../../components/SearchForm";

type Props = {
  recipe: Recipe;
};

const RecipeMain = dynamic(
  async () => (await import("../../components/RecipeMain")).RecipeMain,
  { ssr: false }
);

const RecipePage: NextPage<Props> = (props) => {
  const { recipe } = props;

  return (
    <div className="RecipePage">
      <GlobalHeader />
      <SearchForm />

      {recipe && (
        <main>
          {recipe.image_url && (
            <Image
              src={recipe.image_url}
              alt="レシピ画像"
              width="480"
              height="270"
              className="recipeImage"
            />
          )}

          <RecipeMain recipe={recipe} />
        </main>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.id);
  if (id === 0 || isNaN(id)) {
    return {
      notFound: true,
    };
  } else {
    const recipe = await getRecipe(id);
    return {
      props: {
        recipe: recipe,
      },
      revalidate: 1,
    };
  }
};

export default RecipePage;
