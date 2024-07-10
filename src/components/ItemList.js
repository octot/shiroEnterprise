// ItemRow.js
import React, { memo } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import {TextField} from '@mui/material';
const ResponsiveTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
  }
}));
const ItemRow = memo(({ index, style, data }) => {
  const { items, gstfields, gstType, handleChange, handleRemoveRow } = data;
  const item = items[index];

  return (
    <Box style={style} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {gstfields
          .filter(({ gstTypeField }) => gstTypeField === 'all' || gstTypeField === gstType)
          .map(({ name, label, format }) => (
            <Grid item xs={12} sm={12} md={name === 'description' ? 2 : 1.5} key={`${index}-${name}`}>
              <ResponsiveTextField
                label={label}
                value={format ? format(item[name]) : item[name]}
                onChange={(e) => handleChange(index, name, e.target.value)}
                fullWidth
                variant="outlined"
                margin="normal"
                aria-label={label}
              />
            </Grid>
          ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveRow(index)}
            sx={{ mt: 2, ml: 1 }}
            aria-label={`Remove item ${index + 1}`}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
});

export default ItemRow;