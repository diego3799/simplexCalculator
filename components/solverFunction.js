import { isArguments, sum } from "lodash";
import React, { Fragment } from "react";
import { css } from "styled-components";
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
    let contadorHolgura = 0;
    let variablesHeader = ["Z", "X1", "X2"];
    let variablesBase = [];
    const arrayRestricciones = this.restricciones.map((item, index) => {
      let renglones = [0, parseFloat(item.x1), parseFloat(item.x2)];
      switch (item.sign) {
        case "eq":
          /**Si es igual la neta es que no se jajaja
           * TODO: Preguntar que hacemos cuando tenemos igual
           */
          return renglones;

        case "le":
          contadorHolgura++;
          /**Si es menos o igual se agregan variables de holgura */
          renglones[2 + index + 1] = 1;
          /**Se agrega la variable de holgura a la base */
          variablesBase.push(`H${contadorHolgura}`);
          return renglones;

        case "ge":
          /**Si es mayor o igual se agregan variables de exceso y holgura */
          /**Agregamos una variable de exceso */
          /**Si la variable es igual a cero o negativa tenemos que modificar */
          contadorHolgura++;
          if (item.z <= 0) {
            renglones = [0, -1 * parseFloat(item.x1), -1 * parseFloat(item.x2)];
            renglones[2 + index + 1] = 1;
            variablesBase.push(`H${contadorHolgura}`);
            return renglones;
          } else {
            exceso++;
            /**Aqui agregamos la variable de holgura */
            renglones[2 + index + 1] = -1;
            /**Aqui agregamos la variable de exceso */
            renglones[2 + holgura + exceso] = 1;
            /**Se agrega vairable de exceso a la base */
            variablesBase.push(`E${exceso}`);

            return renglones;
          }
      }
    });
    arrayRestricciones.push(
      /**Si hay variables de exceso */
      exceso > 0
        ? [parseFloat(this.objetivo.z), 0, 0]
        : this.todo === "max"
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
        /**Esto es para las variables de exceso, llenarlas con 1 */
        for (let j = 2 + holgura + 1; j < totVariables; j++) {
          item[j] = 1;
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

    /**Agregar las vairables del header */
    /**Primero las de holgura */
    for (let i = 0; i < holgura; i++) {
      variablesHeader.push(`H${i + 1}`);
    }
    for (let i = 0; i < exceso; i++) {
      variablesHeader.push(`E${i + 1}`);
    }
    variablesBase.push("Z");
    this.variablesHeader = variablesHeader;
    this.matrix = matrix;
    this.exceso = exceso;
    this.totVariables = totVariables;
    this.holgura = holgura;
    return variablesBase;
  }

  CrearTabla(matrix, variablesBase, textoAuxiliar, coordenadas) {
    const tabla = (
      <Fragment>
        <p>{textoAuxiliar}</p>
        <Table>
          <thead>
            <tr>
              <th></th>
              {this.variablesHeader.map((item, index) => (
                <th
                  css={
                    coordenadas &&
                    index === coordenadas.columnaPivote &&
                    css`
                      background-color: #edae49 !important;
                    `
                  }
                >
                  {item}
                </th>
              ))}
              <th>Res</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((item, index) => (
              <tr>
                <th
                  css={
                    coordenadas &&
                    index === coordenadas.renglonPivote &&
                    css`
                      background-color: #edae49 !important;
                    `
                  }
                >
                  {variablesBase[index]}
                </th>
                {item.map((valoresRenglon, segundoIndex) => (
                  <td
                    css={
                      coordenadas
                        ? segundoIndex === coordenadas.columnaPivote ||
                          coordenadas.renglonPivote === index
                          ? css`
                              background-color: #edae49 !important;
                              color: white !important;
                              border-top: 1px solid white;
                              border-left: 1px solid white;
                              font-weight: bold;
                            `
                          : null
                        : null
                    }
                  >
                    {_.round(valoresRenglon, 3)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
    this.tablas.push(tabla);
  }
  /**Tiene que ser recursivo, dado que no sabemos hasta donde puede terminar */
  Simplex_Method(matrix, variablesBase, detener) {
    /**Primero tenemos que encontrar la columna pivote */
    /**La columna pivote es el valor más negativo en la fila de la función Z
     * En este caso es siempre el último renglon
     */
    let funcionZ = matrix.length - 1;
    let aux = 10000000;
    let indexColumnaPivote = 0;

    matrix[funcionZ].forEach((item, index) => {
      /**Si el valor ya habia salido no puede volver a salir */
      /**TODO:Eliminar */
      // if (!this.historyRenglones.includes(this.variablesHeader[index]))
      if (index !== this.totVariables) {
        if (item <= aux) {
          aux = item;
          indexColumnaPivote = index;
        }
      }
    });

    let columnaPivote = indexColumnaPivote;
    // _.indexOf(matrix[funcionZ], aux);
    /** Si no hay valor negativo, entonces acabamos
     * Aqui se acabo
     */
    /** Si tenemos variables de exceso tenemos que ver que ya no esten en la base */
    if (this.exceso > 0) {
      let flag = false;
      variablesBase.forEach((item) => {
        if (item.charAt(0) === "E") {
          flag = true;
        }
      });
      /**Si no hay  */
      if (!flag) {
        this.CrearTabla(matrix, variablesBase, "Terminamos el primer Simplex");
        return { matrix, variablesBase };
      }
    } else if (aux >= 0) {
      this.CrearTabla(matrix, variablesBase, "Esta es la tabla final");
      return matrix;
    }

    /**Luego tenemos que encontrar el renglon pivote
     * Primero tenemos que sacar todas las valoraciones de las constantes de las restricciones
     * Y quedarnos con el valor más bajo
     */
    aux = 10000000;
    let indexRenglonPivote = 0;
    let evaluaciones = matrix.map((item, index) => {
      let rest = item[this.totVariables];
      let valor = item[columnaPivote];
      /**No se pueden evaluar las restricciones negativas */
      if (index !== funcionZ && valor >= 0) {
        let returnValue = rest / valor;
        if (returnValue <= aux) {
          indexRenglonPivote = index;
          aux = returnValue;
        }
        return returnValue;
      }
      return null;
    });
    let renglonPivote = indexRenglonPivote;
    this.CrearTabla(matrix, variablesBase, "", {
      renglonPivote,
      columnaPivote,
    });
    // _.indexOf(evaluaciones, aux);
    let elementoPivote = matrix[renglonPivote][columnaPivote];
    /**Ahora tenemos que crear la nueva matriz */
    /**Tenemos cambiar el renglon de la base por la variable que entra */
    variablesBase[renglonPivote] = this.variablesHeader[columnaPivote];
    this.historyRenglones.push(this.variablesHeader[columnaPivote]);
    /**Convertimos el valor del renglon pivote a uno */
    const nuevoRenglon = matrix[renglonPivote].map(
      (item) => item / elementoPivote
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
          return (
            nuevoRenglon[indexRenglon] * -1 * valorColumna + elementRenglon
          );
        });
        return renglonMod;
      } else {
        return nuevoRenglon;
      }
    });

    /**A esta altura cambiamos las de exceso */
    /**Ya que tenemos la nueva matriz,hacemos la llamada recursiva */
    return this.Simplex_Method(newMatrix, variablesBase);
    // console.log(evaluaciones);
  }
  Simplex_Fase_1(matrix, variablesBase) {
    /**Primero se tienen que sumar los valores de los renglones artificiales */
    let suma = [];
    let funcionZ = matrix.length - 1;
    /**llenar de ceros */
    for (let i = 0; i < matrix[0].length; i++) {
      suma.push(0);
    }
    matrix.forEach((item, index) => {
      /**El ultimo renglon no se suma */

      if (
        index !== matrix.length - 1 &&
        variablesBase[index].charAt(0) === "E"
      ) {
        for (let i = 0; i < item.length; i++) {
          suma[i] = suma[i] + item[i];
        }
      }
    });

    /**Multimplicar todo por -1 */
    /**Y Sumar suma con el renglon objetivo */
    suma = suma.map((item, index) => {
      return -1 * item + matrix[funcionZ][index];
    });

    matrix[funcionZ] = suma;
    this.CrearTabla(
      matrix,
      variablesBase,
      "Suma de las variables de exceso * -1 + Z"
    );
    return matrix;
  }
  Convertir_Fase_2(matrix, variablesBase) {
    let matrixSimplex = matrix;
    /**Tenemos que borrar todas las variables de exceso */
    matrixSimplex = matrixSimplex.map((item) => {
      let renglonSinExceso = _.remove(
        item,
        (__, index) => index < this.totVariables - this.exceso
      );
      renglonSinExceso.push(item.pop());
      return renglonSinExceso;
    });
    /**Tenemos que modificar las variables del header */
    let newVariablesHeader = this.variablesHeader.filter(
      (item) => item.charAt(0) !== "E"
    );
    /**Tenemos que quitar el maximo de variables */
    this.totVariables = 3 + this.holgura;
    this.variablesHeader = newVariablesHeader;
    this.CrearTabla(
      matrixSimplex,
      variablesBase,
      "Quitamos las variables de exceso"
    );
    /**Tenemos que cambiar el renglon de Z */
    const nuevoRenglonZ =
      this.todo === "max"
        ? [
            parseFloat(this.objetivo.z),
            parseFloat(-1 * this.objetivo.x1),
            parseFloat(-1 * this.objetivo.x2),
          ]
        : [
            parseFloat(this.objetivo.z),
            parseFloat(this.objetivo.x1),
            parseFloat(this.objetivo.x2),
          ];
    /**Llenar de cero lo que falta */
    for (let i = 0; i < matrixSimplex[0].length; i++) {
      if (nuevoRenglonZ[i] === undefined) {
        nuevoRenglonZ[i] = 0;
      }
    }
    matrixSimplex.pop();
    matrixSimplex.push(nuevoRenglonZ);
    this.CrearTabla(matrixSimplex, variablesBase, "Modificamos el renglon Z");
    /**Aqui tenemos que hacer un cambio donde todos los renglones menos el ultimo
     * se suman
     */
    let renglonZ = matrixSimplex.length - 1;
    let renglonesSumados = [];
    let renglonesIntermedios = [];
    matrixSimplex.forEach((item, index) => {
      if (index !== renglonZ) {
        /**Primero tenemos que obtener el valor a multiplicar */
        let valor_multiplicar = 0;
        for (let i = 0; i < item.length; i++) {
          if (item[i] === 1) {
            valor_multiplicar = matrixSimplex[renglonZ][i];
            break;
          }
        }
        const renglonModificado = item.map(
          (valor) => valor * -1 * valor_multiplicar
        );
        renglonesIntermedios.push(renglonModificado);
      }
    });
    /**Sumamos los renglones */
    for (let i = 0; i < matrixSimplex[0].length; i++) {
      let acum = 0;
      for (let j = 0; j < renglonesIntermedios.length; j++) {
        acum += renglonesIntermedios[j][i];
      }
      renglonesSumados.push(acum);
    }
    let renglonModificado = [];
    for (let i = 0; i < renglonesSumados.length; i++) {
      renglonModificado[i] = matrixSimplex[renglonZ][i] + renglonesSumados[i];
    }
    matrixSimplex[renglonZ] = [...renglonModificado];
    this.CrearTabla(
      matrixSimplex,
      variablesBase,
      "Hacer 0 las variables de la base"
    );
    this.exceso = 0;
    return this.Simplex_Method(matrixSimplex, variablesBase);
  }
  Solve() {
    /**Primero se deben de crear la matriz */
    /**Esta funcion nos regresa las variables en la base */
    let resultados;
    let variablesBase = this.CrearRenglones();
    /**Si tenemos una variable de exceso tenemos que hacer un procedimiento intermedio antes de pasara directamente al simplex */
    this.CrearTabla(this.matrix, variablesBase, "Tabla inicial");

    if (this.exceso > 0) {
      const matrizFase1 = this.Simplex_Fase_1(this.matrix, variablesBase);
      const finalSimplex1 = this.Simplex_Method(matrizFase1, variablesBase);
      resultados = this.Convertir_Fase_2(
        finalSimplex1.matrix,
        finalSimplex1.variablesBase
      );
    } else {
      /**Sino nos seguimos con el simplex */
      resultados = this.Simplex_Method(this.matrix, variablesBase);
    }
    console.table(resultados);
    /**Crear la tabla de los resultados */
    const Tableresultados = (
      <Table>
        <thead>
          <th></th>
          <th>Valores optimos</th>
        </thead>
        <tbody>
          {resultados.map((item, index) => (
            <tr>
              <th>{variablesBase[index]}</th>
              <td>
                {index === resultados.length - 1 && this.todo === "min"
                  ? -1 * _.round(resultados[index][resultados[0].length - 1], 3)
                  : _.round(resultados[index][resultados[0].length - 1], 3)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
    this.tablas.push(Tableresultados);
  }
}
