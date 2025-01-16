# engineerGPT

RAG-powered engineering assistant that provides technical recommendations based on engineering documentation, standards, and specifications.

## Overview

engineerGPT uses GroundX for vector storage and Next.js for the frontend. It processes engineering documents through RAG (Retrieval Augmented Generation) to provide context-aware technical assistance.

## Features

- Document Processing:
  - Engineering PDF/manual parsing
  - Technical specification embedding
  - CAD metadata extraction
  - Standards document indexing

- Search & Retrieval:
  - Material property lookups
  - Design validation checks
  - Technical standard references
  - Manufacturing requirements

- Real-time Generation:
  - Streaming responses
  - Source references
  - Confidence scoring

## Setup

### Prerequisites
- Node.js (v18+)
- OpenAI API key
- GroundX API key

### Environment Variables
```bash
OPENAI_API_KEY=your_key_here
GROUNDX_API_KEY=your_key_here
GROUNDX_BUCKET_ID=your_bucket_id
```

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or
yarn dev
```

## Core Components

### Frontend (`/app`)
- `chat/page.tsx`: Main chat interface
- `components/FileUpload.tsx`: Document upload handler
- `components/SearchResults.tsx`: Results display

### API (`/app/api`)
- `search/route.ts`: Main search endpoint
- `upload/route.ts`: Document upload endpoint
- `embed/route.ts`: Embedding generation

### Utils (`/utils`)
- `processEngDocs.ts`: Engineering document processor
- `vectorStore.ts`: GroundX interface
- `validators.ts`: Input validation

## API Usage

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the material requirements for ASTM A36 steel?"}'
```

## GroundX Setup

1. Create a bucket at [GroundX Content Page](https://groundx.ai/content)
2. Upload engineering documents
3. Set `GROUNDX_BUCKET_ID` in your env

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

MIT License - see [LICENSE](LICENSE)
