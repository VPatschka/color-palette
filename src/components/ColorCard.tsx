import React, { FC } from "react";
import { Color } from "../types/Color";
import { Button, Card, CardActions, CardContent } from "@mui/material";

type ColorCardProps = {
  color: Color;
  toggleLike: (color: Color) => void;
  setAsPrimary: (color: Color) => void;
};

export const ColorCard: FC<ColorCardProps> = ({
  color,
  toggleLike,
  setAsPrimary,
}) => {
  const highlightLike = "2px solid red";

  return (
    <Card sx={{ minWidth: 275 }} style={{ margin: "20px" }}>
      <CardContent
        style={{
          background: color.value,
          borderBottom: color.liked ? highlightLike : "none",
          color: color.isLight ? "black" : "white",
          height: "100px",
        }}
      >
        {color.value}
      </CardContent>
      <CardActions>
        <Button onClick={() => toggleLike(color)} size="small">
          {color.liked ? "Unlike" : "Like"}
        </Button>
        <Button onClick={() => setAsPrimary(color)} size="small">
          Set as Primary Color
        </Button>
      </CardActions>
    </Card>
  );
};
