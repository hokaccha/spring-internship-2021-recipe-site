import Link from "next/link";
import React, { FC } from "react";
import { Recipe } from "../lib/recipe";

type Props = {
  recipes: Recipe[];
};

export const RecipeList: FC<Props> = (props) => {
  return (
    <ul className="RecipeList">
      {props.recipes.map((recipe) => (
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
  );
};
