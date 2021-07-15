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
  background-color: #f1f1f1;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 15px 31px 19px;
`;

interface IProps {
  img: string | undefined;
  name: string;
  date: any;
  costText: string;
  description: any;
  views: number;
}

const AdCard: React.FC<IProps> = ({
  img,
  name,
  date,
  costText,
  description,
  views,
}) => {
  const time = new Date(parseInt(date) * 1000)
    .toString()
    .split(" ")
    .slice(1, -2)
    .join(" ");

  return (
    <Card>
      <div className={css.image__wrapper}>
        {img?.[0] ? (
          <img
            src={img?.[0]}
            height="188"
            width="100%"
            className={css.image}
            alt="image"
          />
        ) : (
          <div className={css.image} />
        )}
      </div>
      <CardBody>
        <div className={css.view}>
          <div className={css.viewLeft}>
            <VisibilityOutlinedIcon />
            <p>{views}</p>
          </div>
          <div className={css.viewRight}>
            <p>{time}</p>
          </div>
        </div>
        <h1 className={css.mainText}>{name}</h1>
        <h3 className={css.subText}>{costText === " сом" ? "" : costText}</h3>
        <p className={css.description}>{description}</p>
      </CardBody>
    </Card>
  );
};

export default AdCard;
