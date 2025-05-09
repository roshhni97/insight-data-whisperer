# Insight Data Whisperer

A powerful document analysis and question-answering system that uses AI to extract insights from your documents.

## Features

- PDF document processing and analysis
- Automatic document summarization
- Key topics extraction
- Document structure analysis
- Question answering based on document content
- Vector-based semantic search

## Tech Stack

- **Backend**:

  - Python
  - FastAPI
  - LangChain
  - Azure OpenAI
  - Supabase (Vector Store)
  - PostgreSQL

- **Frontend**:
  - Vite
  - TypeScript
  - React
  - shadcn-ui
  - Tailwind CSS

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- PostgreSQL with pgvector extension
- Azure OpenAI API access
- Supabase account

### Backend Setup

```sh
# Clone the repository
git clone <repository-url>

# Navigate to backend directory
cd insight-backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

### Frontend Setup

```sh
# Navigate to frontend directory
cd insight-data-whisperer

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=your_endpoint
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment
AZURE_OPENAI_API_VERSION=your_api_version
AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME=your_embedding_deployment
AZURE_OPENAI_EMBEDDING_API_KEY=your_embedding_api_key
AZURE_OPENAI_EMBEDDING_ENDPOINT=your_embedding_endpoint
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## API Endpoints

- `POST /upload`: Upload and process PDF documents
- `POST /chat`: Ask questions about uploaded documents
- `GET /documents`: List all processed documents

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
