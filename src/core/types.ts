export type cardNames =
  | "Curse"
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
    case "Curse":
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
  return `${card}.svg`;
};

export type cardHalf = {
  cardType: cardType;
  text: string;
};

export type card = {
  id: string;
  cardHalf1: cardHalf;
  cardHalf2: cardHalf | undefined;
};

export const createCard = (sides: 1 | 2): card => {
  const id = Math.random().toString(36);
  if (sides === 1) {
    return {
      id,
      cardHalf1: {
        cardType: {
          passive: false,
          type: "Mystery",
        },
        text: "placeholder",
      },
      cardHalf2: undefined,
    };
  } else {
    return {
      id,
      cardHalf1: {
        cardType: {
          passive: true,
          type: "Deck",
        },
        text: "placeholder",
      },
      cardHalf2: {
        cardType: {
          passive: false,
          type: "Movement",
        },
        text: "placeholder",
      },
    };
  }
};