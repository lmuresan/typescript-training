import React, { FunctionComponent, useState, useCallback, useRef, ChangeEvent } from "react";
import classnames from "classnames";
import "./SearchBar.css";

export type SearchBarOnChangeCallback = (searchTerm: string) => void;

export type SearchBarProps = {
  placeholderLabel: string;
};

export type SearchBarViewModel = {
  onChange: SearchBarOnChangeCallback;
} & SearchBarProps;

function isSearchTermEmpty(searchTerm: string): boolean {
  return !!searchTerm === false;
}

export const SearchBar: FunctionComponent<SearchBarViewModel> = ({ placeholderLabel, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // when the search term changes
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
      onChange(value);
    },
    [setSearchTerm, onChange]
  );

  const inputClassNames = classnames(
    "typography-h320",
    {
      marginRight: isSearchTermEmpty(searchTerm),
    },
    "searchInput"
  );

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          ref={inputRef}
          placeholder={placeholderLabel}
          className={inputClassNames}
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
