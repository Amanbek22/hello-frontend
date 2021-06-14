import React, { useEffect, useState } from "react";
import css from "../../userProfile.module.css";
import { Button, IconButton, Paper, withStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PopoverElement from "../../../../components/popover/PopoverElement";
import ModalWindow from "../../../../components/modal/Modal";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import BlackList from "./BlackList/BlackList";
import Application from "./Application/Application";

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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface IProps {
  name: string;
  img: string | undefined;
  city: string;
  photoCount: number;
  profession: string;
}

const UserProfileCard: React.FC<IProps> = ({
  name,
  img,
  city,
  photoCount,
  profession,
}) => {
  const history = useHistory();
  const query = useQuery();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [application, setApplication] = useState<boolean>(false);
  const [blackList, setBlackList] = useState<boolean>(false);

  const onBlackList = () => {
    history.push({
      pathname: history.location.pathname,
      search: !blackList ? `?black-list=true` : "",
    });
  };
  const onApplication = () => {
    history.push({
      pathname: history.location.pathname,
      search: !application ? `?application=true` : "",
    });
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setApplication(Boolean(query.get("application")));
    setBlackList(Boolean(query.get("black-list")));
  }, [query]);

  const open = Boolean(anchorEl);
  const id = open ? "userProfile-popover" : undefined;

  return (
    <Paper elevation={0} className={css.paper}>
      <div className={css.paper__header}>
        <div className={css.paperLeft}>
          <img src={img && img} alt="avatar" className={css.avatar} />
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
            <p className={css.popoverText} onClick={onBlackList}>
              Кара тизмеге киргизүү
            </p>
            <p className={css.popoverText} onClick={onApplication}>
              Колдонуучунун үстүнөн арыз берүү
            </p>
          </>
        </PopoverElement>
        <ModalWindow open={blackList} onClose={onBlackList}>
          <BlackList addToBlackList={() => "added"} goBack={goBack} />
        </ModalWindow>
        <ModalWindow open={application} onClose={onApplication}>
          <Application />
        </ModalWindow>
      </div>
      <div>
        <GreenButton>Достошуу</GreenButton>
        <WriteButton>Жазуу</WriteButton>
      </div>
    </Paper>
  );
};

export default UserProfileCard;
