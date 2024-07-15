import { writable } from "svelte/store";
import Home from "@views/home.svelte";

export type Route = {
  name: string;
  path: string;
  component: any;
};

export const path = writable(window.location.pathname);
export const parameters = writable<string[]>([]);

path.subscribe((newPath) => {
  parameters.set(newPath.split("/").filter(Boolean).splice(1));
});

export const pages: Route[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
];

export const goTo = (newPath: string) => {
  history.pushState({}, "", newPath);
  path.update((oldPath) => {
    localStorage.setItem("redirectPage", oldPath);
    return newPath.split("?")[0];
  });
};
