import { values } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import SimplexSolver from "./SimplexSolver";
import { Card, Table } from "./StyledItems";
const _ = require("lodash");
const Solucion = ({ data }) => {
  const [simplex, setSimplex] = useState({ tablas: [] });
  let solver;
  useEffect(() => {
    if (data) {
      let solver = new SimplexSolver(
        { ...data.obj, z: 1 },
        data.restricciones,
        data.todo
      );
      solver.Solve();
      setSimplex(solver);
    }
  }, [data]);
  return (
    <Card>
      <h2>Solución</h2>
      {!data ? (
        <p>Termina de llenar los datos</p>
      ) : (
        <Fragment>
          {simplex.tablas.length > 0 && simplex.tablas.map((item) => item)}
        </Fragment>
      )}
    </Card>
  );
};

export default Solucion;
