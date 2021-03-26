import type { NextPage } from "next";
import { useState } from "react";
import { debounce } from "mabiki";
import { GlobalHeader } from "../components/GlobalHeader";
import { IncrementalSearchForm } from "../components/IncrementalSearchForm";
import { RecipeList } from "../components/RecipeList";
import { Recipe, searchRecipe } from "../lib/recipe";

const TopPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleChange = debounce(async (keyword: string) => {
    const { recipes } = await searchRecipe(keyword, 1);
    setRecipes(recipes);
  }, 200);

  return (
    <div>
      <GlobalHeader />
      <IncrementalSearchForm onChange={handleChange} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default TopPage;
