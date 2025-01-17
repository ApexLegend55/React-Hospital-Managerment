import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton, Grid, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/RemoveCircle';

interface StaffMember {
  name: string;
  photo: string | ArrayBuffer | null;
  rating: number;
}

const Forms: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which member is being edited
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [staffMember, setStaffMember] = useState<StaffMember[]>([]);

  const handleAddClick = () => {
    setIsEditing(false);
    setOpenModal(true);
    setName('');
    setPhoto(null);
    setRating(0);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = () => {
    if (!name || !photo || rating === null) return; // Validate fields
    const newMember = { name, photo, rating };

    if (isEditing && editingIndex !== null) {
      setStaffMember((prevStaffMember) =>
        prevStaffMember.map((member, index) =>
          index === editingIndex ? newMember : member
        )
      );
    } else {
      setStaffMember((prevStaffMember) => [...prevStaffMember, newMember]);
    }

    setOpenModal(false);
    setName('');
    setPhoto(null);
    setRating(0);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    const member = staffMember[index];
    setName(member.name);
    setPhoto(member.photo);
    setRating(member.rating);
    setEditingIndex(index);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleRemove = (index: number) => {
    setStaffMember((prevStaffMember) => prevStaffMember.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sortedStaffMember = [...staffMember].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      {/* Displaying added StaffMember in boxes */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {sortedStaffMember.map((staff, index) => (
          <Grid item xs={4} key={index}>
            <Box
              onClick={() => handleEdit(index)}
              sx={{
                border: '3px solid green',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
              }}
            >
              <img
                src={staff.photo as string}
                alt={staff.name}
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
              <Typography variant="body1">{staff.name}</Typography>
              <Rating value={staff.rating} readOnly />
            </Box>
          </Grid>
        ))}
        {/* Box with "+" button */}
        <Grid item xs={4}>
          <Box
            onClick={handleAddClick}
            sx={{
              border: '3px solid green',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            <IconButton color="primary">
              <AddIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Modal for entering/editing name, photo, and rating */}
        <Modal open={openModal} onClose={handleCloseModal}>
        <Box
            sx={{
            width: 400,
            margin: 'auto',
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            top: '20%',
            position: 'absolute',
            }}
        >
            <Typography variant="h6">{isEditing ? 'Edit Rating' : 'Add Rating'}</Typography>
            <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
            />

            {/* Photo upload input */}
            <Button variant="outlined" component="label" fullWidth sx={{ marginBottom: 2 }}>
            Upload Photo
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
            </Button>

            {photo && <img src={photo as string} alt="Uploaded" style={{ width: '50%', height: 'auto', marginBottom: 10 }} />}

            {/* Rating input */}
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            Rating:
            </Typography>
            <Rating value={rating || 0} onChange={(_, newValue) => setRating(newValue)} precision={1} />

            {/* Save button */}
            <Button onClick={handleSave} variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Save
            </Button>

            {/* Remove button */}
            {isEditing && (
            <Button
            onClick={() => {
              if (editingIndex !== null) handleRemove(editingIndex);
              handleCloseModal(); // Close modal after removal
            }}
            variant="outlined"
            color="error"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={staffMember.length <= 1} // Disable button when there's 1 or fewer members
            >
                Remove
            </Button>
            )}
        </Box>
        </Modal>

    </div>
  );
};

export default Forms;
