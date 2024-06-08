import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import { auth, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Favorites() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);

            try {
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setPhotos(userData.favorites || []);
                } else {
                    console.log('No  favorites!');
                }
            } catch (error) {
                console.error('Error getting favorites:', error);
            }
        };

        if (auth.currentUser) {
            fetchFavorites();
        }
    }, []);

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Favorites
            </Typography>
           
            <Grid container spacing={2}>
                {photos.map((photoUrl, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={photoUrl}
                                alt={`Favorite ${index}`}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Favorites;
