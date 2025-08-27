import {z} from 'zod';
import {validateResponse} from "./validateResponse.ts";

// //**
//  *валидация пользователя
//  * This file defines the schema for a User object using Zod, a TypeScript-first schema declaration and validation library.
//  * It includes the fields for the user, such as id and username.
//  *//

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export function fetchUser(id: string): Promise<User> {
  /**
   * Запрос пользователя по ID к API.
   * This function fetches a user by their ID from the API and validates the response using Zod.
   * Fetches a user by ID from the API.
   * @param id - The ID of the user to fetch.
   * @returns A promise that resolves to the User object.
   */
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}

export function registerUser(username: string, password: string): Promise<void> {
  return fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  }).then(() => undefined);
}


export function Login(username: string, password: string): Promise<void> {
  return fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  })
    .then(validateResponse)
    .then(() => undefined);
}

// запрос пользователя текущего пользователя
// This function fetches the current user from the API and validates the response using Zod.
// Fetches the current user from the API.
// @returns A promise that resolves to the User object.
export function fetchMe(): Promise<User> {
  return fetch('/api/users/me')
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}