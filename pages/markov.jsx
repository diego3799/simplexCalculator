import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import * as math from "mathjs";
import Estacionaria from "../components/Cadenas/Estacionaria";
import Iteraciones from "../components/Cadenas/Iteraciones";
const Markov = () => {
  const { register, handleSubmit } = useForm();
  const [mainMatrix, setMainMatrix] = useState(null);
  const [probMatrix, setProbMatrix] = useState(null);
  const [transpuesta, setTranspuesta] = useState(null);

  const identidad = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  function onSubmit(data) {
    setMainMatrix(data.matriz);
    setProbMatrix(data.prob);
    const trans = math.transpose(math.matrix(data.matriz));
    setTranspuesta(trans._data);
  }
  return (
    <Fragment>
      <div className=" shadow-md py-6 bg-gradient-to-r from-red-500 to-yellow-500">
        <div className="container mx-auto flex justify-between items-center text-white">
          <h1 className="text-xl"> Cadenas de Markov</h1>
          <nav className="text-lg">
            <a className="cursor-pointer mr-10" href="/">
              Simplex
            </a>
            <a className="cursor-pointer" href="/grafico">
              Metodo Gráfico
            </a>
          </nav>
        </div>
      </div>

      <div className="container mx-auto mt-10 grid lg::grid-cols-2 grid-cols-1 gap-10">
        <div className="shadow-xl p-10  ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 w-full mx-auto flex justify-between"
          >
            <div>
              <h1 className="text-xl text-center">Ingresa la Matriz Inicial</h1>
              <div>
                <div className="  my-5 flex justify-between">
                  <input
                    type="text"
                    name="matriz[0][0]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                  <input
                    type="text"
                    name="matriz[0][1]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                  <input
                    type="text"
                    name="matriz[0][2]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                </div>
                <div className=" my-5 flex justify-between">
                  <input
                    type="text"
                    name="matriz[1][0]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                  <input
                    type="text"
                    name="matriz[1][1]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                  <input
                    name="matriz[1][2]"
                    ref={register}
                    type="text"
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                </div>
                <div className=" my-5 flex justify-between">
                  <input
                    type="text"
                    name="matriz[2][0]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                  <input
                    type="text"
                    name="matriz[2][1]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                  <input
                    type="text"
                    name="matriz[2][2]"
                    ref={register}
                    className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                  />
                </div>
              </div>
            </div>

            {/* Aqui va la otra matriz */}
            <div>
              <h1 className="text-xl text-center">
                Ingresa la matriz de probabilidades
              </h1>
              <div
                style={{
                  height: 150,
                }}
                className="flex mt-5 flex-col justify-between items-center"
              >
                <input
                  type="text"
                  name="prob[0][0]"
                  ref={register}
                  className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                />
                <input
                  type="text"
                  name="prob[1][0]"
                  ref={register}
                  className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                />
                <input
                  type="text"
                  name="prob[2][0]"
                  ref={register}
                  className="border-2 w-14 border-gray-200 leading-relaxed text-gray-500 rounded-md focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 px-2 py-1"
                />
              </div>
            </div>
            <button className="bg-yellow-500 my-auto py-4 px-6 rounded-full text-white uppercase font-bold shadow-md hover:shadow-xl">
              Calcular
            </button>
          </form>
        </div>
        {transpuesta && (
          <Fragment>
            <div className="shadow-xl p-10">
              <Estacionaria
                matriz={mainMatrix}
                transpuesta={transpuesta}
                identidad={identidad}
              />
            </div>
            <div className="shadow-xl p-10">
            <Iteraciones probabilidades={probMatrix} transpuesta={transpuesta}/>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Markov;
