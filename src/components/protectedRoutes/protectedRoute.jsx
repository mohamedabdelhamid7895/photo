import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/sign-in" />;
    }

    return children;
}

export default ProtectedRoute;
