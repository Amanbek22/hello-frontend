import React, { useEffect } from "react";
import css from "../../profile.module.css";
import { Button, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/rootReducer";
import { fetchPersonalAds } from "../../../../../store/feature/personal/personal.actions";
import AdCard from "../../../../components/AdCard/AdCard";
import Preloader from "../../../../preloader/preloader";

const GreenButton = withStyles({
  root: {
    display: "block",
    margin: "50px auto",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#fff",
    backgroundColor: "#21A95D",
    boxSizing: "border-box",
    lineHeight: 1,
    justifySelf: "center",
    height: 50,
    width: 200,
    "&:hover": {
      backgroundColor: "#33a921",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#21A95D",
    },
  },
})(Button);

interface IProps {
  onClick: () => void;
}

const ProfileAdvertisement: React.FC<IProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const { ads, loading } = useSelector((state: RootState) => state.personal);
  const { uid }: any = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchPersonalAds(uid));
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={css.content_container}>
      <GreenButton onClick={onClick}>Жарнама берүү</GreenButton>
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
    </div>
  );
};

export default ProfileAdvertisement;
