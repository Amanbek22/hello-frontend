import css from "./ads.module.css";
import ModalWindow from "../../components/modal/Modal";
import React, { useEffect, useState } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../components/TabPanel";
import Ad from "./components/Ad/Ad";
import Passengers from "./components/Passengers/Passengers";
import Farmers from "./components/Farmers/Farmers";
import Relax from "./components/Relax/Relax";
import SortIcon from "@material-ui/icons/Sort";
import { useDispatch, useSelector } from "react-redux";
import { InputBase, MenuItem, Select } from "@material-ui/core";
import {
  fetchAdsCategories,
  fetchStates,
} from "../../../store/feature/ads/ads.action";
import { RootState } from "../../../store/rootReducer";

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
    margin: "15px 0px 40px",
    "& .MuiTabs-fixed": {
      display: "flex",
      justifyContent: "flex-start",
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
      fontSize: 20,
      marginLeft: 40,
      textTransform: "none",
      color: "#7E7E7E",
      "&:first-child": {
        marginLeft: 0,
      },
    },
    selected: {
      color: "#21A95D",
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const SelectInput = withStyles(() =>
  createStyles({
    root: {
      width: 210,
      marginRight: 40,
    },
    input: {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  }),
)(InputBase);

const CityInput = withStyles(() =>
  createStyles({
    root: {
      width: 180,
      marginRight: 50,
    },
    input: {
      color: "#21A95D",
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
  }),
)(InputBase);

function Ads() {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [firstSelect, setFirstSelect] = useState<any>("");
  const [secondSelect, setSecondSelect] = useState<any>("");
  const [thirdSelect, setThirdSelect] = useState<any>("");
  const [city, setCity] = useState<any>("");

  const { categories, states }: any = useSelector(
    (state: RootState) => state.ads,
  );

  //functions

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const handlerCityChange = (event: React.ChangeEvent<{ value: any }>) => {
    setCity(event.target.value as string);
  };

  const handleFirstSelectChange = (
    event: React.ChangeEvent<{ value: any }>,
  ) => {
    setFirstSelect(event.target.value as string);
  };

  const handleSecondSelectChange = (
    event: React.ChangeEvent<{ value: any }>,
  ) => {
    setSecondSelect(event.target.value as string);
  };

  const handleThirdSelectChange = (
    event: React.ChangeEvent<{ value: any }>,
  ) => {
    setThirdSelect(event.target.value as string);
  };

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    dispatch(fetchAdsCategories());
    dispatch(fetchStates());
  }, []);
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.searchWrapper}>
          <div className={css.city}>
            <Select
              id="city-select"
              value={city || 1}
              onChange={handlerCityChange}
              defaultValue={0}
              input={<CityInput />}
              MenuProps={{
                classes: { paper: css.select, list: css.list },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
              IconComponent={() => (
                <img
                  src="/img/green_vector.png"
                  className={css.select_icon}
                  alt="vector"
                />
              )}
            >
              {states?.map((state: any) => (
                <MenuItem
                  key={state.name}
                  classes={{ selected: css.selected }}
                  value={state.id}
                >
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={css.search}>
            <img
              src="/img/search.png"
              className={css.select__icon}
              alt="search"
            />
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
      </div>

      <div className={css.content__wrapper}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Жарнамалар" {...a11yProps(0)} />
          <StyledTab label="Жүргүнчүлөр үчүн" {...a11yProps(1)} />
          <StyledTab label="Фермерлер үчүн" {...a11yProps(2)} />
          <StyledTab label="Эс алуу - Саякат" {...a11yProps(3)} />
        </StyledTabs>

        <div className={css.sort}>
          <SortIcon className={css.sort__icon} />
          <Select
            id="first-select"
            value={firstSelect || 0}
            onChange={handleFirstSelectChange}
            defaultValue={0}
            input={<SelectInput />}
            MenuProps={{
              classes: { paper: css.select, list: css.list },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            IconComponent={() => (
              <img
                src="/img/green_vector.png"
                className={css.select_icon}
                alt="vector"
              />
            )}
          >
            <MenuItem value={0} classes={{ selected: css.selected }}>
              Баардык категориялар
            </MenuItem>
            {categories?.map((category: any) => (
              <MenuItem
                key={category.name}
                classes={{ selected: css.selected }}
                value={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            id="second-select"
            value={secondSelect || 0}
            onChange={handleSecondSelectChange}
            defaultValue={0}
            input={<SelectInput />}
            MenuProps={{
              classes: { paper: css.select },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            IconComponent={() => (
              <img
                src="/img/green_vector.png"
                className={css.select_icon}
                alt="vector"
              />
            )}
          >
            <MenuItem classes={{ selected: css.selected }} value={0}>
              Жаңылар биринчи
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={1}>
              Эскилер биринчи
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={2}>
              Арзандары биринчи{" "}
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={3}>
              Кымбаттары биринчи{" "}
            </MenuItem>
          </Select>
          <Select
            id="third-select"
            value={thirdSelect || 0}
            onChange={handleThirdSelectChange}
            defaultValue={0}
            input={<SelectInput />}
            MenuProps={{
              classes: { paper: css.select, list: css.list },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            IconComponent={() => (
              <img
                src="/img/green_vector.png"
                className={css.select_icon}
                alt="vector"
              />
            )}
          >
            <MenuItem classes={{ selected: css.selected }} value={0}>
              Баардык райондор
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={1}>
              Ленин району
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={2}>
              Октябрь району
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={3}>
              Свердлов району
            </MenuItem>
            <MenuItem classes={{ selected: css.selected }} value={4}>
              1-Май району
            </MenuItem>
          </Select>
        </div>

        <div className={css.content}>
          <TabPanel index={0} value={value}>
            <Ad />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <Passengers />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <Farmers />
          </TabPanel>
          <TabPanel index={3} value={value}>
            <Relax />
          </TabPanel>
        </div>
      </div>
      <ModalWindow open={isModal} onClose={closeModal}>
        <div className={css.modal_wrapper}>
          <h3>Жарнама берүү</h3>
          <div className={`${css.item} ${css.whatsapp}`}>
            <span>Написать с WhatsApp</span>
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
    </>
  );
}

export default Ads;
