import React from "react";
import QRCode from "react-qr-code";
import css from "./share.module.css";

const ShareModal = () => {
  return (
    <>
      <h1 className={css.header}>Профилди бөлүшүү</h1>
      <div className={css.qr}>
        <QRCode value="hey" size={100} />
      </div>
      <p className={css.text}>Социалдык тармактарга</p>
      <p className={css.subtext}>(WhatsApp, Instagram, Telegram, Facebook)</p>
    </>
  );
};

export default ShareModal;
