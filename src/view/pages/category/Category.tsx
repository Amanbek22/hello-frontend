import css from "./category.module.css";

const Category = () => {
  return (
    <div>
      <div className={css.card_wrapper}>
        <div className={css.objects}>
          <img src="/img/objects.png" alt="objects" />
        </div>
        <div className={css.title_wrapper}>
          <div className={css.title}>ЖРТ</div>
          <div className={css.subtitle}>ЖРТга даярдык үчүн курстар</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
