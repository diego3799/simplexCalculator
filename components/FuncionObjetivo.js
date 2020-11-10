import React from "react";
import { Button, Card, Input, Select } from "./StyledItems";
import { css } from "styled-components";
import { useFormContext } from "react-hook-form";
const FuncionObjetivo = () => {
  const { register } = useFormContext();
  return (
    <Card>
      <h2>Primer paso</h2>
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
            <Input name="objX" type="text" ref={register} /> x1 +{" "}
            <Input name="objY" type="text" ref={register} /> x2 =
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
