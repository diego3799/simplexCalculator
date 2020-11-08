import styled from "styled-components";
export const Input = styled.input`
  box-sizing: border-box;
  width: 35px;
  padding: 4px 2px;
  line-height: 0.5;
  margin: 5px 3px;
  border-radius: 3px;
  border: 1px solid #adb5bd;
  outline: 2px solid transparent;
  outline-offset: 2px;
  &:focus {
    box-shadow: 0 0 0 3px rgb(0, 121, 140, 0.5);
  }
`;
export const Select = styled.select`
  box-sizing: border-box;
  padding: 4px 2px;
  margin: 5px 3px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid #adb5bd;
  outline: 2px solid transparent;
  outline-offset: 2px;
  &:focus {
    box-shadow: 0 0 0 3px rgb(0, 121, 140, 0.5);
  }
`;

export const Button = styled.button`
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;
  border: none;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: ${({ hover }) => hover};
  }
`;

export const Card = styled.div`
  font-family: "Poppins";
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 30px;
`;

export const Table = styled.table`
  margin: 10px 0;
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  font-family: "Poppins";
  word-wrap: break-word;
  tr {
    text-align: center;
    font-weight: 500;
  }
  th {
    background-color: #00798c;
    color: white;
    border-top: 1px solid white;
  }
  thead tr th:nth-child(2) {
    border-left: 1px solid white;
  }

  tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }

  tbody tr:nth-child(even) {
    background-color: #e5e5e5;
  }
`;
