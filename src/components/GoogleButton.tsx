import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import AuthService from "src/api/AuthService";
import UserContext from "src/contexts/UserContext";
import { useAppDispatch } from "src/redux/hooks";
import { logErrorMessage, NOTIF_STATE } from "src/redux/notification";
// import {jwt_decode} from "jwt-decode";
const debug = require("debug")("app:components:GoogleLogin");

interface GoogleButtonProps {
  onSuccess: () => void;
}

GoogleButton.defaultProps = {};

//Can set "route" and "msg" with query params
export default function GoogleButton(props: GoogleButtonProps) {
  const dispatch = useAppDispatch();
  const { updateUser } = useContext(UserContext);

  async function onSuccess(response: CredentialResponse) {
    debug("Google Login Success", response);
    // console.log("L", response);
    if (!response.credential) {
      dispatch(
        logErrorMessage("Failed to fetch google access token", {
          extraData: { response },
        })
      );
      return;
    }

    const newUser = await AuthService.googleLogin(response.credential);
    debug("NEW USER", newUser);
    if (!updateUser) {
      dispatch(
        logErrorMessage("Failed to fetch google access token", {
          notifType: NOTIF_STATE.TOAST,
          extraData: { updateUser },
        })
      );
      return;
    }

    updateUser && updateUser(newUser);

    props.onSuccess && props.onSuccess();
  }

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
      // useOneTap
    />
  );
}
