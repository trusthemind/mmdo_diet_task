import React from "react";
import { Iteration } from "@/helpers/solver";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface IterationTableProps {
  iteration: Iteration;
}

const IterationTable: React.FC<IterationTableProps> = ({ iteration }) => {
  // Safeguard: Check if iteration and its properties are defined
  if (!iteration || !iteration.variables) {
    return <div>Error: Missing iteration data</div>;
  }

  const { iteration: it, objectiveValue, variables } = iteration;
  const {
    x1 = 0,
    x2 = 0,
    x3 = 0,
    x4 = 0,
    x5 = 0,
    x6 = 0,
  } = variables;

  return (
    <Table aria-label="Iteration Details" style={{ minWidth: "100%" }}>
      <TableHeader>
          <TableColumn>Рішень</TableColumn>
          <TableColumn>Значення</TableColumn>
          <TableColumn>Хліб (x1)</TableColumn>
          <TableColumn>Сало (x2)</TableColumn>
          <TableColumn>Маргарин (x3)</TableColumn>
          <TableColumn>Картопля (x4)</TableColumn>
          <TableColumn>Яйця (x5)</TableColumn>
          <TableColumn>Шоколад (x6)</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{it.toString()}</TableCell>
          <TableCell>{objectiveValue.toFixed(2)}</TableCell>
          <TableCell>{x1.toFixed(2)}</TableCell>
          <TableCell>{x2.toFixed(2)}</TableCell>
          <TableCell>{x3.toFixed(2)}</TableCell>
          <TableCell>{x4.toFixed(2)}</TableCell>
          <TableCell>{x5.toFixed(2)}</TableCell>
          <TableCell>{x6.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default IterationTable;
