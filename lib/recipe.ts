export type Recipe = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  author: {
    user_name: string;
  };
  published_at: string;
  steps: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
};

export async function getRecipe(id: number): Promise<Recipe | null> {
  const response = await fetch(
    `https://internship-recipe-api.ckpd.co/recipes/${id}`,
    {
      headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY || "" },
    }
  );
  const recipe = await response.json();
  return recipe as Recipe;
}

const searchDefaultValue = {
  recipes: [],
  nextPage: null,
  prevPage: null,
};

export async function searchRecipe(
  keyword: string,
  page: number
): Promise<{
  recipes: Recipe[];
  nextPage: string | null;
  prevPage: string | null;
}> {
  if (!keyword) return searchDefaultValue;

  const response = await fetch(
    `https://internship-recipe-api.ckpd.co/search?keyword=${keyword}&page=${page}`,
    {
      headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY || "" },
    }
  ).catch((err) => {
    console.error(err);
  });
  if (!response || !response.ok) return searchDefaultValue;

  const result = await response.json();
  return {
    recipes: result.recipes as Recipe[],
    nextPage: result.links.next ? `/search/${keyword}?page=${page + 1}` : null,
    prevPage: result.links.prev ? `/search/${keyword}?page=${page - 1}` : null,
  };
}
