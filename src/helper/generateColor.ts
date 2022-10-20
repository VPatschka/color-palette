import { Color } from "../types/Color";

const generateHexValue = (): number => {
  return Math.round(Math.random() * 255);
};

// used to determine if color is light or dark, per ITU-R BT.709
const isLight = (red: number, green: number, blue: number) => {
  const luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  return luma >= 128;
};

export const generateColor = (): Color => {
  const red = generateHexValue();
  const green = generateHexValue();
  const blue = generateHexValue();

  const value =
    "#" +
    [red, green, blue]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("");

  return { value, liked: false, isLight: isLight(red, green, blue) };
};
