import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/tripzova-global.css';
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
