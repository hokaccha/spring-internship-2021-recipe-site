import { useRouter } from "next/router";
import { ChangeEvent, FC, FormEvent, useState } from "react";

type Props = {
  keyword?: string;
};

export const SearchForm: FC<Props> = (props) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>(props.keyword || "");

  const handleInput = function (e: ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  };

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search/${keyword}`);
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="料理目、食材名、目的"
        value={keyword}
        onChange={handleInput}
      />
      <button type="submit">🔎</button>
    </form>
  );
};
