import React from "react";
import css from "../../userProfile.module.css";
import AdCard from "../../../../components/AdCard/AdCard";

interface IProps {
  ads: [];
}

const Advertisement: React.FC<IProps> = ({ ads }) => {
  return (
    <>
      <h1>Ads</h1>
      <div className={css.ad_wrapper}>
        {ads &&
          ads?.map((ad: any) => (
            <AdCard
              key={ad.id}
              img={ad.images}
              name={ad.name}
              date={ad.date?.seconds}
              costText={ad.costText}
              description={ad.description}
              views={ad.views}
            />
          ))}
      </div>
    </>
  );
};

export default Advertisement;
