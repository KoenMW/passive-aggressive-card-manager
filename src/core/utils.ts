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
