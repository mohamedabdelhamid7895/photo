import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardActions, Button } from '@mui/material';
import { auth, db } from '../../services/firebase';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import FavoritesModal from '../Modal/favoriteModal';
function Favorites() {
    const [photos, setPhotos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');

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
                    console.log('No favorites!');
                }
            } catch (error) {
                console.error('Error getting favorites:', error);
            }
        };

        if (auth.currentUser) {
            fetchFavorites();
        }
    }, []);

    const handleOpenModal = (photoUrl) => {
        setSelectedPhotoUrl(photoUrl);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDeleteFavorite = async () => {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);

        try {
            await updateDoc(userDocRef, {
                favorites: arrayRemove(selectedPhotoUrl)
            });
            setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo !== selectedPhotoUrl));
            console.log('Photo removed from favorites:', selectedPhotoUrl);
            handleCloseModal();
        } catch (error) {
            console.error('Error removing photo from favorites:', error);
        }
    };

    return (
        <Container sx={{ pt: 3 }} >
            {photos.length === 0 ? (
                <Typography variant="h5" component="p" align='center'>
                    You have no favorite photos.
                </Typography>
            ) : (
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
                                <CardActions>
                                    <Button
                                        color="secondary"
                                        onClick={() => handleOpenModal(photoUrl)}
                                    >
                                        Delete from Favorites
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <FavoritesModal
                open={openModal}
                onClose={handleCloseModal}
                onConfirm={handleDeleteFavorite}
            />
        </Container>
    );
}

export default Favorites;
