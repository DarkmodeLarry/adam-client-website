"use client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { type DateTime } from "../utils/types";
import Calendar from "../components/Calendar/";
import Spinner from "../components/Spinner";

const Home: NextPage = () => {
  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  });

  return (
    <>
      <Head>
        <title>Booking Software</title>
        <meta name="description" content="by josh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!date.dateTime && <Calendar setDate={setDate} date={date} />}
        {date.dateTime && false ? (
          <Menu />
        ) : (
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
