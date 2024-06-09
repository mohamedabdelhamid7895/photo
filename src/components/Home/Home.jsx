import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, Button, Pagination} from '@mui/material';
import { auth, db } from '../../services/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import keys from '../../keys';
import FavoritesModal from '../Modal/favoriteModal';
function Home() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=30`, {
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
            <Grid container sx={{pt:3}} spacing={3}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="150"
                                image={photo.src.medium}
                                alt={photo.photographer}
                            />
                            <Button  onClick={() => handleOpenModal(photo.src.medium)}>Add to Favorites</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Pagination count={100} page={page} onChange={handlePageChange} sx={{pb:8,pt:4}} />
                {/* here modal component to show the modal to add to favorites  */}
            <FavoritesModal
                open={openModal}
                onClose={handleCloseModal}
                onConfirm={handleAddToFavorites}
            />
        </Container>
    );
}

export default Home;
