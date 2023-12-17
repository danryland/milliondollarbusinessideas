// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const configuration = new Configuration({
  apiKey: Deno.env.get("OPEN_API"),
});

const openai = new OpenAIApi(configuration);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  console.log("Config: ", configuration);

  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: 'https://api.search.brave.com/res/v1/news/search?q=',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Accept-Encoding': 'gzip',
  //     'X-Subscription-Token': Deno.env.get("BRAVE_API")
  //   }
  // };

  // axios.request(config)
  // .then((response) => {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  try {
    const requestBody = await req.json();

    const systemPrompt = `Get me 5 million dollar business ideas using the following json format: title, description, mvp, first_users and first_million`;
    const userPrompt = ``;

    const response = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 500,
    });

    const {
      data: {
        choices: [{ message }],
      },
    } = response;

    return new Response(message?.content, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error in function:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/bespoke-idea' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

// API URL: http://localhost:54321
// GraphQL URL: http://localhost:54321/graphql/v1
//      DB URL: postgresql://postgres:postgres@localhost:54322/postgres
//  Studio URL: http://localhost:54323
// Inbucket URL: http://localhost:54324
//  JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
//    anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
// service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
