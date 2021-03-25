import type { NextPage } from "next";
import { GlobalHeader } from "../components/GlobalHeader";
import { SearchForm } from "../components/SearchForm";

const TopPage: NextPage = () => {
  return (
    <div>
      <GlobalHeader />
      <SearchForm />
    </div>
  );
};

export default TopPage;
