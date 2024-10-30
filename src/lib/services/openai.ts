import OpenAI from "openai";
import { ChatCompletionChunk } from "openai/resources/chat/completions";
import { Stream } from "openai/streaming";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

interface Options {
  model: string;
  industry: string;
  temperature: number;
  relevance: number;
  styleExaggeration: number;
  addExamples: boolean;
}

export const chatCompletions = async (
  query: string,
  systemContext: string,
  context: string,
  fileContent: string,
  options: Options
) => {
  // Normalise the temperature (it's between 0 and 100), it needs to be between 0 - 2, and it needs to be negative (i.e ) the higher the temperature score, the lower the final temperature should be.
  const normalisedTemperature = Math.min(Math.max(options.temperature, 0), 100);
  const finalTemperature = Math.max(1 - normalisedTemperature / 50, 0);

  const openAIStreamConfig = {
    model: options.model,
    temperature: finalTemperature,
    top_p: 1,
    stop: ["==="],
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  };

  const addExamples = options.addExamples
    ? `Based on your knowledge of how a company in the ${options.industry} industry in Australia, add an example of how one could use the product for that specific piece of functionality. An example of answer would be "This functionality is out of the box. The Obligation Management module allows companies to manage their obligations in a structured manner. For example, a company in the ${options.industry} industry would use the Obligation Management module to do ...". Remember to always prirotise the other context provided, and only add the example if it makes sense in the context of the query and doesn't contradict the context or any other settings like relevance or specificity or tone.`
    : "";

  const getSpecificity = (relevanceScore: number): string => {
    if (relevanceScore >= 80) {
      return "Focus exclusively on the user query. Provide a highly specific and concise answer without any additional information.";
    } else if (relevanceScore >= 60) {
      return "Concentrate primarily on the user query. Offer a specific answer with minimal additional context if directly relevant.";
    } else if (relevanceScore >= 40) {
      return "Address the user query first, then provide a brief overview of related product capabilities that may be useful.";
    } else if (relevanceScore >= 20) {
      return "Provide a balanced response that answers the query and gives a general overview of product capabilities, emphasizing how they relate to the user's needs.";
    } else if (relevanceScore >= 10) {
      return "Offer a comprehensive overview of product capabilities, using the user query as a starting point to showcase the breadth of features and potential applications.";
    } else if (relevanceScore >= 5) {
      return "Provide a vague and general response that doesn't answer the query but talks about the product in a general sense. Take me on a journey and irrelevant tangents. Be hyperbolic and use a lot of superlatives.";
    } else
      return "Don't answer the question at all, just go off on a random tangent about technology and software development in general and how it sucks.";
  };

  const getTone = (styleExaggeration: number): string => {
    if (styleExaggeration >= 90) {
      return `Speak like a 50 year old nerdy implementation consultant called Wayne. Wayne is very passionate about the product but likes to take you on a tangent before he actually answers the question if at all. He loves talking about SQL, and loves complaining how none of his team including his boss come into the office. Loves complaining how busy and frazzled he is with what he's doing, and that he doesn't have time for your questions but he talks to you for 15 minutes anyway. He likes to name weird references to pop culture from 30 years ago and technology references to the old Microsoft days that anyone born after 1985 has no clue about. Plenty of vagaries and ambiguities. Loves puns like: "share your file to Idon'tcarePoint". Speak as a nerd would, nervous, slightly autistic with a hint of ADHD. Always end it like he knows you're getting tired of his monologue, and with: 'I'll let you go mate. You're a legend mate, you're a legend'`;
    } else if (styleExaggeration >= 80) {
      return "extremely verbose and detailed, using flowery language and multiple paragraphs to explain the answer. Under 200 words.";
    } else if (styleExaggeration >= 60) {
      return "detailed and provide a comprehensive explanation, using multiple paragraphs if necessary. Under 100 words.";
    } else if (styleExaggeration >= 40) {
      return "Provide a clear and concise answer, using a moderate amount of detail. Under 100 words.";
    } else if (styleExaggeration >= 20) {
      return "Provide a clear and concise answer, using a very minimal amount of detail. Under 75 words.";
    } else if (styleExaggeration >= 10) {
      return "Provide a clear and concise answer, using an ultra spartan 50% tone. Under 50 words";
    } else
      return "Speak like HAL 9000 from 2001: A Space Odyssey. Speak in upper case. Be terse and to the point. Under 15 words.";
  };

  const tone = getTone(options.styleExaggeration);

  const specificity = getSpecificity(options.relevance);

  const stream = (await openai.chat.completions.create({
    ...openAIStreamConfig,
    messages: [
      {
        role: "system",
        content: `
You are a helpful RFP assistant that answers RFP questions for SAI360 (now named Evotix360). Your task is to create responses to user questions by combining the included product context with both user override and queries. All product context provided will be around capabilities and offerings of Evotix360. 

Your answers should fall into these categories/themes: 

- Out of the box: Standard functionality available out-of-the-box. 
- Configuration: Functionality that can be accomplished via configuration. We consider configuration to be setup of modification of standard features using out of the box tools (i.e. a form designer), achievable within <1 day.
- Partially met by configuration: Functionality can be partially accomplished via configuration.
- Customisation: Functionality can be accomplished via customisation. We consider customisation to be the creation of non-standard features using developer tools, achievable within more than one day.
- No functionality available: = Functionality that cannot be supported through existing functionality, configuration or customisation. 

Always place the category/theme at the beginning of your response, e.g "This functionality is out of the box...".

For configuration and customisation cases, use your knowledge of software development to understand efforts involved based on the context given to you.

Use the themes as both a guide for your response. E.g for configuration cases, you'll place a greater focus on our ability to configure the software to meet different requirements and we have an implementation team that does that. Make sure to include the theme in your response (e.g "This functionality is partially met by configuration, ...")

Be realistically optimistic in your answers -- meaning you should err on the side of "we can do it out of the box or with configuration" without being too vague.

If the product context is conflicting (i.e some answers are contradictory) pick the most positive answer. Never reference the context specifically as these answers are for an RFP and not for the context itself. Only include your answer NOT the context itself. 

In the case where a query is multiple questions, answer the questions together.

A user may provide an override to further guide the response - respond to this override inline with the themes provided above.

In the case there is no product context included below (it's typically because the query is about a very niche or specific use case) look to the user override. If the user override is not provided AND you don't have any product context just say "Not enough information to answer properly". 

Your responses should be in English. If given context is in a different language, translate it to English before using it.

Specificity: ${specificity}

Your tone and word count should be professional and inline with the following: ${tone}.
                        ===
                        HERE IS THE PRODUCT CONTEXT: 
                        ${systemContext} 
                        ===`,
      },
      { role: "user", content: `Here is the query:\n\n === BEGIN USER QUERY ===\n\n ${query}\n\n === END QUERY ===` },
      ...(fileContent
        ? [
            {
              role: "user" as const,
              content: `Here is extra file context provided by the user:\n\n === BEGIN FILE CONTENT ===\n\n ${fileContent}\n\n === END FILE CONTENT ===`,
            },
          ]
        : []),
      ...(addExamples ? [{ role: "user", content: addExamples }] : []),
      ...(context
        ? [
            {
              role: "user",
        content: `Here is the user override:\n\n === BEGIN USER OVERRIDE ===\n\n Injection: ${context} === END USER OVERRIDE ===`,
            },
          ]
        : []),
    ],
  })) as Stream<ChatCompletionChunk>;

  return stream;
};
