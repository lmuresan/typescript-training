import React, { FunctionComponent, useCallback, useState } from "react";
import { Search, Search18n } from "../Search/Search";
import { SearchResultsList } from "../SearchResultList/SearchResultsList";
import { SearchResultItemType } from "../../types/SearchTypes";
import { search } from "./../../service/searchService";
import "./SearchContainer.css";

export type SearchContainerProps = {};

const SearchContainer: FunctionComponent<SearchContainerProps> = () => {
  const [searchResults, setSearchResult] = useState<SearchResultItemType[]>([]);

  const searchI18n: Search18n = {
    i18n: {
      title: "Search",
      searchPlaceholder: "Type to search",
    },
  };

  const onSearchChange = useCallback(
    (text: string) => {
      console.log("Search for: ", text);
      search(text)
        .then((res) => {
          console.log("Response: ", res);
          const updatedResults: SearchResultItemType[] = [
            // copy the current users state
            ...searchResults,
            {
              definition: res.type || "",
              partOfSpeech: res.activity || "",
            },
          ];

          setSearchResult(updatedResults);
        })
        .catch((err) => {});
    },
    [searchResults, setSearchResult]
  );

  const numberOfResultsLabel = "Results found for:";
  const didYouMeanLabel = "Did you mean";
  const noResultsLabel = "No results for: ";

  return (
    <>
      <Search translations={searchI18n} onChange={onSearchChange} />

      <div>Results</div>

      <SearchResultsList
        i18n={{ didYouMeanLabel, numberOfResultsLabel, noResultsLabel }}
        results={searchResults}
      ></SearchResultsList>
    </>
  );
};

export default SearchContainer;
