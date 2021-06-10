import React from "react";
import css from "../profile.module.css";

interface IProps {
  tabIndex: number;
}

const ProfileCourses: React.FC<IProps> = ({ tabIndex }) => {
  return (
    <div className={tabIndex !== 2 ? css.none : css.adGrid}>
      <h1>Courses</h1>
    </div>
  );
};

export default ProfileCourses;
