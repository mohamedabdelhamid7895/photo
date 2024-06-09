
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: '#1976d2',
                p: 2,
                position: 'fixed',
                bottom: 0,
                left: 0,
                textAlign: 'center'
            }}
        >
            <Typography variant="body2" color="white">
                &copy; {new Date().getFullYear()} Photos. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;