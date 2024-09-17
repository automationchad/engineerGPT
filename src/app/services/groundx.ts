import { Groundx } from "groundx-typescript-sdk";

const bucketID = process.env.GROUNDX_BUCKET_ID as string;
const apiKey = process.env.GROUNDX_API_KEY as string;

export const groundx = new Groundx({
  apiKey: apiKey,
});

// https://documentation.groundx.ai/reference/Search/Search_content
export const groundxSearchContent = async (query: string, db: { value: string }) => {
  console.log("db", db);
  const response = await groundx.search.content({
    id: +db.value,
    query,
  });

  const searchContent = response?.data?.search?.results
    ?.filter((v) => v.score && v.score > 10)
    .map((v) => v.suggestedText)
    .join(" ") || "No product knowledge found for the query. Not enough information to answer.";

  return searchContent;
};
