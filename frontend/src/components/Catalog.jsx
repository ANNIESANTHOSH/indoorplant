import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Catalog.css';  // Importing custom CSS for additional styling

const CatalogPage = () => {
  const [plants, setPlants] = useState([]);

  // Fetch plant data from the API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/plants');
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plant data:', error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="catalog-container">
      <h2 className="text-center catalog-title">Plant Catalog</h2>
      <div className="catalog-grid">
        {plants.length === 0 ? (
          <p className="text-center">No plants available</p>
        ) : (
          plants.map((plant) => (
            <div className="plant-card-container" key={plant._id}>
              <div className="plant-card shadow-sm">
                <div className="img-container">
                  <img
                    src={plant.imageUrl || 'https://via.placeholder.com/200'}
                    className="card-img-top plant-image"
                    alt={plant.name}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{plant.name}</h5>
                  <p className="card-text description">{plant.description}</p>
                  <p className="card-text"><strong>Care:</strong> {plant.careInstructions}</p>
                  <p className="card-text"><strong>Type:</strong> {plant.plantType}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
