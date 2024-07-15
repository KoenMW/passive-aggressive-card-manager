import Gun, { type IGunInstance } from "gun";
import { writable } from "svelte/store";
import type { card } from "@core/types";

const gun: IGunInstance = Gun({
  peers: ["http://gun-manhattan.herokuapp.com/gun"],
});

const cardStore = gun.get("cards");

export const cards = writable<card[]>([]);

export const setCards = (data: card[]) => {
  cardStore.put({ data: JSON.stringify(data) });
};

cardStore.on((data) => {
  cards.set(JSON.parse(data.data));
});
