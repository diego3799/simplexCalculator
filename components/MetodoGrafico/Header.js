import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-red-400 shadow-xl mb-5">
      <div className="flex items-center justify-between container mx-auto py-5">
        <h1 className="text-white font-normal text-lg font-roboto ">
          MaxMin - Calculator
        </h1>
        <nav className="text-white text-lg">
          <a className="cursor-pointer mr-10" href="/">Metodo Simplex</a>
          <a href="/markov">Cadenas de Markov</a>
        </nav>
      </div>
    </div>
  );
};

export default Header;
