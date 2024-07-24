import { LP, GLPK } from "glpk.js";
import GLPKConstructor from "glpk.js";

type Details = {
  dual: { [key: string]: number };
  status: number;
  vars: { [key: string]: number };
  z: number;
};
export interface Iteration {
  iteration: number;
  objectiveValue: number;
  variables: { [key: string]: number };
  details?: Details;
}

export interface DietProblemInputs {
  coefficients: number[];
  proteinBounds: number;
  fatBounds: number;
  carbBounds: number;
}

export const solveDietProblem = async (
  inputs: DietProblemInputs
): Promise<Iteration[]> => {
  const GLPK: GLPK = await GLPKConstructor();

  const lp: LP = {
    name: "Задача дієти",
    objective: {
      direction: GLPK.GLP_MIN,
      name: "Вартість",
      vars: [
        { name: "x1", coef: inputs.coefficients[0] }, // Хліб
        { name: "x2", coef: inputs.coefficients[1] }, // Сало
        { name: "x3", coef: inputs.coefficients[2] }, // Маргарин
        { name: "x4", coef: inputs.coefficients[3] }, // Картопля
        { name: "x5", coef: inputs.coefficients[4] }, // Яйця
        { name: "x6", coef: inputs.coefficients[5] }, // Шоколад
      ],
    },
    subjectTo: [
      {
        name: "Білки",
        vars: [
          { name: "x1", coef: 0.1 },
          { name: "x2", coef: 0.2 },
          { name: "x5", coef: 0.6 },
          { name: "x6", coef: 0.6 },
        ],
        bnds: { type: GLPK.GLP_LO, ub: 0, lb: inputs.proteinBounds },
      },
      {
        name: "Жири",
        vars: [
          { name: "x2", coef: 0.5 },
          { name: "x3", coef: 0.8 },
          { name: "x6", coef: 0.2 },
        ],
        bnds: { type: GLPK.GLP_LO, ub: 0, lb: inputs.fatBounds },
      },
      {
        name: "Вуглеводи",
        vars: [
          { name: "x1", coef: 0.5 },
          { name: "x2", coef: 0.1 },
          { name: "x4", coef: 0.5 },
          { name: "x6", coef: 0.2 },
        ],
        bnds: { type: GLPK.GLP_LO, ub: 0, lb: inputs.carbBounds },
      },
    ],
  };

  const iterations: Iteration[] = [];

  try {
    const result = await GLPK.solve(lp, {
      msglev: GLPK.GLP_MSG_ALL,
      cb: {
        call: (progress: any) => {
          if (progress.ivart && Array.isArray(progress.ivart)) {
            iterations.push({
              iteration: progress.itn,
              objectiveValue: progress.objval,
              variables: {
                x1: progress.ivart[1] ?? 0,
                x2: progress.ivart[2] ?? 0,
                x3: progress.ivart[3] ?? 0,
                x4: progress.ivart[4] ?? 0,
                x5: progress.ivart[5] ?? 0,
                x6: progress.ivart[6] ?? 0,
              },
              details: {
                status: progress.status,
                dual: progress.dual,
                vars: progress.vars, // Ensure 'vars' is included
                z: progress.objval, // Update with the correct objective value
              },
            });
          } else {
            console.warn('ivart is undefined or not an array:', progress.ivart);
          }
        },
        each: 1,
      },
    });

    if (result.result.status === GLPK.GLP_OPT) {
      iterations.push({
        iteration: iterations.length + 1,
        objectiveValue: result.result.z,
        variables: {
          x1: result.result.vars?.x1 ?? 0,
          x2: result.result.vars?.x2 ?? 0,
          x3: result.result.vars?.x3 ?? 0,
          x4: result.result.vars?.x4 ?? 0,
          x5: result.result.vars?.x5 ?? 0,
          x6: result.result.vars?.x6 ?? 0,
        },
        // details: result.result, // Include result details in the final iteration
      });
    } else {
      throw new Error("Оптимальне рішення не знайдено");
    }
  } catch (error) {
    console.error("Помилка при розв'язанні задачі:", error);
    throw error;
  }

  return iterations;
};