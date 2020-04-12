const axios = require("axios");

const url = "https://covidapi.info/api/v1";

const getLatestStats = async (country) => {
  try {
    if (!country || country === "") {
      const {
        data: {
          date,
          result: { confirmed, deaths, recovered },
        },
      } = await axios.get(`${url}/global`);
      return { region: "Global", date, confirmed, deaths, recovered };
    } else {
      const {
        data: { result },
      } = await axios.get(`${url}/country/${country}/latest`);
      const [date, { confirmed, deaths, recovered }] = Object.entries(
        result
      )[0];
      const region = await getCountryName(country);
      return { region, date, confirmed, deaths, recovered };
    }
  } catch (err) {
    return { error: err };
  }
};

const getCountryCode = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get("https://covid19.mathdro.id/api/countries");
    const countryList = countries.map((country) => {
      return { code: country.iso3, country: country.name };
    });
    return countryList;
  } catch (err) {
    console.log(err);
  }
};

const getCountryName = async (countryCode) => {
  try {
    const {
      data: { name },
    } = await axios.get(
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    return name;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getLatestStats,
  getCountryCode,
};
