import React, { Fragment, useState } from "react";
import imprimirMatrix from "../imprimirMatrix";
import * as math from "mathjs";
import { rest } from "lodash";
const Estacionaria = ({ matriz, transpuesta, identidad }) => {
  let resta = math.subtract(transpuesta, identidad);
  /**Cambiar el primer renglon de la resta  por unos */
  let nuevoRenglon = [
    [1, 1, 1],
    [resta[1][0], resta[1][1], resta[1][2]],
    [resta[2][0], resta[2][1], resta[2][2]],
  ];
  let renglon = [[1], [0], [0]];
  let resultado = math.lusolve(nuevoRenglon, [1,0,0]);
  console.log(resultado);
  return (
    <Fragment>
      <h1>Solucion Estacionaria</h1>
      <div className="flex  items-center justify-between">
        {imprimirMatrix(transpuesta)}
        <p className="text-5xl mx-5">-</p>
        {imprimirMatrix(identidad)}
        <p className="text-5xl mx-5">=</p>
        {imprimirMatrix(resta)}
      </div>
      <div className="flex items-center justify-between mt-10">
        {imprimirMatrix(nuevoRenglon)}

        <p className="text-5xl mx-5">*</p>
        {imprimirMatrix(renglon)}

        <p className="text-5xl mx-5">=</p>
        {imprimirMatrix(resultado)}
      </div>
    </Fragment>
  );
};

export default Estacionaria;
