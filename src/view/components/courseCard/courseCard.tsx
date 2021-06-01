import css from "./courseCard.module.css";

function courseCard() {
  return (
    <div className={css.content}>
      <img className={css.img} src="./img/doni.png" alt="DoniKyrgyz" />
      <div className={css.text}>
        <div className={css.text1}>Чет өлкөдө окуу</div>
        <div className={css.text2}>Doni Kyrgyz дан интервьюлар</div>
        <div className={css.text3}>
          <div>12 видео сабак</div>
          <div>0 тест</div>
        </div>
      </div>
    </div>
  );
}

export default courseCard;
