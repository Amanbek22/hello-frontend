import React, { useEffect, useState } from "react";
import css from "./userProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import UserProfileCard from "./components/userProfileCard/userProfileCard";
import Advertisement from "./components/Advertisment/Advertisement";
import Photos from "./components/Photos/Photos";
import { useHistory, useParams } from "react-router";
import Preloader from "../../preloader/preloader";
import ModalWindow from "../../components/modal/Modal";
import BlackList from "../../components/BlackList/BlackList";
import Application from "./components/userProfileCard/Application/Application";
import {
  fetchVisitor,
  fetchVisitorAds,
} from "../../../store/feature/visitor/visitor.action";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void;
}

const StyledTabs = withStyles({
  root: {
    margin: "30px 0px 40px",
    "& .MuiTabs-fixed": {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  indicator: {
    backgroundColor: "transparent",
  },
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles(() =>
  createStyles({
    root: {
      fontSize: 24,
      marginLeft: 50,
      paddingBottom: 10,
      textTransform: "none",
      color: "#7E7E7E",
      "&:first-child": {
        marginLeft: 0,
      },
    },
    selected: {
      color: "#21A95D",
      borderBottom: "1px solid #21A95D",
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const UserProfile = () => {
  const dispatch = useDispatch();
  const { uid } = useParams<{ uid: string }>();
  const { loading, visitor, ads }: any = useSelector(
    (state: RootState) => state.visitor,
  );
  const history = useHistory();
  const [application, setApplication] = useState<boolean>(false);
  const [blackList, setBlackList] = useState<boolean>(false);

  const [value, setValue] = React.useState(0);

  //functions

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const openApplicationModal = () => {
    setApplication(true);
  };
  const closeApplicationModal = () => {
    setApplication(false);
  };
  const openBlackListModal = () => {
    setBlackList(true);
  };
  const closeBlackListModal = () => {
    setBlackList(false);
  };

  const goBack = () => {
    history.goBack();
  };
  const goToChat = () => {
    history.push(`/chat/${visitor.uid}`);
  };

  useEffect(() => {
    dispatch(fetchVisitor(uid));
    dispatch(fetchVisitorAds(uid));
  }, [uid]);

  return (
    <>
      <div className={css.container}>
        {loading && <Preloader absolute />}
        <UserProfileCard
          name={visitor?.userName}
          img={visitor?.userPhoto}
          city={visitor?.userAddressText}
          photoCount={visitor?.images === undefined ? 0 : visitor.images}
          profession={visitor?.bio}
          onApplication={openApplicationModal}
          onBlackList={openBlackListModal}
          toChat={goToChat}
        />
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Жарнамалар" {...a11yProps(0)} />
          <StyledTab label="Сүрөттөр" {...a11yProps(1)} />
        </StyledTabs>

        <TabPanel index={0} value={value}>
          <Advertisement ads={ads} />
        </TabPanel>

        <TabPanel index={1} value={value}>
          <Photos />
        </TabPanel>
      </div>
      <ModalWindow open={blackList} onClose={closeBlackListModal}>
        <BlackList addToBlackList={() => "added"} goBack={goBack} />
      </ModalWindow>
      <ModalWindow open={application} onClose={closeApplicationModal}>
        <Application />
      </ModalWindow>
    </>
  );
};

export default UserProfile;
