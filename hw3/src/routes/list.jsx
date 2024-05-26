import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cs464p564-frontend-api.vercel.app/api/countries")
      .then(async (response) => {
        const fetchedCountries = response.data;

        for (let country of fetchedCountries) {
          if (country.detailsLink) {
            try {
              const detailsResponse = await axios.get(country.detailsLink);
              country.details = detailsResponse.data;
            } catch (err) {
              console.error("Error fetching details for:", country.name, err);
            }
          }
        }

        setCountries(fetchedCountries);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setError("Failed to load country data");
      });
  }, []);

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  // Main component to display a list of South American countries and their details
  return (
    <div>
      {/* Container to align content and add top margin */}
      <Container
        className="justify-content-center align-items-center"
        style={{ marginTop: "100px" }}
      >
        {/* Header for the list of countries */}
        <h1>South American Countries</h1>
        {/* Mapping through each country to display its details in a card format */}
        {countries.map((country, index) => (
          <Card key={index} className="mb-3">
            <Card.Header as="h2">{country.name}</Card.Header>
            <Card.Body className="d-flex align-items-center">
              <div className="flex-grow-1">
                {/* Population detail, displaying a formatted number or 'Not available' */}
                <p>
                  <strong>Population:</strong>{" "}
                  {country.population
                    ? country.population.toLocaleString()
                    : "Not available"}
                </p>
                {/* GDP detail, showing in billions or 'Not available' */}
                <p>
                  <strong>GDP (in billions):</strong>{" "}
                  {country.gdp_billions
                    ? `${country.gdp_billions} billion`
                    : "Not available"}
                </p>
                {/* Displaying official languages or 'Not available' if none are recorded */}
                <p>
                  <strong>Official Languages:</strong>{" "}
                  {country.official_languages &&
                  country.official_languages.length > 0
                    ? country.official_languages.join(", ")
                    : "Not available"}
                </p>
                {/* Additional details section, shown only if details are available */}
                {country.details && (
                  <p>
                    <strong>Additional Details:</strong>{" "}
                    {country.details.description}
                  </p>
                )}
              </div>
              <img
                crossorigin="anonymous"
                src={country.flag_png}
                alt={country.flag_alt || "Flag not available"}
                style={{ width: "150px", height: "auto", marginLeft: "20px" }}
              />
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default CountryList;
