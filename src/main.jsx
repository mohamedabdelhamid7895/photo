import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/authContext';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
<BrowserRouter>
<AuthProvider>
  <App />
  </AuthProvider>
</BrowserRouter>
);