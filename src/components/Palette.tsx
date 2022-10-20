import React, { FC, useCallback, useState } from "react";
import { Button, Stack } from "@mui/material";
import { Color } from "../types/Color";
import { generateColor } from "../helper/generateColor";
import { ColorCard } from "./ColorCard";

type PaletteProps = {
  onSelectedPrimaryColor: (color: Color) => void;
};

const NUMBER_OF_COLORS = 8;

export const Palette: FC<PaletteProps> = ({ onSelectedPrimaryColor }) => {
  const [colors, setColors] = useState<Color[]>([]);

  const generateColorPalette = useCallback(() => {
    const likedColors = colors.filter((color) => color.liked);
    setColors([
      ...likedColors,
      ...Array(NUMBER_OF_COLORS - likedColors.length)
        .fill(undefined)
        .map((_) => generateColor()),
    ]);
  }, [colors]);

  const toggleColorLike = useCallback(
    (selectedColor: Color) => {
      setColors(
        colors.map((color) =>
          color.value !== selectedColor.value
            ? color
            : { ...color, liked: !color.liked }
        )
      );
    },
    [colors]
  );

  return (
    <>
      <Button onClick={generateColorPalette}>Generate Color Palette</Button>
      <Stack direction="row" spacing={0} flexWrap="wrap">
        {colors.map((color) => (
          <ColorCard
            key={color.value}
            color={color}
            setAsPrimary={onSelectedPrimaryColor}
            toggleLike={toggleColorLike}
          />
        ))}
      </Stack>
    </>
  );
};
