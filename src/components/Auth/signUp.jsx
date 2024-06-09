import { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError('Error sign up: ' + error.message);
        }
    };

    return (
        <Container>
            <Box mt={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px', margin: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{pt:3}}>
                    Sign Up
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSignUp} style={{ width: '100%' }}>
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
                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>

    );
}

export default SignUp;
