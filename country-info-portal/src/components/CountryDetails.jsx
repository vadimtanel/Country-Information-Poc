import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Grid, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { COUNTRY_API_URL } from '../apiConfig';

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [editedCountry, setEditedCountry] = useState({});
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // Track if data has changed
  const [loading, setLoading] = useState(true); // Track loading state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Track snackbar state

  // Fetch country details using useCallback to memoize it
  const fetchCountryDetails = useCallback(async () => {
    try {
      const response = await fetch(COUNTRY_API_URL(name));
      if (!response.ok) {
        throw new Error('Failed to fetch country details');
      }
      const data = await response.json();
      console.log('Fetched country information:', data);
      setCountry(data);
      setEditedCountry({ ...data });
      setLoading(false); // Update loading state
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  }, [name]);

  // Fetch country details on initial render
  useEffect(() => {
    fetchCountryDetails();
  }, [fetchCountryDetails]);

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCountry(prevState => ({
      ...prevState,
      [name]: value
    }));
    setIsDirty(true); // Mark data as changed
  };

  // Handle save operation to update country details
  const handleSave = async () => {
    try {
      setSaving(true); // Start saving process
      const response = await fetch(COUNTRY_API_URL(name), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCountry),
      });
      if (!response.ok) {
        throw new Error('Failed to save country details');
      }
      console.log('Country details saved successfully');
      setIsDirty(false); // Reset data changed flag
      setSnackbarOpen(true); // Display Snackbar
    } catch (error) {
      console.error('Error saving country details:', error);
    } finally {
      setSaving(false); // End saving process
    }
  };

  // Render loading indicator until country details are fetched
  if (loading) {
    return (
      <CircularProgress size={48} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
    )
  }

  // Display country details with editable and non-editable fields
  return (
    <Container>
      <Typography variant="h1">Country Details</Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom>{country.name}</Typography>
        <img src={country.flag} alt={`${country.name} Flag`} style={{ maxWidth: '100%', marginBottom: 20 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="population"
              label="Population"
              variant="outlined"
              value={editedCountry.population || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="capital"
              label="Capital"
              variant="outlined"
              value={editedCountry.capital || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="region"
              label="Region"
              variant="outlined"
              value={country.region || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="subregion"
              label="Subregion"
              variant="outlined"
              value={country.subregion || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="timezone"
              label="Timezone"
              variant="outlined"
              value={country.timezone || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="continent"
              label="Continent"
              variant="outlined"
              value={country.continent || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!isDirty || saving} // Disable button if data is not dirty or saving
          style={{ marginTop: 20 }}
        >
          {saving ? <CircularProgress size={24} color="inherit" /> : 'Save'}
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            Saved successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default CountryDetails;
