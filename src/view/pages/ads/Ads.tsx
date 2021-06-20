import css from "./ads.module.css";
import ModalWindow from "../../components/modal/Modal";
import { useState } from "react";

function Ads() {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
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
        <div className={css.left_block}>
          <span>Баннер</span>
        </div>
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
      <button className={css.btn} onClick={openModal}>
        Жарнама берүү
      </button>
      <ModalWindow open={isModal} onClose={closeModal}>
        <div className={css.modal_wrapper}>
          <h3>Жарнама берүү</h3>
          <div className={css.item}>
            <span>Написать с WhatsAppa</span>
            <div className={css.whatsapp_icon}>
              <img src="/img/whatsapp_icon.png" alt="whatsapp_icon" />
            </div>
          </div>
          <div className={css.item}>
            <span>Написать здесь</span>
            <div className={css.list_icon}>
              <img src="/img/list_icon.png" alt="list_icon" />
            </div>
          </div>
        </div>
      </ModalWindow>
    </div>
  );
}

export default Ads;
