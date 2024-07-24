"use client";
import IterationTable from "@/components/IterationTable";
import SimplexTable from "@/components/SimplexTable";
import {
  DietProblemInputs,
  Iteration,
  solveDietProblem,
} from "@/helpers/solver";
import { Button, Card, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";

const Home = () => {
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [iterationIndex, setIterationIndex] = useState<number>(0);
  const [inputs, setInputs] = useState<DietProblemInputs>({
    coefficients: [5, 30, 40, 5, 180, 400],
    proteinBounds: 6,
    fatBounds: 4,
    carbBounds: 20,
  });

  const handleInputChange = (index: number, value: number) => {
    setInputs((prev) => {
      const newCoefficients = [...prev.coefficients];
      newCoefficients[index] = value;
      return { ...prev, coefficients: newCoefficients };
    });
  };

  const handleBoundsChange = (name: string, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSolveProblem = async () => {
    try {
      const result = await solveDietProblem(inputs);
      setIterations(result);
    } catch (error) {
      console.error("Error solving diet problem:", error);
    }
  };

  return (
    <Card className="App">
      <CardHeader>Симплекст таблиця</CardHeader>
      <div>
        <h2>Коефіціенти</h2>
        {inputs.coefficients.map((coef, index) => (
          <div key={index}>
            x{index + 1}:
            <Input
              type="number"
              value={coef.toString()}
              onChange={(e) => handleInputChange(index, Number(e.target.value))}
            />
          </div>
        ))}
      </div>
      <div>
        <h2>Constraints Bounds</h2>
        <div>
          Білки:
          <Input
            type="number"
            value={inputs.proteinBounds.toString()}
            onChange={(e) =>
              handleBoundsChange("proteinBounds", Number(e.target.value))
            }
          />
        </div>
        <div>
          Жири:
          <Input
            type="number"
            value={inputs.fatBounds.toString()}
            onChange={(e) =>
              handleBoundsChange("fatBounds", Number(e.target.value))
            }
          />
        </div>
        <div>
          Вуглеводи:
          <Input
            type="number"
            value={inputs.carbBounds.toString()}
            onChange={(e) =>
              handleBoundsChange("carbBounds", Number(e.target.value))
            }
          />
        </div>
      </div>
      <Button onClick={handleSolveProblem}>Solve Problem</Button>
      {iterations.map((iteration, key) => (
        <IterationTable key={key} iteration={iteration} />
      ))}
      <SimplexTable
        iterations={iterations}
        iterationIndex={iterationIndex}
        onIterationChange={setIterationIndex}
      />
    </Card>
  );
};
export default Home;
