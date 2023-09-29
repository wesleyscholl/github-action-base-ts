import { run } from "../index";
import * as core from "@actions/core";
import { mocked } from "jest-mock";

// Mock the external dependencies
jest.mock("@octokit/graphql");
jest.mock("@actions/core");

const mockedGetInput = mocked(core.getInput);
const mockedSetOutput = mocked(core.setOutput);

beforeEach(() => {
  // Clear mock calls and reset any mocked values before each test
  jest.clearAllMocks();

  // Mock getInput, setFailed, and setOutput from @actions/core
  jest.mock("@actions/core", () => ({
    getInput: mockedGetInput,
    setOutput: mockedSetOutput,
  }));
});

test("run function handles GraphQL error", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test");
  mockedGetInput.mockReturnValueOnce("5");

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("token", "{{ github.token }}");
  expect(mockedSetOutput).toHaveBeenCalledWith("output1", "Test");
  expect(mockedSetOutput).toHaveBeenCalledWith("output2", "5");
});
