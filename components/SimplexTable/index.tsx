import React, { JSXElementConstructor, ReactElement } from "react";
import { Iteration } from "@/helpers/solver";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
} from "@nextui-org/react";

interface SimplexTableProps {
  iterations: Iteration[];
  iterationIndex: number;
  onIterationChange: (index: number) => void;
}

const SimplexTable: React.FC<SimplexTableProps> = ({
  iterations,
  iterationIndex,
  onIterationChange,
}) => {
  const iteration = iterations[iterationIndex];

  if (!iteration) {
    return null;
  }

  const { variables, objectiveValue } = iteration;

  return (
    <>
      <Table aria-label="Simplex Table" style={{ minWidth: "100%" }}>
        <TableHeader>
          <TableColumn>Змінна</TableColumn>
          <TableColumn>Значення</TableColumn>
        </TableHeader>
        <TableBody>
          {
            Object.entries(variables).map(([variable, value]) => {
              return (
                <TableRow key={variable}>
                  <TableCell>{variable}</TableCell>
                  <TableCell>{value.toFixed(2)}</TableCell>
                </TableRow>
              ) as React.ReactNode;
            }) as any
          }
          <TableRow>
            <TableCell colSpan={1}>Кінцеве значення</TableCell>
            <TableCell>{objectiveValue.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Card style={{ padding: "$4", marginTop: "$4" }}>
        <Button
          onClick={() => onIterationChange(iterationIndex - 1)}
          disabled={iterationIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => onIterationChange(iterationIndex + 1)}
          disabled={iterationIndex === iterations.length - 1}
        >
          Next
        </Button>
      </Card>
    </>
  );
};

export default SimplexTable;
