/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from '@mui/material';

const FavoritesModal = ({ open, onClose, onConfirm }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
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
                <Button onClick={onConfirm}>Yes</Button>
                <Button onClick={onClose}>No</Button>
            </Box>
        </Modal>
    );
};

export default FavoritesModal;
