import React from "react";
import css from "./blackList.module.css";
import { Divider } from "@material-ui/core";

interface IProps {
  addToBlackList: () => void;
  goBack: () => void;
}

const BlackList: React.FC<IProps> = ({ addToBlackList, goBack }) => {
  return (
    <>
      <h3 className={css.header}>Колдонуучун кара тизмеге киргизүү</h3>
      <p onClick={() => addToBlackList()} className={css.add}>
        Кара тизмеге киргизүү
      </p>
      <Divider />
      <p className={css.back} onClick={() => goBack()}>
        Жок, артка
      </p>
    </>
  );
};

export default BlackList;
