import React, { FunctionComponent, useState, useCallback } from "react";
import { SearchBar, SearchBarOnChangeCallback } from "../SearchBar/SearchBar";

import "./Search.css";

export type Search18n = {
  i18n: {
    title: string;
    searchPlaceholder: string;
  };
};

export type SearchProps = {
  translations: Search18n;
  onChange: SearchBarOnChangeCallback;
};

export const Search: FunctionComponent<SearchProps> = ({ translations, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = useCallback(
    (searchText: string) => {
      setSearchTerm(searchText);
      onChange(searchText);
    },
    [setSearchTerm, onChange]
  );

  return (
    <div>
      <span className="typography-h680 title">{translations.i18n.title}</span>
      <div className="searchBar">
        <SearchBar placeholderLabel={translations.i18n.searchPlaceholder} onChange={handleChange} />
      </div>
    </div>
  );
};
