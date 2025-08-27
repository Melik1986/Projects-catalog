import {useEffect, useState} from "react";
import {z} from "zod";
import {validateResponse} from "./validateResponse.ts";
// Валидация поста
// This file defines the schema for a Post object using Zod, a TypeScript-first schema declaration and validation library.
// It includes the fields for the post, such as id, text, authorId, and createdAt.
export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostList = z.array(PostSchema);

export type PostList = z.infer<typeof PostList>;

export const FetchPostListSchema = z.object({
  list: PostList,
});

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;

// ансинхроная функция для получения списка постов
export function fetchPostList(): Promise<FetchPostListResponse> {
  // Fetch the list of posts from the API
  return fetch("/api/posts")
    .then((response) => response.json())
    .then((data) => FetchPostListSchema.parse(data));
}

interface IdleRequestState {
  status: "idle";
}

interface LoadingRequestState {
  status: "pending";
}

interface SuccessRequestState {
  status: "success";
  data: PostList;
}

interface ErrorRequestState {
  status: "error";
  error: unknown;
}

type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | SuccessRequestState
  | ErrorRequestState;

export function usePostList() {
  const [state, setState] = useState<RequestState>({status: "idle"});

  useEffect(() => {
    if (state.status === "pending") {
      fetchPostList()
        .then((data) => {
          setState({status: "success", data: data.list});
        })
        .catch((error) => {
          setState({status: "error", error});
        });
    }
  }, [state]);

  useEffect(() => {
    // Initialize the state to pending when the component mounts
    setState({status: "pending"});
  }, []);

  const refetch = () => {
    // Refetch the post list
    setState({status: "pending"});
  };

  return {state, refetch};
}

export async function userPostList(userId: string): Promise<FetchPostListResponse> {
  // Fetch the list of posts by a specific user from the API
  const response = await fetch(`/api/users/${userId}/posts`);
  const data = await response.json();
  return FetchPostListSchema.parse(data);
}

export  function  createPost(text: string): Promise<void> {
  return fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text}),
  })
    .then(validateResponse)
    .then(() => undefined);
}
