import React, { Fragment, useEffect } from "react";
import SimplexSolver from "./solverFunction";
import { Card, Table } from "./StyledItems";

const Solucion = ({ data }) => {
  let solver;
  if (data) {
    solver = new SimplexSolver(
      { x1: data.objX, x2: data.objY, z: data.objZ },
      data.restricciones,
      data.todo
    );
    solver.Solve();
  }
  return (
    <Card>
      <h2>Solución</h2>
      {!data ? (
        <p>Termina de llenar los datos</p>
      ) : (
        <Fragment>
          {solver.tablas.length > 0 && solver.tablas.map((item) => item)}
        </Fragment>
      )}
    </Card>
  );
};

export default Solucion;
