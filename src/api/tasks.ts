import { Platform } from "react-native";

import { Task } from "../types/task";

// const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const HOST = "192.168.1.177";
const BASE_URL = `http://${HOST}:4000/api/tasks`;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body.error || body.message || `Request failed (${res.status})`
    );
  }
  return res.json();
}

export function fetchTasks(): Promise<Task[]> {
  console.log("BASE_URL", BASE_URL);
  return fetch(BASE_URL).then((res) => handle<Task[]>(res));
}

export function createTask(title: string): Promise<Task> {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => handle<Task>(res));
}

export function updateTask(
  id: number,
  data: { title: string; completed: boolean }
): Promise<Task> {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => handle<Task>(res));
}

export function deleteTask(id: number): Promise<void> {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then((res) => handle<{ message: string }>(res))
    .then(() => undefined);
}
