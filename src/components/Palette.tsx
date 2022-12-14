import React, { FC, useCallback, useState } from "react";
import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Color } from "../types/Color";
import { generateColor } from "../helper/generateColor";
import { ColorCard } from "./ColorCard";

type PaletteProps = {
  onSelectedPrimaryColor: (color: Color) => void;
};

const NUMBER_OF_COLORS = 8;

export const Palette: FC<PaletteProps> = ({ onSelectedPrimaryColor }) => {
  const [generatedColors, setGeneratedColors] = useState<Color[]>([]);
  const [primaryColors, setPrimaryColors] = useState<Color[]>([]);
  const theme = useTheme();

  const generateColorPalette = useCallback(() => {
    const likedColors = generatedColors.filter((color) => color.liked);
    setGeneratedColors([
      ...likedColors,
      ...Array(NUMBER_OF_COLORS - likedColors.length)
        .fill(undefined)
        .map((_) => generateColor()),
    ]);
  }, [generatedColors]);

  const toggleColorLike = useCallback(
    (selectedColor: Color) => {
      setGeneratedColors(
        generatedColors.map((color) =>
          color.value !== selectedColor.value
            ? color
            : { ...color, liked: !color.liked }
        )
      );
    },
    [generatedColors]
  );

  const handleSetAsPrimaryColor = useCallback(
    (selectedColor: Color) => {
      if (!primaryColors.includes(selectedColor)) {
        setPrimaryColors([selectedColor, ...primaryColors].slice(0, 5));
      }
      onSelectedPrimaryColor(selectedColor);
    },
    [primaryColors, onSelectedPrimaryColor]
  );

  return (
    <>
      <Button onClick={generateColorPalette} variant="outlined">
        Generate Color Palette
      </Button>
      <Stack direction="row" spacing={0} flexWrap="wrap">
        {generatedColors.map((color) => (
          <ColorCard
            key={color.value}
            color={color}
            setAsPrimary={handleSetAsPrimaryColor}
            toggleLike={toggleColorLike}
          />
        ))}
      </Stack>
      {primaryColors.length > 0 && (
        <>
          <Divider sx={{ width: "100%", margin: "20px 0" }} />
          <Typography sx={{ color: theme.palette.primary.main }}>
            Selected primary colors:
          </Typography>
          <Stack direction="row" spacing={0} flexWrap="wrap">
            {primaryColors.map((color) => (
              <ColorCard
                key={color.value}
                color={color}
                setAsPrimary={handleSetAsPrimaryColor}
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};
