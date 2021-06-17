import React, { useEffect, useState } from "react";
import css from "./profile.module.css";
import ProfileCard from "./components/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useHistory } from "react-router";
import { Logout } from "../../../firebase/firebase";
import userSlice from "../../../store/feature/user/user.slice";
import { useLocation } from "react-router-dom";
import ModalWindow from "../../components/modal/Modal";
import LogoutModal from "../../components/Logout/LogoutModal";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import ProfileAdvertisement from "./components/Content/ProfileAdvertisement";
import ProfileNews from "./components/Content/ProfileNews";
import ProfileCourses from "./components/Content/ProfileCourses";
import ProfileFollowers from "./components/Content/ProfileFollowers";

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void;
}

const StyledTabs = withStyles({
  root: {
    margin: "0 auto",
    padding: "0 100px",
    maxWidth: 1200,
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
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
      textTransform: "none",
      color: "#7E7E7E",
      fontSize: 24,
      padding: "20px 17px 30px",
      borderBottom: "1px solid #e0e7ea",
      opacity: 1,
    },
    selected: {
      color: "#21A95D",
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Profile = () => {
  //hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState<boolean>(false);
  const query = useQuery();
  const { login, userName, userPhoto, userAddressText }: any = useSelector(
    (state: RootState) => state.user.userInfo,
  );
  const [value, setValue] = React.useState(0);

  //functions

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const onLogoutHandler = async () => {
    await Logout();
    dispatch(userSlice.actions.setUserData(null));
    history.push("/");
  };

  const onProfileEdit = () => {
    history.push("/edit-profile");
  };

  const goBack = () => {
    history.goBack();
  };

  const onLogoutModal = () => {
    history.push({
      pathname: history.location.pathname,
      search: !logout ? `?logout=true` : "",
    });
  };

  const onDashboard = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    setLogout(Boolean(query.get("logout")));
  }, [query]);

  return (
    <>
      <ProfileCard
        name={userName}
        img={userPhoto}
        login={login}
        city={userAddressText}
        onLogout={onLogoutHandler}
        onEditProfile={onProfileEdit}
        onLogoutModal={onLogoutModal}
        logout={logout}
        onDashboard={onDashboard}
      />
      <div className={css.tabs}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Жарнамалар" {...a11yProps(0)} />
          <StyledTab label="Жаңылыктар" {...a11yProps(1)} />
          <StyledTab label="Курстар" {...a11yProps(2)} />
          <StyledTab label="Жүргүнчүлөр" {...a11yProps(3)} />
        </StyledTabs>
      </div>
      <TabPanel value={value} index={0}>
        <ProfileAdvertisement />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileNews />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileCourses />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProfileFollowers />
      </TabPanel>

      <ModalWindow open={logout} onClose={onLogoutModal}>
        <LogoutModal onLogout={onLogoutHandler} goBack={goBack} />
      </ModalWindow>
    </>
  );
};

export default Profile;
