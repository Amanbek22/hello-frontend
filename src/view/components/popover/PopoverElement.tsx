import React, { ReactElement } from "react";
import { Popover } from "@material-ui/core";
import styled from "styled-components";

const Sec = styled.div`
  background: #fff;
  color: #000;
  padding: 20px;
`;

interface IProps {
  id: string | undefined;
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  children: ReactElement | string | number;
  positionAnchor: any;
  positionTransform: any;
}
const PopoverElement: React.FC<IProps> = ({
  id,
  open,
  anchorEl,
  handleClose,
  children,
  positionAnchor,
  positionTransform,
}) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => handleClose()}
      anchorOrigin={positionAnchor}
      transformOrigin={positionTransform}
    >
      <Sec>{children}</Sec>
    </Popover>
  );
};

export default PopoverElement;
