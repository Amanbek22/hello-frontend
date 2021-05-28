import Css from "./lastnews.module.css";

const LastNews = () => {
  return (
    <div className={`${Css.container}`}>
      <div className={Css.box}>
        <img src="img/last_news.png" />
        <div className={Css.box_info}>
          <div className={Css.title}>
            Кореядагы эң көп стипендия! Айына $800. KGSP ге кантип тапшыруу
          </div>
          <div className={Css.text}>
            Кореяда кантип айына миллион вон алып окууса болору тууралуу Жумаева
            Насиба эжем менен Кореяда кантип айына миллион вон Кореяда кантип
            айына миллион вон алып окууса болору тууралуу Жумаева Насиба эжем..
          </div>
          <div className={Css.link}>Читать полностью</div>
        </div>
      </div>
    </div>
  );
};

export default LastNews;
