import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Input, Select } from "./StyledItems";
import { css } from "styled-components";
import { useFormContext } from "react-hook-form";
const FuncionObjetivo = ({ variables, arrayVairables }) => {
  const { register } = useFormContext();

  if (variables <= 0)
    return (
      <Card>
        <h2>Segundo Paso</h2>
        <p>Selecciona el numero de variables</p>
      </Card>
    );
  console.log(arrayVairables);
  return (
    <Card>
      <h2>Segundo Paso</h2>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: space-between;
        `}
      >
        <div>
          <p>¿Cual es la función objetivo?</p>
          <div
            css={css`
              display: flex;
              align-items: center;
              min-width: 190px;
            `}
          >
            {arrayVairables.map((item, index) => {
              /**Si es el ultimo */

              if (arrayVairables.length - 1 !== index) {
                return (
                  <Fragment>
                    <Input name={`objX${index}`} type="text" ref={register} /> x
                    {index + 1} +
                  </Fragment>
                );
              } else {
                return (
                  <Fragment>
                    <Input name={`objX${index}`} type="text" ref={register} /> x
                    {index + 1} =
                  </Fragment>
                );
              }
            })}
            <Input name="objZ" type="text" ref={register} />
          </div>
        </div>
        <div>
          <p>¿Que quieres hacer?</p>
          <Select name="todo" ref={register}>
            <option value="max">Maximizar</option>
            <option value="min">Minimizar</option>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default FuncionObjetivo;
