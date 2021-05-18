import { useRef, useState } from "react";
import { signInFirebase } from "../../../firebase/firebase";
import firebase from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import userSlice from "../../../store/feature/user/user.slice";
import PhoneForm from "./components/phone.form";
import CodeForm from "./components/code.form";
import { getData, setData } from "../../../firebase/firebase.actions";
import { useHistory } from "react-router";

const Auth = () => {
  // states & instance of hooks
  const [isConfirm, setIsConfirm] = useState(false);
  const recaptchaWrapperRef: any = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  // methods
  const onSubmit = (email: string) => {
    setupRecaptcha();
    //@ts-ignore
    const appVerifier = window.recaptchaVerifier;
    signInFirebase("+" + email, appVerifier)
      .then((confirmationResult) => {
        //@ts-ignore
        window.confirmationResult = confirmationResult;
        setIsConfirm(true);
      })
      .catch(() => {
        // Error; SMS not sent
        if (appVerifier && recaptchaWrapperRef) {
          appVerifier.clear();
          recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
        }
      });
  };
  const setBack = () => {
    // @ts-ignore
    const appVerifier = window.recaptchaVerifier;
    appVerifier.clear();
    recaptchaWrapperRef.current.innerHTML = `<div id="recaptcha-container"></div>`;
    setIsConfirm(false);
  };
  const setupRecaptcha = () => {
    //@ts-ignore
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
  };
  const onConfirm = (code: string): void => {
    //@ts-ignore
    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(code)
      .then(async (result: any) => {
        // User signed in successfully.
        const user = result.user?.toJSON();
        dispatch(userSlice.actions.setUserData(user));
        const userData = await getData({
          path: "users",
          doc: user.uuid,
        });
        const data = {
          path: "users",
          data: {
            login: user.phoneNumber,
            profileDone: false,
          },
          doc: user.uuid,
        };
        if (!userData) {
          await setData(data);
        }
        if (userData && userData.profileDone) {
          history.push("/");
        } else {
          history.push("/dashboard");
        }
      })
      .catch(() => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  return (
    <>
      <div ref={recaptchaWrapperRef}>
        <div id="recaptcha-container" />
      </div>
      {!isConfirm ? (
        <PhoneForm onSubmit={onSubmit} />
      ) : (
        <CodeForm onSubmit={onConfirm} setBack={setBack} />
      )}
    </>
  );
};

export default Auth;
