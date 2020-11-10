import { values } from "lodash";
import React, { Fragment, useEffect } from "react";
import SimplexSolver from "./SimplexSolver";
import { Card, Table } from "./StyledItems";
const _ = require("lodash");
const Solucion = ({ data }) => {
  let solver;
  if (data) {
    solver = new SimplexSolver(
      { ...data.obj, z: 1 },
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
