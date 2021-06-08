import React from "react";
import css from "./adCard.module.css";
import styled from "styled-components";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const Card = styled.div`
  width: 285px;
  height: 336px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #f1f1f1; ;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 15px 31px 19px;
`;

const AdCard = () => {
  return (
    <Card>
      <img
        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1873&q=80"
        height="188"
        width="100%"
        alt=""
      />
      <CardBody>
        <div className={css.view}>
          <div className={css.viewLeft}>
            <VisibilityOutlinedIcon />
            <p>7</p>
          </div>
          <div className={css.viewRight}>
            <p>14 май 2021</p>
            <p>16:36</p>
          </div>
        </div>
        <h1 className={css.mainText}>Квартиры на продажу</h1>
        <h3 className={css.subText}>Договорная</h3>
        <p className={css.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          fuga impedit quod, sint suscipit temporibus? Commodi consequatur cum,
          deleniti doloremque facilis mollitia odio recusandae, repellat tempore
          tenetur, totam voluptatem. Maxime.
        </p>
      </CardBody>
    </Card>
  );
};

export default AdCard;
