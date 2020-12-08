import React, { Fragment } from "react";
import { Button, Card, Input, Select } from "./StyledItems";
import { css } from "styled-components";
import { useFormContext } from "react-hook-form";
const FuncionObjetivo = ({ numVariables }) => {
  const { register } = useFormContext();

  if(numVariables<=0){
    return <Card>
      <h2>Segundo Paso</h2>
      <p>Llena los campos anteriores</p>
    </Card>
  }
  return (
    <Card>
      <h2>Segundo paso</h2>
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
            {numVariables.map((item, index) => (
              <Fragment>
                <Input name={`obj.x${index+1}`} type="text" required ref={register} /> x
                {index + 1} {numVariables.length - 1 !== index && "+"}
              </Fragment>
            ))}
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
