import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, Button, Pagination, Modal, Box, Typography } from '@mui/material';
import { auth, db } from '../../services/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import keys from '../../keys';
function Home() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=10`, {
                headers: {
                    Authorization: keys.googleKey
                }
            });
            setPhotos(response.data.photos);
        };
        fetchPhotos();
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    ////// here are the functions that handle open and close the modal 
    const handleOpenModal = (photoUrl) => {
        setSelectedPhotoUrl(photoUrl);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    /////// here's the funtion that handle add to  favorites if the user is not  logged in navigate to sign in page
    const handleAddToFavorites = async () => {
        if (!auth.currentUser) {
            navigate('/sign-in');
            return;
        }

        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);


        try {
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, { favorites: [] });
            }

            await updateDoc(userDocRef, {
                favorites: arrayUnion(selectedPhotoUrl)
            });
            console.log('Your photo added to favorites:', selectedPhotoUrl);
            handleCloseModal();
        } catch (error) {
            console.error('Error cant photo to favorites:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                Home
            </Typography>
            <Grid container spacing={3}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={photo.src.medium}
                                alt={photo.photographer}
                            />
                            <Button onClick={() => handleOpenModal(photo.src.medium)}>Add to Favorites</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination count={10} page={page} onChange={handlePageChange} />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Add to Favorites
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Do you want to add this photo to your favorites?
                    </Typography>
                    <Button onClick={handleAddToFavorites}>Yes</Button>
                    <Button onClick={handleCloseModal}>No</Button>
                </Box>
            </Modal>
        </Container>
    );
}

export default Home;
