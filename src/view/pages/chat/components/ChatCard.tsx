import React, { useState } from "react";
import css from "../chat.module.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import PopoverElement from "../../../components/popover/PopoverElement";

const anchorOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const transformOrigin = {
  vertical: "top",
  horizontal: "right",
};

interface IProps {
  img: string;
  addToBlackList: () => void;
  goToUserProfile: () => void;
  closeConnect: () => void;
  clickPhoto: () => void;
}

const ChatCard: React.FC<IProps> = ({
  img,
  addToBlackList,
  goToUserProfile,
  closeConnect,
  clickPhoto,
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
    <div className={css.card}>
      <div className={css.flex}>
        {img ? (
          <img src={img} className={css.avatar} alt="avatar" />
        ) : (
          <div className={css.avatar} />
        )}
        <IconButton aria-describedby={id} onClick={handlePopoverOpen}>
          <MoreVertIcon className={css.icon} />
        </IconButton>
        <PopoverElement
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handlePopoverClose}
          positionAnchor={anchorOrigin}
          positionTransform={transformOrigin}
        >
          <>
            <p className={css.popText} onClick={() => goToUserProfile()}>
              Профилин көрүү
            </p>
            <p className={css.popText} onClick={() => clickPhoto()}>
              Медиа-сүрөттөр
            </p>
            <p className={css.popText} onClick={() => closeConnect()}>
              Маекти өчүрүү
            </p>
            <p className={css.popText} onClick={() => addToBlackList()}>
              Кара тизмеге киргизүү
            </p>
          </>
        </PopoverElement>
      </div>
    </div>
  );
};

export default ChatCard;
