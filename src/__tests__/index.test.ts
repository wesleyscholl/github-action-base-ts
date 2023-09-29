import { run } from "../index";
import { graphql } from "@octokit/graphql";
import * as core from "@actions/core";
import { mocked } from "jest-mock";

// Mock the external dependencies
jest.mock("@octokit/graphql");
jest.mock("@actions/core");

const mockedGetInput = mocked(core.getInput);
const mockedSetFailed = mocked(core.setFailed);
const mockedSetOutput = mocked(core.setOutput);
const mockedGraphQL = mocked(graphql);

beforeEach(() => {
  // Clear mock calls and reset any mocked values before each test
  jest.clearAllMocks();

  // Mock getInput, setFailed, and setOutput from @actions/core
  jest.mock("@actions/core", () => ({
    getInput: mockedGetInput,
    setFailed: mockedSetFailed,
    setOutput: mockedSetOutput,
  }));
  // Mock the GITHUB_EVENT_PATH
  process.env.GITHUB_EVENT_PATH = "src/event.json";
});

afterAll(() => {
  // Restore the original process.env object after testing
  process.env.GITHUB_EVENT_PATH = "src/event.json";
});

test("run function successfully runs", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("2000");

  // Mock the GraphQL response
  const mockedResponse = {
    addDiscussionComment: {
      clientMutationId: "1234",
      comment: {
        id: "commentId",
        body: "Test comment",
      },
    },
  };
  mockedGraphQL.mockResolvedValueOnce(mockedResponse);

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", "commentId");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", "Test comment");
  expect(mockedSetOutput).toHaveBeenCalledWith("clientMutationId", "1234");
});

test("run function handles GraphQL error", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("5");

  // Mock the GraphQL error
  const errorMessage = "GraphQL error";
  mockedGraphQL.mockRejectedValueOnce(new Error(errorMessage));

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetFailed).toHaveBeenCalledWith(errorMessage);
  expect(mockedSetOutput).not.toHaveBeenCalled();
});

test("run function handles missing inputs", async () => {
  // Mock missing inputs
  mockedGetInput.mockReturnValueOnce(""); // Missing token
  mockedGetInput.mockReturnValueOnce(""); // Missing commentBody
  mockedGetInput.mockReturnValueOnce(""); // Missing delay

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function handles zero delay", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("0"); // Zero delay

  // Mock the GraphQL response
  const mockedResponse = {
    addDiscussionComment: {
      clientMutationId: "1234",
      comment: {
        id: "commentId",
        body: "Test comment",
      },
    },
  };
  mockedGraphQL.mockResolvedValueOnce(mockedResponse);

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", "commentId");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", "Test comment");
  expect(mockedSetOutput).toHaveBeenCalledWith("clientMutationId", "1234");
});

test("run function handles missing commentBody input", async () => {
  // Mock missing inputs
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("");
  mockedGetInput.mockReturnValueOnce("5");

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function validates inputs", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce(""); // Missing token
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("5");

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedSetOutput).toHaveBeenCalledTimes(4);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function handles delay", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("3000");

  // Mock the setTimeout function
  const mockedSetTimeout = jest.spyOn(global, "setTimeout");

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function handles invalid delay_milliseconds input", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("abc"); // Invalid delay_milliseconds input

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function handles negative delay", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("-5000"); // Negative delay

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function handles empty discussion ID", async () => {
  // Mock the empty input
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("0"); // Zero delay

  // Mock the GraphQL response
  const mockedResponse = {
    addDiscussionComment: {
      clientMutationId: "1234",
      comment: {
        id: "commentId",
        body: "Test comment",
      },
    },
  };
  mockedGraphQL.mockResolvedValueOnce(mockedResponse);

  // Mock the event payload
  process.env.GITHUB_EVENT_PATH = "src/testevent.json";

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", "commentId");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", "Test comment");
});

test("run function handles empty comment body", async () => {
  // Mock the empty input
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce(""); // Empty comment body
  mockedGetInput.mockReturnValueOnce("0"); // Zero delay

  // Mock the GraphQL response
  const mockedResponse = {
    addDiscussionComment: {
      clientMutationId: "1234",
      comment: {
        id: "commentId",
        body: "Test comment",
      },
    },
  };
  mockedGraphQL.mockResolvedValueOnce(mockedResponse);

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", "commentId");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", "Test comment");
});

test("run function handles GraphQL request failure", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("0"); // Zero delay

  // Mock the GraphQL request failure
  mockedGraphQL.mockRejectedValueOnce(new Error("GraphQL request failure"));

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetFailed).toHaveBeenCalledWith("GraphQL request failure");
  expect(mockedSetOutput).not.toHaveBeenCalled();
});

test("run function handles missing addDiscussionComment field in GraphQL response", async () => {
  process.env.GITHUB_EVENT_PATH = "src/testevent.json";
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("0"); // Zero delay

  // Mock the GraphQL response
  const mockedResponse = {
    // Missing addDiscussionComment field
  };
  mockedGraphQL.mockResolvedValueOnce(mockedResponse);

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

// Test case for invalid token input
test("run function handles invalid token input", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("INVALID_TOKEN");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("5");

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
  expect(mockedSetFailed).toHaveBeenCalledWith("GitHub token missing or invalid, please enter a GITHUB_TOKEN");
});

// Test case for invalid discussion ID input
test("run function handles invalid discussion ID input", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce(" ");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("INVALID_DISCUSSION_ID");
  mockedGetInput.mockReturnValueOnce("1000");
  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

// Test case for invalid delay_milliseconds input
test("run function handles invalid delay_milliseconds input", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("abc"); // Invalid delay_milliseconds input

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

// Test case for negative delay
test("run function handles negative delay", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("-5000"); // Negative delay

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

// Test case for empty discussion ID and empty comment body
test("run function handles empty discussion ID and empty comment body", async () => {
  // Mock the empty input
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce(""); // Empty comment body
  mockedGetInput.mockReturnValueOnce(""); // Empty delay_milliseconds

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});

test("run function handles empty token input", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce(""); // Empty token
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("5");

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "D_kwDOKVDDec4AVkAC");
});

test("run function handles invalid discussionId input", async () => {
  // Mock the input values
  mockedGetInput.mockReturnValueOnce("{{ github.token }}");
  mockedGetInput.mockReturnValueOnce("Test comment");
  mockedGetInput.mockReturnValueOnce("5");
  process.env.GITHUB_EVENT_PATH = "src/invalidevent.json";

  // Mock an invalid discussionId
  const eventPayload = {
    discussion: {
      node_id: "INVALID_DISCUSSION_ID",
    },
  };
  mockedGraphQL.mockResolvedValueOnce({}); // GraphQL response doesn't matter here

  // Run the `run` function
  await run();

  // Assertions
  expect(mockedGetInput).toHaveBeenCalledTimes(3);
  expect(mockedSetFailed).toHaveBeenCalledWith("Invalid or missing discussionId.");
  expect(mockedSetOutput).toHaveBeenCalledWith("discussionId", "INVALID_DISCUSSION_ID");
  expect(mockedSetOutput).toHaveBeenCalledWith("commentId", undefined);
  expect(mockedSetOutput).toHaveBeenCalledWith("commentBody", undefined);
});
