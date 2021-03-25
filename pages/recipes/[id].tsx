import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import type { Recipe } from "../../lib/recipe";
import { getRecipe } from "../../lib/recipe";
import { GlobalHeader } from "../../components/GlobalHeader";
import { SearchForm } from "../../components/SearchForm";

type Props = {
  recipe: Recipe;
};

const RecipePage: NextPage<Props> = (props) => {
  const { recipe } = props;

  return (
    <div className="RecipePage">
      <GlobalHeader />
      <SearchForm />

      {recipe && (
        <main>
          {recipe.image_url && (
            <img
              src={recipe.image_url}
              alt="レシピ画像"
              className="recipeImage"
            />
          )}

          <h2 className="title">{recipe.title}</h2>

          <div className="recipeMeta">
            <div className="authorName">💁‍♀️ {recipe.author.user_name}</div>
            <div className="publishedAt">
              🕒 {recipe.published_at.split("T")[0]}
            </div>
            <p>{recipe.description}</p>
          </div>

          <h3 className="subTitle">🥕 材料</h3>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.name} : {ing.quantity}
              </li>
            ))}
          </ul>

          <h3 className="subTitle">🍳 手順</h3>
          <ol>
            {recipe.steps
              .filter((step) => step !== "")
              .map((step, i) => (
                <li key={i}>{step}</li>
              ))}
          </ol>
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
