import React, { useEffect } from "react";
import css from "./communication.module.css";
import CommunicationCard from "./components/CommunicationCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Divider } from "@material-ui/core";
import Friends from "./components/Friends";
import Connect from "./components/Connect";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import { fetchMyChats } from "../../../store/feature/chat/chat.action";

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void;
}

const StyledTabs = withStyles({
  root: {
    margin: "0 auto",
    padding: "20px",
    width: "100%",
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
      width: 118,
      height: 40,
      background: "none",
      border: "none",
      fontSize: 18,
      padding: "6px 20px",
      color: "#7e7e7e",
      borderRadius: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 70,
      textTransform: "none",
      "&:last-child": {
        marginRight: 0,
      },
    },
    selected: {
      backgroundColor: "#21a95d",
      color: "#fff",
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Communication = () => {
  const { userPhoto, uid }: any = useSelector(
    (state: RootState) => state.user.userInfo,
  );
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const onNotificationHandler = () => {
    console.log("Clicked on notification icon");
  };

  useEffect(() => {
    dispatch(fetchMyChats(uid));
  }, []);

  return (
    <div>
      <CommunicationCard onClick={onNotificationHandler} img={userPhoto} />
      <div className={css.wrapper}>
        <div className={css.tabs}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Маектер" {...a11yProps(0)} />
            <StyledTab label="Достор" {...a11yProps(1)} />
          </StyledTabs>
          <Divider />
        </div>
      </div>
      <div className={css.content__wrapper}>
        <TabPanel index={0} value={value}>
          <Connect />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Friends />
        </TabPanel>
      </div>
    </div>
  );
};

export default Communication;
