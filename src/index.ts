import { getInput, setOutput } from "@actions/core";

export async function run() {
  const token = getInput("GITHUB_TOKEN");
  const input1 = getInput("input1");
  const input2 = getInput("input2");
  console.log("token", token);
  console.log("input1", input1);
  console.log("input2", input2);
  await setOutput("token", token);
  await setOutput("output1", input1);
  await setOutput("output2", input2);
}

run();
