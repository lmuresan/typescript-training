import React, { FunctionComponent, useCallback, MouseEvent } from "react";
import SearchResultItem from "./../SearchResultItem/SearchResultItem";
import { SearchResultItemType } from "./../../types/SearchTypes";
import "./SearchResultsList.css";

export type SearchResultsListOnResultClick = (href: string, index: number) => void;

export type SearchResultsListProps = {
  i18n: {
    noResultsLabel?: string;
    didYouMeanLabel?: string;
    numberOfResultsLabel?: string;
  };
  results: SearchResultItemType[];
};

export const SearchResultsList: FunctionComponent<SearchResultsListProps> = ({
  i18n: { noResultsLabel, didYouMeanLabel, numberOfResultsLabel },
  results,
}) => {
  const handleResultClick = useCallback(
    (definition: string, index: number) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      console.log("clicked on: ", definition);
    },
    []
  );

  return (
    <div>
      {noResultsLabel && <p className="typography-h120 text">{noResultsLabel}</p>}
      {didYouMeanLabel && <p className="typography-h120 text">{didYouMeanLabel}</p>}
      {(noResultsLabel || didYouMeanLabel) && <hr className="line" />}
      {numberOfResultsLabel && <p className="typography-h120 text marginToList">{numberOfResultsLabel}</p>}
      <div className="resultsList">
        {results.map((result, index) => (
          <a
            key={`${index}-${result.definition}`}
            href={result.definition}
            onClick={handleResultClick(result.definition, index + 1)}
          >
            <SearchResultItem {...result} />
          </a>
        ))}
      </div>
    </div>
  );
};
