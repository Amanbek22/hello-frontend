import { useRef, useState } from "react";
import {
  signInFirebase,
  signInFirebaseWithEmail,
} from "../../../firebase/firebase";
import firebase from "../../../firebase/firebase";
import { useDispatch } from "react-redux";
import userSlice from "../../../store/feature/user/user.slice";
import PhoneForm from "./components/phone.form";
import CodeForm from "./components/code.form";
import { getData, setData } from "../../../firebase/firebase.actions";
import { useHistory } from "react-router";
import LoginEmail from "./components/login.email";

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
        await login(user);
      })
      .catch(() => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  const onLoginWithEmail = async () => {
    const { user } = await signInFirebaseWithEmail();
    dispatch(
      userSlice.actions.setUserData({
        email: user?.email,
        displayName: user?.displayName,
        userPhoto: user?.photoURL,
        uid: user?.uid,
      }),
    );
    await login(user);
  };

  const login = async (user: any) => {
    const userData = await getData({
      path: "users",
      doc: user?.uid,
    });
    const data = {
      path: "users",
      data: {
        login: user?.email,
        profileDone: false,
      },
      doc: user?.uid,
    };
    dispatch(userSlice.actions.setUserInfo(userData));
    if (!userData) {
      dispatch(userSlice.actions.setUserInfo(data.data));
      await setData(data);
    }
    if (userData && userData.profileDone) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <>
      <div ref={recaptchaWrapperRef}>
        <div id="recaptcha-container" />
      </div>
      {!isConfirm ? (
        <>
          <PhoneForm onSubmit={onSubmit} />
          <LoginEmail onClick={onLoginWithEmail} />
        </>
      ) : (
        <CodeForm onSubmit={onConfirm} setBack={setBack} />
      )}
    </>
  );
};

export default Auth;
