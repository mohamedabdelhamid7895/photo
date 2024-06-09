import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

function Navbar() {
    const { currentUser } = useAuth();

    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Photo
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {currentUser ? (
                    <>
                        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
                        <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/sign-in">Sign In</Button>
                        <Button color="inherit" component={Link} to="/sign-up">Sign Up</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
