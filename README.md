# Million Dollar Business Ideas

## Build in a weekend. Make millions.

[![Supafactor: Pass](https://nipsfqhfvpgclfjnctna.supabase.co/functions/v1/badge?userName=danryland&repo=milliondollarbusinessideas)](https://supafactor.netlify.app/)

[GET: Million dollar business ideas](https://milliondollarbusinessideas.com)

[WATCH: Watch a demo TODO](https://www.loom.com/)

![Million Dollar Business Ideas](./src/assets/img/cover-1.jpg)

Hi there, I’m Dan Ryland ([@RealDanRyland](https://twitter.com/realdanryland)). You may remember me from such hackathon entries as 🥇 WINNER: _[Supafactor: Does your README have it?](https://supafactor.netlify.app/)_ and 🥈 Runner up: _[Groove AI: AI Generated Drum Patterns](https://groove-ai.netlify.app/)_.

What have I build this time round?

**A million dollar business idea generator.**

Presenting [mulliondollarbusinessideas.com](https://milliondollarbusinessidea.com), where you can build in a weekend AND make millions.

## How does it work?

I seeded the database with 611 _million dollar business ideas_. Each idea consists of a title, description, a suggested MVP or first prototype, suggestions on how to get your first 10 users and finally, the big one - how to make your first million.

Taking inspiration from Y Combinator's '[Request for Startups](https://www.ycombinator.com/rfs)', I asked GPT-4 to suggest some typical search queries that would go along with these theme descriptions.

Taking each search query, I used Brave Search API to provide current and related news articles matching the search query.

Returning to GPT-4 I then asked it to merge the initial YC theme, the search results from Brave and generate 10 related million dollar business ideas following my format.

To automate further, I used [Zapier](https://zapier.com/) to loop through the remainder YC themes, generate search queries then run together to get the ideas.

Within the web application you can either get a bespoke list of ideas matching an interest or you can pick 20 random ideas from the database.

Once you've selected your idea, you can read the full blueprint on making your first million including generating matching images using DALLE-3.

## Supabase features

The following Supabase features are being used:

- Database
  - Fetch
  - Upsert
- Edge function
  - Open AI (gpt-4-1106-preview)
  - Brave Search API

## Design process

- [Figma](https://www.figma.com/) for prototyping and designing assets
- [DALL-E 3](#) for contextual images within the business idea blueprint

## Build process

Built entierly using [Quasar framework](https://quasar.dev/)

To run locally, you'll need the following:

### Environment variables

```bash
SUPABASE_URL
SUPABASE_KEY
SUPABASE_FUNCTION
```

For the edge function:

```bash
OPEN_API
BRAVE_API
```

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Deploy

Deploy the Supabase edge function:

```bash
supabase functions deploy bespoke-idea
```

Hosted on [Cloudflare](https://www.cloudflare.com/)

Build the app for production

```bash
quasar build
```

Publish directory:

```bash
dist/spa
```

## Icons

#### Favicon

```bash
icongenie generate -i src/assets/img/icon-million-dollar-business-ideas.png --quality 12 --skip-trim
```
