import type { card } from "./types";

const download = (data: string, filename: string) => {
  const button = document.createElement("a");
  button.download = `${filename}.png`;
  button.href = data;
  button.click();
  button.remove();
};

export const chunkArray = <T = card>(array: T[], size: number = 9): T[][] => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

export const checkStringFilter = (card: card, stringFilter: string) => {
  stringFilter = stringFilter.toLocaleLowerCase();
  return (
    !stringFilter ||
    card.cardHalf1.text.toLocaleLowerCase().includes(stringFilter) ||
    (card.cardHalf2 &&
      card.cardHalf2.text.toLocaleLowerCase().includes(stringFilter))
  );
};

export const checkPassiveFilter = (card: card, passiveFilter: boolean) => {
  return (
    !passiveFilter ||
    card.cardHalf1.cardType.passive ||
    (card.cardHalf2 && card.cardHalf2.cardType.passive)
  );
};
