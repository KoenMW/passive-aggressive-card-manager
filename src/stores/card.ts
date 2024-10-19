import Gun, { type IGunInstance } from "gun";
import { get, writable } from "svelte/store";
import type { card } from "@core/types";

const gun: IGunInstance = Gun({
  peers: ["wss://gun-manhattan.herokuapp.com/gun"],
});

const cardStore = gun.get("cards");

const a = document.createElement("a");
const input = document.createElement("input");
input.type = "file";
input.accept = ".json";
input.onchange = async (e) => {
  if (!e || !e.target) return;
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const text = await file.text();
    setCards(JSON.parse(text));
  }
};

export const cards = writable<card[]>([]);

export const setCards = (data: card[]) => {
  cardStore.put({ data: JSON.stringify(data) });
};

cardStore.on((data) => {
  cards.set(JSON.parse(data.data));
});

export const downloadJson = () => {
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(get(cards))], { type: "application/json" })
  );
  a.download = "cards.json";
  a.click();
};

export const uploadJson = () => {
  input.click();
};
