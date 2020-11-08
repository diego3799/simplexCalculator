import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { css } from "styled-components";
import { Button, Input, Select, Card } from "./StyledItems";

const Restricciones = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "restricciones",
  });
  return (
    <Card>
      <h2>Segundo Paso</h2>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        `}
      >
        <Button
          type="button"
          bgColor="#00798C"
          hover="#33647c"
          onClick={() => append({})}
        >
          Agregar Restricción
        </Button>
        <Button
          css={css`
            width: 110px;
          `}
          bgColor="#7FB685"
          hover="#426a5a"
          type="submit"
        >
          Resolver
        </Button>
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 5px 0;
          `}
        >
          <div
            css={css`
              min-width: 224px;
            `}
          >
            <Input
              type="text"
              ref={register()}
              defaultValue={field.x1}
              name={`restricciones[${index}].x1`}
            />{" "}
            x1 +{" "}
            <Input
              type="text"
              ref={register()}
              defaultValue={field.x2}
              name={`restricciones[${index}].x2`}
            />{" "}
            x2
            <Select
              defaultValue={field.sign}
              ref={register()}
              name={`restricciones[${index}].sign`}
            >
              <option value="eq">{"="}</option>
              <option value="ge">{"≥"}</option>
              <option value="le">{"≤"}</option>
            </Select>
            <Input
              type="text"
              defaultValue={field.z}
              ref={register()}
              name={`restricciones[${index}].z`}
            />
          </div>
          <Button
            css={css`
              width: 110px;
            `}
            type="button"
            bgColor="#D1495B"
            hover="#902d41"
            onClick={() => remove(index)}
          >
            Eliminar
          </Button>
        </div>
      ))}
    </Card>
  );
};

export default Restricciones;
