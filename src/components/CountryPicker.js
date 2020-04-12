import React, { useState, useEffect } from "react";
import {
  NativeSelect,
  FormControl,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { getCountryCode } from "../api/index";
import styles from "../styles/CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      setFetchedCountries(await getCountryCode());
    };

    fetchCountryCodes();
  }, [setFetchedCountries]);

  if (fetchedCountries === undefined) {
    return (
      <div className={styles.CountryPicker}>
        <h3 style={{ color: "brown", display: "block" }}>
          Something Went Wrong !!
        </h3>
        <p style={{ color: "gray", display: "block" }}>
          Not Found Or No Internet Connection
        </p>
      </div>
    );
  } else if (!fetchedCountries || fetchedCountries.length === 0) {
    return (
      <div className={styles.CountryPicker}>
        <Grid
          container
          spacing={1}
          justify="center"
          style={{ padding: "20px 0", verticalAlign: "middle" }}
        >
          <CircularProgress />
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={styles.CountryPicker}>
        <FormControl>
          <NativeSelect
            defaultValue=""
            onChange={(e) => handleCountryChange(e.target.value)}
            className={styles.SelectInput}
          >
            <option value="">Global</option>
            {fetchedCountries.map((country, index) => {
              return (
                <option key={index} value={country.code}>
                  {country.country}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
};

export default CountryPicker;
