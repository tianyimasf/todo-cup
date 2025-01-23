// src/components/CombinedAddSaveButton.tsx
import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

interface CombinedAddSaveButtonProps {
  onAddClick: () => void;
  onSaveClick: () => void;
}

const CombinedAddSaveButton: React.FC<CombinedAddSaveButtonProps> = ({ onAddClick, onSaveClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
      {/* Add Todo Button */}
      <Tooltip title="Add New Task">
        <IconButton
          onClick={onAddClick}
          sx={{
            color: '#f5f5f5',
            backgroundColor: '#b0b0b0',
            '&:hover': {
              backgroundColor: '#a0a0a0',
            },
          }}
          size="large"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      {/* Save Todo Button */}
      <Tooltip title="Save Todo List">
        <IconButton
          onClick={onSaveClick}
          sx={{
            color: '#f5f5f5',
            backgroundColor: '#4caf50', // Green for the save button
            '&:hover': {
              backgroundColor: '#45a049',
            },
          }}
          size="large"
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CombinedAddSaveButton;
