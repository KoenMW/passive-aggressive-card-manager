export type cardNames =
  | "curse"
  | "Deck"
  | "Movement"
  | "Change"
  | "Mystery"
  | "Board";

export type cardType = {
  type: cardNames;
  passive: boolean;
};

export const getColour = (card: cardNames): string => {
  switch (card) {
    case "curse":
      return "#DC77FF";
    case "Deck":
      return "#8995D5";
    case "Movement":
      return "#FDFF84";
    case "Change":
      return "#FFA944";
    case "Mystery":
      return "#F35555";
    case "Board":
      return "#88F355";
    default:
      return "#FFFFFF";
  }
};

export const getSVG = (card: cardNames): string => {
  switch (card) {
    case "curse":
      return "Curse.svg";
    case "Deck":
      return "Deck.svg";
    case "Movement":
      return "Movement.svg";
    case "Change":
      return "Change.svg";
    case "Mystery":
      return "Mystery.svg";
    case "Board":
      return "Board.svg";
    default:
      return "Blank.svg";
  }
};

export type cardHalf = {
  cardType: cardType;
  text: string;
};

export type card = {
  cardHalf1: cardHalf;
  cardHalf2: cardHalf | undefined;
};
