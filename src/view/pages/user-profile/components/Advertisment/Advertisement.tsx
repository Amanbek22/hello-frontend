import React from "react";
import AdCard from "../../../../components/AdCard/AdCard";

interface IProps {
  ads: [];
}

const Advertisement: React.FC<IProps> = ({ ads }) => {
  return (
    <>
      <h1>Ads</h1>
      {ads &&
        ads?.map((ad: any) => (
          <AdCard
            key={ad.id}
            img={ad.images}
            name={ad.name}
            date={ad.date}
            costText={ad.costText}
            description={ad.description}
            views={ad.views}
          />
        ))}
    </>
  );
};

export default Advertisement;
