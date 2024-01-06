import React from "react";
import Bullet, { Font, Margin, Size, Tooltip } from "devextreme-react/bullet";
import { useTheme } from "@mui/material";

const customizeTooltip = (data) => ({
  text: `${parseInt(data.value, 10)}%`,
});

const DiscountCell = (cellData) => {
  const theme = useTheme();

  const customizeBulletStyle = () => {
    return {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
    };
  };

  return (
    <Bullet
      showTarget={false}
      showZeroLevel={true}
      value={cellData.value * 100}
      startScaleValue={0}
      endScaleValue={100}
      customizeBullet={customizeBulletStyle}
    >
      <Size width={150} height={35} />
      <Margin top={5} bottom={0} left={5} />
      <Tooltip
        enabled={true}
        paddingTopBottom={2}
        zIndex={5}
        customizeTooltip={customizeTooltip}
      >
        <Font size={18} />
      </Tooltip>
    </Bullet>
  );
};

export default DiscountCell;
