import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { COUNTRIES_API_URL } from '../apiConfig';

const CountriesOverview = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(COUNTRIES_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      console.log('fetched countries:', data);
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  return (
    <div>
      <h2>Countries Overview</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Capital</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Sub-region</TableCell>
              <TableCell>Population</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map(country => (
              <TableRow key={country._id}>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.capital}</TableCell>
                <TableCell>{country.region}</TableCell>
                <TableCell>{country.subregion}</TableCell>
                <TableCell>{country.population}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/countries/${country.name}`} variant="outlined">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CountriesOverview;
