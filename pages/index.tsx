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
        <title>UrbanMatrix React Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://urbanmatrix.co.in">UrbanMatrix</a> React Assignment
        </h1>

        <p className={styles.description}>
          Mukesh for you
        </p>
        <div className={styles.gridContainer}>
          <CoordinateContext.Provider value={{ markers, setMarkers }}>
            <ListComponent className={styles.item} />
            <MapComponent className={styles.item} />
          </CoordinateContext.Provider>
        </div>
      </main>
    </div>
  );
};

export default Home;
