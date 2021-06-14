import React from "react";
import css from "../profile.module.css";

interface IProps {
  tabIndex: number;
}

const ProfileFollowers: React.FC<IProps> = ({ tabIndex }) => {
  return (
    <div className={tabIndex !== 3 ? css.none : css.adGrid}>
      <h1>Followers</h1>
    </div>
  );
};

export default ProfileFollowers;
