import React from "react";
import css from "../communication.module.css";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { IconButton, withStyles } from "@material-ui/core";
import { Badge } from "@material-ui/core";

const MyBadge = withStyles({
  root: {
    "& .MuiBadge-badge": {
      backgroundColor: "#21A95D",
      color: "#fff",
      top: 8,
      minWidth: 14,
      width: 14,
      height: 14,
      left: 6,
      borderRadius: "50%",
    },
  },
})(Badge);

interface IProps {
  onClick: () => void;
  img: string | undefined;
  badge: number;
}

const CommunicationCard: React.FC<IProps> = ({ onClick, img, badge }) => {
  return (
    <div className={css.card}>
      <div className={css.flex}>
        {img ? (
          <img src={img} className={css.avatar} alt="avatar" />
        ) : (
          <div className={css.avatar} />
        )}
        <IconButton onClick={() => onClick()} className={css.ibutton}>
          <MyBadge badgeContent={badge}>
            <NotificationsNoneOutlinedIcon className={css.icon} />
          </MyBadge>
        </IconButton>
      </div>
    </div>
  );
};

export default CommunicationCard;
