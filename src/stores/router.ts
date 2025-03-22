import { writable } from "svelte/store";

export type routes = "" | "download" | "half";

export const route = writable<routes>("");
