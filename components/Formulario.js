import React, { useDebugValue, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { css } from "styled-components";
import FuncionObjetivo from "./FuncionObjetivo";
import Restricciones from "./Restricciones";
import Solucion from "./Solucion";
import { Button, Card, Input } from "./StyledItems";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema1 = yup.object({
  variables: yup
    .number()
    .typeError("El numero de variables es obligatorio")
    .min(2, "El minimo son 2 variables")
    .max(10, "El maximo son 10 variables")
    .required("El numero de variables es obligatorio"),
});
const shcema2 = yup.object({
  obj: {},
});
const Formulario = () => {
  const methods = useForm({});
  const { register, handleSubmit: onSubmit2, errors: errores1 } = useForm({
    resolver: yupResolver(schema1),
  });
  const { errors } = methods;
  const [data, setData] = useState(null);
  const [numVariables, setVariables] = useState([]);
  const onSubmit = (data) => {
    setData(data);
  };
  const onSubmitVariables = ({ variables }) => {
    let arrayVariables = [];
    for (let i = 0; i < variables; i++) {
      arrayVariables[i] = i;
    }
    setVariables(arrayVariables);
  };
  return (
    <section>
      <div
        css={css`
          display: grid;
          grid-template-columns: ${numVariables.length > 5 ? "1fr" : "1fr 1fr"};
          gap: 20px;
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        <div>
          <Card>
            <h2>Primer Paso</h2>
            {errores1.variables && <p>{errores1.variables.message}</p>}
            <p>¿Cuantas variables tiene el problema?</p>
            <form
              onSubmit={onSubmit2(onSubmitVariables)}
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Input
                type="number"
                css={css`
                  width: 100px;
                `}
                name="variables"
                ref={register}
              />
              <Button bgColor="#EDAE49" hover="#e08e09">
                Crear Formulario
              </Button>
            </form>
          </Card>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FuncionObjetivo numVariables={numVariables} />
              <Restricciones numVariables={numVariables} />
            </form>
          </FormProvider>
        </div>
        <Solucion data={data} />
      </div>
    </section>
  );
};

export default Formulario;

//Problema Exceso 1
// defaultValues: {
//   objX: 2,
//   objY: 4,
//   objZ: 1,
//   todo: "min",
//   restricciones: [
//     {
//       sign: "ge",
//       x1: 3,
//       x2: 2,
//       z: 24,
//     },
//     {
//       sign: "ge",
//       x1: 4,
//       x2: 5,
//       z: 60,
//     },
//   ],
// },

//Problema exceso 2
// defaultValues: {
//   objX: 3,
//   objY: 8,
//   objZ: 1,
//   todo: "min",
//   restricciones: [
//     {
//       sign: "ge",
//       x1: 1,
//       x2: 1,
//       z: 8,
//     },
//     {
//       sign: "le",
//       x1: 2,
//       x2: -3,
//       z: 0,
//     },
//     {
//       sign: "le",
//       x1: 1,
//       x2: 2,
//       z: 30,
//     },
//     {
//       sign: "ge",
//       x1: 3,
//       x2: -1,
//       z: 0,
//     },
//     {
//       sign: "le",
//       x1: 1,
//       x2: 0,
//       z: 10,
//     },
//     {
//       sign: "ge",
//       x1: 0,
//       x2: 1,
//       z: 9,
//     },
//   ],
// },
// Problema exceso 3

//Problema 1 pdf 1
// defaultValues: {
//   objX: 2,
//   objY: 7,
//   objZ: 1,
//   todo: "max",
//   restricciones: [
//     {
//       sign: "le",
//       x1: 1,
//       x2: 2,
//       z: 2,
//     },
//     {
//       sign: "le",
//       x1: 1,
//       x2: -1,
//       z: 1,
//     },
//   ],
// },
//Problema 2 pdf 1
// defaultValues: {
//   objX: 3,
//   objY: 2,
//   objZ: 1,
//   todo: "max",
//   restricciones: [
//     {
//       sign: "le",
//       x1: 4,
//       x2: 1,
//       z: 200,
//     },
//     {
//       sign: "le",
//       x1: 1,
//       x2: 1,
//       z: 80,
//     },
//     {
//       sign: "le",
//       x1: 0.3333,
//       x2: 1,
//       z: 60,
//     },
//   ],
// },
//Problema Youtube
// defaultValues: {
//   objX: 10,
//   objY: 20,
//   objZ: 1,
//   todo: "max",
//   restricciones: [
//     {
//       sign: "le",
//       x1: 4,
//       x2: 2,
//       z: 20,
//     },
//     {
//       sign: "le",
//       x1: 8,
//       x2: 8,
//       z: 20,
//     },
//     {
//       x1: 0,
//       x2: 2,
//       sign: "le",
//       z: 10,
//     },
//   ],
// },

//PDF 2
//Problema 1
// defaultValues: {
//   objX: 6,
//   objY: 2,
//   objZ: 1,
//   todo: "max",
//   restricciones: [
//     {
//       sign: "le",
//       x1: 1,
//       x2: 1,
//       z: 10,
//     },
//     {
//       sign: "le",
//       x1: 2,
//       x2: 1,
//       z: 16,
//     },
//   ],
// },
//Problema 5
// defaultValues: {
//   objX: 5,
//   objY: 2,
//   objZ: 1,
//   todo: "max",
//   restricciones: [
//     {
//       sign: "le",
//       x1: 6,
//       x2: 10,
//       z: 30,
//     },
//     {
//       sign: "le",
//       x1: 10,
//       x2: 4,
//       z: 20,
//     },
//   ],
// },
