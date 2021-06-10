import React from "react";
import css from "../profile.module.css";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { IconButton } from "@material-ui/core";

interface IProps {
  name: string;
  img: string;
  login: string;
  city: string;
  onLogout: () => void;
  onEditProfile: () => void;
  onLogoutModal: () => void;
  logout: boolean;
}

const ProfileCard: React.FC<IProps> = ({
  name,
  img,
  login,
  city,
  onEditProfile,
  onLogoutModal,
}) => {
  return (
    <div className={css.card}>
      <h1 className={css.header}>Мой профиль</h1>
      {img && <img src={img} alt="avatar" className={css.avatar} />}
      <div className={css.nameWrapper}>
        <h3 className={css.name}>{name}</h3>
        <IconButton className={css.editIButton}>
          <SettingsOutlinedIcon className={css.editIcon} />
        </IconButton>
      </div>
      <p className={css.login}>{login}</p>
      {city && (
        <div className={css.city}>
          <RoomOutlinedIcon />
          <p>{city}</p>
        </div>
      )}
      <div className={css.buttons}>
        <button className={css.edit} onClick={() => onEditProfile()}>
          Профиль өзгөртүү
        </button>
        <button className={css.logout} onClick={() => onLogoutModal()}>
          Чыгуу
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
