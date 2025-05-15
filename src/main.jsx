import { createRoot } from 'react-dom/client'
import App from './App.jsx'

console.log("Firebase Project:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
createRoot(document.getElementById('root')).render(<App />);

