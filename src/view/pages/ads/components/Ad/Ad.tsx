import React, { useEffect } from "react";
import css from "./ad.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/rootReducer";
import { fetchAds } from "../../../../../store/feature/ads/ads.action";
import AdCard from "../../../../components/AdCard/AdCard";
import Preloader from "../../../../preloader/preloader";

interface IProps {
  id: string;
  order: string;
}

const Ad: React.FC<IProps> = ({ id, order }) => {
  const dispatch = useDispatch();
  const { ads, loading }: any = useSelector((state: RootState) => state.ads);

  useEffect(() => {
    dispatch(fetchAds({ id, order }));
  }, [id, order]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={css.ads_tab}>
      {ads?.map((ad: any) => (
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
  );
};

export default Ad;
