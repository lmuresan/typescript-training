export type SearchResult = {
  word: string;
  definitions: SearchResultItemType[];
};

export type SearchResultItemType = {
  definition: string;
  partOfSpeech: string;
};
