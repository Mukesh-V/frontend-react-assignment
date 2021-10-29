import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import ListComponent from "../components/ListComponent";
import MapComponent from "../components/MapComponent";
import CoordinateContext, { Markers } from "../components/CoordinateContext";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [markers, setMarkers] = useState({coords:[], selected:-1} as Markers);

  return (
    <div className={styles.container}>
      
      <Head>
        <title>Mukesh - UrbanMatrix</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8"/>
        <meta name="author" content="Mukesh-V" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="React-Next Assignment alloted to Mukesh V" />
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content="Mukesh, UrbanMatrix, drone, startup, future" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://urbanmatrix.co.in">UrbanMatrix</a> React Assignment - Mukesh V
        </h1>

        <p className={styles.description}>
          Click/type to generate points. Hover to check features. Select from table to zoom automatically. Last column header resets the list.
        </p>

        <div className={styles.gridContainer}>
          <CoordinateContext.Provider value={{ markers, setMarkers }}>
            <MapComponent className={styles.item} />
            <ListComponent className={styles.item} />
          </CoordinateContext.Provider>
        </div>
      </main>

    </div>
  );
};

export default Home;
