import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Input } from "./StyledItems";

const NumeroRestricciones = ({ setVariables }) => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    setVariables(data.variables);
  };
  return (
    <Card>
      <h2>Primer Paso</h2>
      <p>¿Cuantas variables tiene el problema?</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        <Button bgColor="#EDAE49">Crear Formulario</Button>
      </form>
    </Card>
  );
};

export default NumeroRestricciones;
