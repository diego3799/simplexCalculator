import React, { Fragment, useEffect, useState } from "react";
import * as math from "mathjs";
import { index } from "mathjs";
import imprimirMatrix from "../imprimirMatrix";
const Iteraciones = ({ transpuesta, probabilidades }) => {
  const [iteracion, setIteracion] = useState([]);
  useEffect(() => {
    setIteracion([
      {
        prob: probabilidades,
        value: math.multiply(transpuesta, probabilidades),
      },
    ]);
  }, [probabilidades, transpuesta]);
  function iterar() {
    const iteracionesPasadas = [...iteracion];
    const ultimaItracion = iteracionesPasadas.pop();
    setIteracion([
      ...iteracion,
      {
        prob: ultimaItracion.value,
        value: math.multiply(transpuesta, ultimaItracion.value),
      },
    ]);
  }
  return (
    <Fragment>
      <div className="flex justify-end">
        <button
          onClick={iterar}
          className="bg-blue-500 py-3 px-6 rounded-md text-white uppercase font-bold"
        >
          Iterar
        </button>
      </div>
      {iteracion.map((item, index) => (
        <div>
          <h1 className="text-2xl font-bold text-center my-3">
            Iteración {index + 1}
          </h1>
          <div className="flex items-center justify-between">
            {imprimirMatrix(transpuesta)}
            <p className="text-5xl mx-5">*</p>
            {imprimirMatrix(item.prob)}
            <p className="text-5xl mx-5">=</p>
            {imprimirMatrix(item.value)}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default Iteraciones;
