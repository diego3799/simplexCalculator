import React, { Fragment } from "react";
import _ from "lodash";
export default function (matrix) {
  return (
    <Fragment>
      <table className="w-full text-xl text-center border border-gray-400">
        <tbody>
          {matrix.map((item) => (
            <tr>
              {item.map((value) => (
                <td className=" border border-gray-400">{_.round(value, 5)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
