import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import CountUp from "react-countup";
import styles from "../styles/Card.module.css";
import cx from "classnames";

const Cards = ({ data }) => {
  if (data.error) {
    return (
      <div className={styles.container}>
        <h3 style={{ color: "brown", display: "block" }}>
          Something Went Wrong !!
        </h3>
        <p style={{ color: "gray", display: "block" }}>
          Not Found Or No Internet Connection
        </p>
      </div>
    );
  } else {
    const { region, date, confirmed, deaths, recovered } = data;

    if (!date || date === null) {
      return (
        <div className={styles.container}>
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
        <div className={styles.container}>
          <section className={styles.heading}>
            <Typography variant="h4" color="textPrimary">
              {region}
            </Typography>
            <Typography color="textSecondary">
              Last updated at {new Date(date).toDateString()}
            </Typography>
          </section>

          <Grid container spacing={3} justify="center">
            <Grid
              item
              component={Card}
              xs={12}
              md={3}
              className={cx(styles.card, styles.confirmed)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Confirmed
                </Typography>
                <Typography variant="h5">
                  <CountUp
                    start={0}
                    end={confirmed}
                    duration={3}
                    separator=","
                  />
                </Typography>
              </CardContent>
            </Grid>

            <Grid
              item
              component={Card}
              xs={12}
              md={3}
              className={cx(styles.card, styles.recovered)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Recovered
                </Typography>
                <Typography variant="h5">
                  <CountUp
                    start={0}
                    end={recovered}
                    duration={3}
                    separator=","
                  />
                </Typography>
              </CardContent>
            </Grid>

            <Grid
              item
              component={Card}
              xs={12}
              md={3}
              className={cx(styles.card, styles.deaths)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Deaths
                </Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={deaths} duration={3} separator="," />
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
};

export default Cards;
