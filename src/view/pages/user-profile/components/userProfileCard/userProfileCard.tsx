import React, { useState } from "react";
import css from "../../userProfile.module.css";
import { Button, IconButton, Paper, withStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PopoverElement from "../../../../components/popover/PopoverElement";

const WriteButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#0B0D34",
    border: "1px solid #0B0D34",
    boxSizing: "border-box",
    marginLeft: 15,
    lineHeight: 1,
  },
})(Button);

export const GreenButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#fff",
    backgroundColor: "#21A95D",
    boxSizing: "border-box",
    lineHeight: 1,
    "&:hover": {
      backgroundColor: "#33a921",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#21A95D",
    },
  },
})(Button);

const IButton = withStyles({
  root: {
    boxShadow: "none",
    color: "#000",
    padding: 0,
    position: "absolute",
    right: "-61px",
    top: 10,
    "&:hover": {
      background: "none",
      boxShadow: "none",
    },
  },
})(IconButton);

const anchorOrigin = {
  vertical: "top",
  horizontal: "left",
};

const transformOrigin = {
  vertical: "top",
  horizontal: "right",
};

interface IProps {
  name: string;
  img: string | undefined;
  city: string;
  photoCount: number;
  profession: string;
  onBlackList: () => void;
  onApplication: () => void;
  toChat: () => void;
}

const UserProfileCard: React.FC<IProps> = ({
  name,
  img,
  city,
  photoCount,
  profession,
  onBlackList,
  onApplication,
  toChat,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-profile-popover" : undefined;

  return (
    <Paper elevation={0} className={css.paper}>
      <div className={css.paper__header}>
        <div className={css.paperLeft}>
          {img ? (
            <img src={img} alt="avatar" className={css.avatar} />
          ) : (
            <div className={css.avatar} />
          )}
          <p className={css.name}>{name}</p>
        </div>
        <div>
          <p className={css.infoText}>{city}</p>
          <p className={css.infoText}>{photoCount} Фото</p>
          <p className={css.infoText}>{profession}</p>
        </div>
        <IButton aria-describedby={id} onClick={handlePopoverOpen}>
          <MoreVertIcon />
        </IButton>
        <PopoverElement
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handlePopoverClose}
          positionAnchor={anchorOrigin}
          positionTransform={transformOrigin}
        >
          <>
            <p className={css.popoverText} onClick={() => onBlackList()}>
              Кара тизмеге киргизүү
            </p>
            <p className={css.popoverText} onClick={() => onApplication()}>
              Колдонуучунун үстүнөн арыз берүү
            </p>
          </>
        </PopoverElement>
      </div>
      <div>
        <GreenButton>Достошуу</GreenButton>
        <WriteButton onClick={() => toChat()}>Жазуу</WriteButton>
      </div>
    </Paper>
  );
};

export default UserProfileCard;
