# ThreeJS AI Server

Backend server for the AI-powered 3D T-Shirt Customization App.

## 🚀 Features

- **OpenAI Integration**: Generate AI-designed prints and logos
- **Express.js API**: RESTful endpoints for image generation
- **CORS Support**: Cross-origin requests enabled
- **Environment Variables**: Secure API key management

## 📋 API Endpoints

### POST `/api/v1/dalle`
Generate AI images using OpenAI DALL-E

**Request Body:**
```json
{
  "prompt": "A futuristic t-shirt design with neon colors"
}
```

**Response:**
```json
{
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI image generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API Key

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Development

```bash
npm start
```

The server will start on port 8080.

## 🌐 Deployment

### Render.com

1. Connect your GitHub repository
2. Set the following configuration:
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: `OPENAI_API_KEY`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## 📁 Project Structure

```
threejs-ai-server/
├── index.js              # Main server file
├── routes/
│   └── dalle.routes.js   # DALL-E API routes
├── package.json          # Dependencies
├── package-lock.json     # Lock file
└── README.md            # This file
```

## 🔧 Configuration

The server is configured to:
- Run on port 8080
- Accept JSON payloads up to 50MB
- Enable CORS for all origins
- Use environment variables for sensitive data

## 📝 License

This project is part of the ThreeJS AI T-Shirt Customization App.
