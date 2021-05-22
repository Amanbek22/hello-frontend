import css from "../../course.module.css";

interface PropsType {
  name: string;
  videos: string | number | undefined;
  tests: string | number | undefined;
}

function CourseHeader(props: PropsType) {
  return (
    <div className="container">
      <div className={css.header}>
        <div className={css.info}>
          <h2>{props?.name}</h2>
          <div className={css.info__block}>
            <img src="/img/info.png" alt="info" />
            <span className={css.gray}>Информация о курсе</span>
          </div>
          <div className={css.info__block}>
            <img src="/img/videoPlay.png" alt="play" />
            <span>{props.videos} видео сабак</span>
          </div>
          <div className={css.info__block}>
            <img src="/img/tests.png" alt="test" />
            <span>{props.tests} Тест</span>
          </div>
        </div>
        <div className={css.imgWrapper}>
          <img src="/img/course-icon.png" alt="#" />
        </div>
      </div>
    </div>
  );
}

export default CourseHeader;
