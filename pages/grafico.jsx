import Head from "next/head";
import React, { Fragment } from "react";
import Form from "../components/MetodoGrafico/Form";
import Header from "../components/MetodoGrafico/Header";
const Grafico = () => {
  return (
    <Fragment>
      <Head>
        <script
          type="text/javascript"
          src="https://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.9.6/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <Form />
    </Fragment>
  );
};

export default Grafico;
