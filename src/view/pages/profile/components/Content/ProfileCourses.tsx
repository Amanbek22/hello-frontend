import React, { useEffect } from "react";
import css from "../../profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/rootReducer";
import { fetchPersonalCourses } from "../../../../../store/feature/personal/personal.actions";
import CourseCard from "../../../../components/courseCard/courseCard";
import { BilimModalType } from "../../../../../models/type";
import Preloader from "../../../../preloader/preloader";

const ProfileCourses: React.FC = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector(
    (state: RootState) => state.personal,
  );
  const { uid }: any = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchPersonalCourses(uid));
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={css.content_container}>
      <div className={css.cards}>
        {courses?.map((item: BilimModalType) => (
          <CourseCard
            key={item.id}
            categoryName={item.categoryName}
            color={item.color}
            icon={item.icon}
            id={item.id}
            name={item.name}
            videoCount={item.videoCount}
            testCount={item.testCount}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileCourses;
