import React, { FunctionComponent } from "react";
import DOMPurify from "dompurify";
import { SearchResultItemType } from "./../../types/SearchTypes";
import "./SearchResultItem.css";

const SearchResultItem: FunctionComponent<SearchResultItemType> = ({ definition, partOfSpeech }) => {
  const safeName = DOMPurify.sanitize(partOfSpeech);

  return (
    <div className="searchResultItem">
      <div className="searchResultItemTextContainer">
        <p className="typography-h120 searchResultItemContext">{definition}</p>
        <p className="typography-h320 searchResultItemName" dangerouslySetInnerHTML={{ __html: safeName }} />
      </div>
    </div>
  );
};

export default SearchResultItem;
