# ThreeJS AI Client

Frontend client for the AI-powered 3D T-Shirt Customization App.

## 🚀 Features

- **3D T-Shirt Visualization**: Real-time 3D rendering with Three.js
- **AI-Powered Customization**: Generate designs using OpenAI DALL-E
- **Color Customization**: Choose from unlimited color palette
- **Logo Upload**: Upload custom logos and images
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Valtio** - State management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Vercel will automatically detect Vite configuration
3. Deploy with default settings

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔧 Configuration

The app connects to the backend server. Update `src/config/config.js`:

```javascript
const config = {
  development: {
    backendUrl: "http://localhost:8080/api/v1/dalle",
  },
  production: {
    backendUrl: "https://threejs-ai-server.onrender.com/api/v1/dalle",
  },
};
```

## 📁 Project Structure

```
threejs-ai-client/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── canvas/            # Three.js components
│   ├── components/        # Reusable UI components
│   ├── config/            # Configuration files
│   ├── pages/             # Page components
│   ├── store/             # State management
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── vite.config.js         # Vite configuration
```

## 🎨 Customization

### Adding New Colors
Edit `src/config/constants.js` to add new color options.

### Modifying 3D Models
Replace `public/shirt_baked.glb` with your custom 3D model.

### Styling
The app uses Tailwind CSS. Modify `src/index.css` for global styles.

## 📝 License

This project is part of the ThreeJS AI T-Shirt Customization App.
