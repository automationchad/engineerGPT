# engineerGPT

RAG + LLMs for engineering docs. Feed it standards, specs, research papers, get technically accurate responses.

## What it does
- Chunks technical docs intelligently (handles formulas, units, tables)
- Stores in GroundX vectors
- Streams context-aware responses 
- Tags sources with spec numbers and page refs

## Stack
- Next.js
- GroundX vectorDB
- OpenAI API
- Streaming SSE

## Run it
```bash
export OPENAI_API_KEY=sk-xxx
export GROUNDX_API_KEY=gx-xxx
export GROUNDX_BUCKET_ID=xxx
```

# Install & Run
```bash
npm i && npm run dev
```

Visit `localhost:3000`

## Core files
```
/app
  /api
    /search/route.ts     # main endpoint  
  /chat
    page.tsx            # chat UI
/lib
  processDocs.ts        # doc parsing
  groundx.ts           # vector ops
```

## API
```bash
curl localhost:3000/api/search -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "yield strength A36 steel"}'
```

## Known issues
- Formula parsing breaks on complex LaTeX
- PDF tables get mangled sometimes
- Large docs (>100MB) need chunking tweaks

## Todo
- [ ] Add material property embeddings
- [ ] Fix unit conversion edge cases
- [ ] Speed up vector search
- [ ] Add CAD metadata parser

## Contributing
PRs welcome. Read the code first.

## License 
MIT

Built because I got tired of digging through spec sheets. Use at your own risk.
```
