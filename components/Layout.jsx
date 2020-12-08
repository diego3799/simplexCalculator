import Head from "next/head";
import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";

const Header = styled.div`
  background-color: #30638e;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  & div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    h1 {
      color: white;
      font-family: "Dancing Script";
      font-size: 2.5rem;
      margin: 0;
      padding: 20px 0;
    }
  }
`;
const Nav = styled.nav`
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  & a {
    margin-right: 10px;
  }
`;
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Simplex</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&family=Poppins:wght@300;600&display=swap"
          rel="stylesheet"
        />
        
      </Head>
      <Header>
        <div>
          <h1>II Fases Simplex</h1>
          <Nav>
            <a href="/grafico">Metodo Gráfico</a>
            <a href="/markov">Cadenas de Markov</a>
          </Nav>
        </div>
      </Header>
      <main
        css={css`
          max-width: 1280px;
          margin: 0 auto;
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
