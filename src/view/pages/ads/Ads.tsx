import css from "./ads.module.css";

function Ads() {
  return (
    <div className={css.wrapper}>
      <div className={css.item}>
        <div className={css.city}>
          <div className={css.city_item}>Бишкек шаары</div>
          <div className={css.vector}>
            <img src="/img/green_vector.png" alt="vector" />
          </div>
        </div>
        <div className={css.search}>
          <img src="/img/search.png" alt="search" />
        </div>
      </div>
      <div className={css.text_wrapper}>
        <div className={css.left_block}>Баннер</div>
        <div>
          <div className={css.group}>
            <div className={css.group_img}>
              <img src="/img/group.png" alt="group" />
            </div>
            <div>Аймак боюнча справочник</div>
          </div>
          <div className={css.container}>
            <div className={css.container_img}>
              <img src="/img/container.png" alt="container" />
            </div>
            <div>Бишкек шаары</div>
          </div>
        </div>
      </div>
      <button className={css.btn}>Жарнама берүү</button>
    </div>
  );
}

export default Ads;
