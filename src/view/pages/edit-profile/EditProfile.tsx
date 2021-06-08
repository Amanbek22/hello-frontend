import { FormEvent, useState } from "react";
import css from "./editProfile.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import AddPicture from "./components/addPicture/AddPicture";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { CityModalType } from "../../../models/type";
import { Form, Field } from "react-final-form";
import { updateData } from "../../../firebase/firebase.actions";
import { fetchUser } from "../../../store/feature/user/user.actions";

function EditProfile() {
  const user: any = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const update = (values: FormEvent) => {
    updateData({
      path: "users",
      doc: user.uid,
      data: { ...values, profileDone: true },
    })
      .then(() => {
        dispatch(fetchUser(user));
      })
      .catch(() => {
        setError(true);
      });
  };
  const submit = (values: FormEvent | any) => {
    const payload = new FormData();
    payload.append("image", values?.userPhoto[0]);
    payload.append("code", "0");
    if (values.userPhoto) {
      fetch("http://176.126.164.190:8000/api/image-create/", {
        method: "POST",
        body: payload,
      })
        .then((res) => res.json())
        .then((data) => {
          update({ ...values, userPhoto: data.image });
        })
        .catch(() => {
          update(values);
        });
    } else {
      update(values);
    }
  };
  return (
    <div className={`${css.wrapper}`}>
      <h2>Профиль</h2>
      <Form
        onSubmit={submit}
        initialValues={user}
        render={({ handleSubmit, submitting }) => {
          setError(false);
          return (
            <form onSubmit={handleSubmit} className={css.form}>
              <Field name="userPhoto">
                {(props) => <AddPicture {...props} />}
              </Field>
              <Field name="userName">
                {(props) => <Input {...props} required label="Аты жөнүңүз" />}
              </Field>
              <Field name="userAddressText">
                {(props) => <CustomSelect {...props} required label="Шаары" />}
              </Field>
              <Field name="phoneTwo">
                {(props) => <Input {...props} label="Кошумча номериңиз" />}
              </Field>
              <Field name="bio">
                {(props) => (
                  <Input {...props} label="Өзүңүңүз же ишиңиз жөнүндө" />
                )}
              </Field>
              {error ? (
                <span className={css.error}>
                  Что то пошло не так попробуйте позже
                </span>
              ) : null}
              <button className={css.submit} disabled={submitting}>
                Сактоо
              </button>
            </form>
          );
        }}
      />
    </div>
  );
}

const Input = ({ label, ...props }: any) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={props.input.value}
      onChange={props.input.onChange}
      {...props}
    />
  );
};

const CustomSelect = ({ label, input, ...props }: any) => {
  const cities: CityModalType[] = useSelector(
    (state: RootState) => state.data.states,
  );
  return (
    <FormControl required={props.required} variant="outlined">
      <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
      <Select
        label={label}
        value={input.value}
        onChange={input.onChange}
        inputProps={{
          name: "city",
          id: "outlined-age-native-simple",
        }}
      >
        {cities?.map((el: CityModalType) => (
          <MenuItem key={el.id} value={el.name}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EditProfile;
