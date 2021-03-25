import { FC } from "react";
import { Recipe } from "../lib/recipe";

type Props = {
  recipe: Recipe;
};

export const RecipeMain: FC<Props> = ({ recipe }) => {
  return (
    <>
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
    </>
  );
};
