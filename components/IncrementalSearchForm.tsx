import { ChangeEvent, FC, FormEvent, useState } from "react";

type Props = {
  onChange: (keyword: string) => void;
};

export const IncrementalSearchForm: FC<Props> = (props) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleInput = function (e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setKeyword(value);
    props.onChange(value);
  };

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
