import React from "react";
import css from "../profile.module.css";

interface IProps {
  tabIndex: number;
}

const ProfileNews: React.FC<IProps> = ({ tabIndex }) => {
  return (
    <div className={tabIndex !== 1 ? css.none : css.adGrid}>
      <h1>News</h1>
    </div>
  );
};

export default ProfileNews;
