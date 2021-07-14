import React, { FormEvent, useEffect, useState } from "react";
import css from "./advert.module.css";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import { CityModalType } from "../../../models/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Field, Form } from "react-final-form";
import {
  createAd,
  fetchAdsCategories,
} from "../../../store/feature/ads/ads.action";
import { CssTextField } from "../authentication/components/phone.form";
import AddPictures from "./components/AddPictures";
import ModalWindow from "../../components/modal/Modal";
import firebase from "../../../firebase/firebase";
import { useHistory } from "react-router";
import Preloader from "../../preloader/preloader";

const useStyles = makeStyles({
  label: {
    "&.Mui-focused": {
      color: "#21A95D",
    },
  },
  formControl: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#21A95D",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#21A95D",
      },
      "&:focus fieldset": {
        backgroundColor: "#21A95D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#21A95D",
      },
    },
  },
});

export const GreenButton = withStyles({
  root: {
    display: "block",
    margin: "40px auto",
    boxShadow: "none",
    fontSize: 14,
    width: 280,
    height: 50,
    padding: "10px 36px",
    color: "#fff",
    backgroundColor: "#21A95D",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#21A95D",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#21A95D",
    },
  },
})(Button);

const AddAdvert = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState(false);
  const { categories, success, loading }: any = useSelector(
    (state: RootState) => state.ads,
  );
  const cities: CityModalType[] = useSelector(
    (state: RootState) => state.data.states,
  );
  const { uid }: any = useSelector((state: RootState) => state.user.userInfo);

  const submitHandler = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };
  const createAdvert = (values: any, images: any) => {
    const data = {
      ...values,
      cost: values.cost ? parseInt(values.cost) : 0,
      category: parseInt(values.category),
      state: parseInt(values.state),
      authorUid: uid,
      costText: values.cost ? `${values.cost} сом` : "",
      addressText: cities.filter((state: any) => state.id === values.state)[0]
        .name,
      categoryText: categories.filter(
        (category: any) => category.id === values.category,
      )[0].name,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      images: images,
      active: 0,
      views: 0,
      ref: null,
    };
    dispatch(createAd(data));
  };

  const onConfirmHandler = async (values: FormEvent | any) => {
    closeModal();
    const images: string[] = [];
    if (values?.images.length > 0) {
      values?.images?.map(async (image: any, index: number) => {
        const payload = new FormData();
        payload.append("image", image[0]);
        payload.append("code", "0");
        fetch("http://176.126.164.190:8000/api/image-create/", {
          method: "POST",
          body: payload,
        })
          .then((res) => res.json())
          .then((data) => {
            images.push(data.image);
            if (values.images.length === index + 1) {
              createAdvert(values, images);
            }
          });
      });
    } else {
      createAdvert(values, images);
    }
  };
  useEffect(() => {
    dispatch(fetchAdsCategories());
    if (success) {
      history.push("/ads");
    }
  }, [success]);

  if (loading) {
    return <Preloader absolute />;
  }

  return (
    <div className={css.container}>
      <h1 className={css.header}>Опубликовать объявление</h1>
      <Form
        onSubmit={submitHandler}
        render={({ handleSubmit, submitting, values }) => {
          setError(false);
          return (
            <form onSubmit={handleSubmit}>
              <Field name="images">
                {(props) => <AddPictures {...props} />}
              </Field>
              <div className={css.form}>
                <Field name="name">
                  {(props) => <Input {...props} required label="Название" />}
                </Field>
                <Field name="category">
                  {(props) => (
                    <CustomSelect
                      {...props}
                      required
                      array={categories}
                      label="Категория"
                    />
                  )}
                </Field>
                <Field name="state">
                  {(props) => (
                    <CustomSelect
                      required
                      {...props}
                      array={cities}
                      label="Адрес"
                    />
                  )}
                </Field>
                <Field name="phoneOne ">
                  {(props) => (
                    <Input {...props} required label="Ваш номер телефона" />
                  )}
                </Field>
                <Field name="description">
                  {(props) => <Input {...props} label="Подробная информация" />}
                </Field>
                <Field name="cost">
                  {(props) => <CostInput {...props} label="Стоимость" />}
                </Field>
                <Field name="phoneTwo ">
                  {(props) => <Input {...props} label="Ваш номер телефона" />}
                </Field>
                {error ? (
                  <span className={css.error}>
                    Что то пошло не так попробуйте позже
                  </span>
                ) : null}
              </div>
              <GreenButton type="submit" disabled={submitting}>
                Опубликовать
              </GreenButton>
              <ModalWindow open={isModal} onClose={closeModal}>
                <>
                  <h1 className={css.modal_header}>Опубликовать</h1>
                  <button
                    className={css.modal_confirm}
                    onClick={() => onConfirmHandler(values)}
                  >
                    Подтвердить
                  </button>
                  <Divider />
                  <p onClick={closeModal} className={css.modal_back}>
                    Назад
                  </p>
                </>
              </ModalWindow>
            </form>
          );
        }}
      />
    </div>
  );
};

const Input = ({ label, ...props }: any) => {
  return (
    <CssTextField
      label={label}
      variant="outlined"
      value={props.input.value}
      onChange={props.input.onChange}
      {...props}
    />
  );
};

const CostInput = ({ label, ...props }: any) => {
  return (
    <CssTextField
      type="number"
      label={label}
      variant="outlined"
      value={props.input.value}
      onChange={props.input.onChange}
      helperText="Если договорная оставьте пусто или 0"
      {...props}
    />
  );
};

const CustomSelect = ({ label, input, array, ...props }: any) => {
  const classes = useStyles();
  return (
    <FormControl
      required={props.required}
      variant="outlined"
      className={classes.formControl}
    >
      <InputLabel
        htmlFor="outlined-age-native-simple"
        className={classes.label}
      >
        {label}
      </InputLabel>
      <Select
        id="outlined-age-native-simple"
        label={label}
        value={input.value}
        onChange={input.onChange}
        MenuProps={{
          classes: { paper: css.paper_select, list: css.list },
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
        {array?.map((el: any) => (
          <MenuItem
            key={el.id}
            value={el.id}
            classes={{ selected: css.selected }}
          >
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AddAdvert;
