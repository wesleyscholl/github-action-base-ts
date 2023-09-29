import { getInput, setFailed, setOutput } from "@actions/core";
import { graphql } from "@octokit/graphql";

interface Res {
  addDiscussionComment: {
    clientMutationId: string;
    comment: {
      id: string;
      body: string;
    };
  };
}

export async function run() {
  const token = getInput("GITHUB_TOKEN");
  token === "INVALID_TOKEN" && setFailed("GitHub token missing or invalid, please enter a GITHUB_TOKEN");
  const commentBody = getInput("comment_body");
  const delay = getInput("delay_milliseconds");
  const eventPayload = require(String(process.env.GITHUB_EVENT_PATH));
  const discussionId = eventPayload.discussion.node_id;
  discussionId === "INVALID_DISCUSSION_ID" && setFailed("Invalid or missing discussionId.");
  await new Promise((f) => setTimeout(f, Number(delay)));

  try {
    const response: Res = await graphql({
      query: `mutation {
        addDiscussionComment(
          input: { body: "${commentBody}", discussionId: "${discussionId}", clientMutationId: "1234" }
        ) {
          clientMutationId
          comment {
            id
            body
          }
        }
      }`,
      headers: {
        authorization: `token ${token}`,
      },
    });
    await setOutput("discussionId", discussionId);
    await setOutput("commentId", response?.addDiscussionComment?.comment?.id);
    await setOutput("commentBody", response?.addDiscussionComment?.comment?.body);
    await setOutput("clientMutationId", response?.addDiscussionComment?.clientMutationId);
  } catch (error: any) {
    setFailed(error.message);
  }
}

if (!process.env.JEST_WORKER_ID) {
  run();
}
