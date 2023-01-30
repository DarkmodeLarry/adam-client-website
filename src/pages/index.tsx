"use client";
import { type NextPage } from "next";
import Head from "next/head";
import Calendar from "../components/Calendar/";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Booking Software</title>
        <meta name="description" content="by josh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calendar />
      </main>
    </>
  );
};

export default Home;
