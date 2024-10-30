import { Groundx } from "groundx-typescript-sdk";

const bucketID = process.env.GROUNDX_BUCKET_ID as string;
const apiKey = process.env.GROUNDX_API_KEY as string;

export const groundx = new Groundx({
  apiKey: apiKey,
});

export const groundxSearchContent = async (query: string, db: { value: string }) => {
  console.log(`Searching for ${query} in ${db.value}`);
  const response = await groundx.search.content({
    id: +db.value,
    query,
    n: 10,
  });

  console.log(response.data.search.results);

  const searchContent =
    response?.data?.search?.results?
      .filter((v) => v.score && v.score > 150)
      // .map((v) => `Keywords: ${v.fileKeywords} Text: ${v.suggestedText}`)
      .join(" ") || "No product knowledge found for the query. Not enough information to answer.";


  const sourcesResponse = await groundxGetSources(response?.data?.search?.results?.map((v) => v.documentId));

  const sources = sourcesResponse?.data?.documents?.map((v) => ({
    id: v.documentId,
    name: v.fileName,
    content: v.searchData,
  }));

  // console.log(searchContent);
  // console.log(sources);

  return { searchContent, sources };
};

export const groundxGetSources = async (ids: string[]) => {
  const response = await groundx.documents.list({
    filter: `${ids.join(", ")}`,
  });
};
