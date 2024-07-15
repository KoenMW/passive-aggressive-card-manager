import Gun, { type IGunInstance } from "gun";
import { get, writable } from "svelte/store";
import type { card } from "@core/types";

const gun: IGunInstance = Gun(["http://gun-manhattan.herokuapp.com/gun"]);

const cardStore = gun.get("cards");

export const cards = writable<card[]>([]);

let updatetimeout: NodeJS.Timeout | null = null;

export const setCards = (data: card[]) => {
  //wait for 1 second before updating the data
  if (!updatetimeout) {
    updatetimeout = setTimeout(() => {
      cardStore.put({ data: JSON.stringify(data) });
      updatetimeout = null;
    }, 1000);
  }
};

cardStore.on((data) => {
  cards.set(JSON.parse(data.data));
});
