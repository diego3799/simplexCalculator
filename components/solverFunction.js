import { isArguments } from "lodash";
import React from "react";
import { Table } from "./StyledItems";
const _ = require("lodash");
export default class SimplexSolver {
  constructor(objetivo, restricciones, todo) {
    this.restricciones = restricciones;
    this.objetivo = objetivo;
    this.todo = todo;
    this.historyRenglones = [];
    this.tablas = [];
  }
  CrearRenglones() {
    let holgura = this.restricciones.length;
    let exceso = 0;
    const arrayRestricciones = this.restricciones.map((item, index) => {
      let renglones = [0, parseFloat(item.x1), parseFloat(item.x2)];
      switch (item.sign) {
        case "eq":
          /**Si es igual la neta es que no se jajaja
           * TODO: Preguntar que hacemos cuando tenemos igual
           */
          return [];

        case "le":
          /**Si es menos o igual se agregan variables de holgura */
          renglones[2 + index + 1] = 1;
          return renglones;

        case "ge":
          /**Si es mayor o igual se agregan variables de exceso y holgura */
          /**Agregamos una variable de exceso */
          exceso++;
          /**Aqui agregamos la variable de holgura */
          renglones[2 + index + 1] = 1;
          /**Aqui agregamos la variable de exceso */
          renglones[2 + holgura + exceso] = 1;

          return renglones;
      }
    });
    arrayRestricciones.push(
      this.todo === "max"
        ? [
            parseFloat(this.objetivo.z),
            -1 * this.objetivo.x1,
            -1 * this.objetivo.x2,
          ]
        : [parseFloat(this.objetivo.z), this.objetivo.x1, this.objetivo.x2]
    );
    let totVariables = 3 + holgura + exceso;

    /**Hay que llenar todos los vacios con ceros para evitar errores */
    let matrix = arrayRestricciones.map((item, index) => {
      if (index !== arrayRestricciones.length - 1) {
        item[totVariables] = parseFloat(this.restricciones[index].z);
      } else {
        /**TODO: Falta checar que si son de exceso agregarle los unos */
        for (let j = 2 + holgura + 1; j < totVariables; j++) {
          item[j] = this.todo === "min" ? 1 : -1;
        }
        item[totVariables] = 0;
      }
      let renglon = [];
      for (let i = 0; i < item.length; i++) {
        if (item[i] === undefined) {
          renglon.push(0);
        } else {
          renglon.push(item[i]);
        }
      }

      return renglon;
    });
    let variablesHeader = ["Z", "X1", "X2"];
    let variablesBase = [];
    for (let i = 0; i < holgura; i++) {
      variablesBase.push(`H${i + 1}`);
      variablesHeader.push(`H${i + 1}`);
    }
    variablesBase.push("Z");
    /**TODO: falta metodo de las dos fases */
    // console.log(variablesBase);
    // console.log(variablesHeader);
    this.variablesHeader = variablesHeader;
    this.matrix = matrix;
    this.exceso = exceso;
    this.totVariables = totVariables;
    this.holgura = holgura;
    return variablesBase;
  }

  CrearTabla(matrix, variablesBase) {
    const tabla = (
      <Table>
        <thead>
          <tr>
            <th></th>
            {this.variablesHeader.map((item) => (
              <th>{item}</th>
            ))}
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((item, index) => (
            <tr>
              <th>{variablesBase[index]}</th>
              {item.map((valoresRenglon) => (
                <td>{valoresRenglon}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
    this.tablas.push(tabla);
  }
  /**Tiene que ser recursivo, dado que no sabemos hasta donde puede terminar */
  Simplex_Method(matrix, variablesBase) {
    /**Primero tenemos que encontrar la columna pivote */
    /**La columna pivote es el valor más negativo en la fila de la función Z
     * En este caso es siempre el último renglon
     */
    let funcionZ = matrix.length - 1;
    let aux = 10000000;
    matrix[funcionZ].forEach((item, index) => {
      /**Si el valor ya habia salido no puede volver a salir */
      // if (!this.historyRenglones.includes(this.variablesHeader[index]))
      if (item < aux) {
        aux = item;
      }
    });
    let columnaPivote = _.indexOf(matrix[funcionZ], aux);
    console.log(aux, columnaPivote);
    /** Si no hay valor negativo, entonces acabamos
     * Aqui se acabo
     */
    if (aux >= 0) {
      return matrix;
    }

    /**Luego tenemos que encontrar el renglon pivote
     * Primero tenemos que sacar todas las valoraciones de las constantes de las restricciones
     * Y quedarnos con el valor más bajo
     */
    aux = 10000000;
    let evaluaciones = matrix.map((item, index) => {
      let rest = item[this.totVariables];
      let valor = item[columnaPivote];
      /**No se pueden evaluar las restricciones negativas */
      if (index !== funcionZ && rest >= 0) {
        let returnValue = rest / valor;
        if (returnValue < aux) aux = returnValue;
        return returnValue;
      }
      return null;
    });
    let renglonPivote = _.indexOf(evaluaciones, aux);
    let elementoPivote = matrix[renglonPivote][columnaPivote];
    /**Ahora tenemos que crear la nueva matriz */
    /**Tenemos cambiar el renglon de la base por la variable que entra */
    variablesBase[renglonPivote] = this.variablesHeader[columnaPivote];
    this.historyRenglones.push(this.variablesHeader[columnaPivote]);
    /**Convertimos el valor del renglon pivote a uno */
    const nuevoRenglon = matrix[renglonPivote].map((item) =>
      _.round(item / elementoPivote, 5)
    );

    /**Ahora tenemos que generar la nueva matriz a ser evaluada */

    let newMatrix = matrix.map((item, index) => {
      /**Primero hay que ver si el renglon no es el mismo que el pivote
       * Si si es lo saltamos
       */
      if (index !== renglonPivote) {
        /**Obtener el valor de esa columna */
        let valorColumna = item[columnaPivote];
        let renglonMod = item.map((elementRenglon, indexRenglon) => {
          return _.round(
            nuevoRenglon[indexRenglon] * -1 * valorColumna + elementRenglon,
            5
          );
        });
        return renglonMod;
      } else {
        return nuevoRenglon;
      }
    });
    this.CrearTabla(newMatrix, variablesBase);
    /**Ya que tenemos la nueva matriz,hacemos la llamada recursiva */
    return this.Simplex_Method(newMatrix, variablesBase);
    // console.log(evaluaciones);
  }
  Solve() {
    /**Primero se deben de crear la matriz */
    /**Esta funcion nos regresa las variables en la base */
    let variablesBase = this.CrearRenglones();
    /**Si tenemos una variable de exceso tenemos que hacer un procedimiento intermedio antes de pasara directamente al simplex */
    this.CrearTabla(this.matrix, variablesBase);
    if (this.exceso > 0) {
      console.log("tenemos que hacer algo mas :(");
    } else {
      /**Sino nos seguimos con el simplex */
      const resultados = this.Simplex_Method(this.matrix, variablesBase);
    }
  }
}
