import axios, { AxiosResponse } from "axios";

type QueryResult = {
  activity?: string;
  accessibility?: number;
  type?: string;
  participants?: number;
  price?: number;
  link?: string;
  key?: string;
  error?: string;
};

type MyType = {
  data: string;
  otherField: number;
};

type MyApiResponse = QueryResult | MyType;

export async function search(query: string): Promise<MyApiResponse> {
  try {
    const URL = "http://www.boredapi.com/api/activity/";

    const response: AxiosResponse<QueryResult> = await axios.get(URL);

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      error: "error",
    };
  }
}
