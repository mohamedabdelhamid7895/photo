import { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError('Error signing in: ' + error.message);
        }
    };

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign In
                </Typography>

                
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSignIn}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />




                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />




                    <Button type="submit" variant="contained" color="primary">
                        Sign In
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default SignIn;
