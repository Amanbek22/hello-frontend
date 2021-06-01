import css from "./preloader.module.css";

const Preloader = (props: { absolute?: boolean }) => {
  return (
    <div className={`${css.container} ${props.absolute ? css.absolute : ""}`}>
      <svg className={css.loader} viewBox="0 0 340 340">
        <circle cx="170" cy="170" r="160" stroke="#3ad456" />
        <circle cx="170" cy="170" r="135" stroke="#0B0D34" />
        <circle cx="170" cy="170" r="110" stroke="#3ad456" />
        <circle cx="170" cy="170" r="85" stroke="#0B0D34" />
        {/*<circle cx="170" cy="170" r="60" stroke="#00bdd0"/>*/}
      </svg>
      <img className={css.img} src="/img/logo.jpg" alt="HELLOIT" />
    </div>
  );
};

export default Preloader;
