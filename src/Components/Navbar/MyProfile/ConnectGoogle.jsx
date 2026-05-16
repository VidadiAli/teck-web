import { GoogleLogin } from "@react-oauth/google";
import api from "../../../api";

function ConnectGoogle() {
  const connectGoogle = async (credentialResponse) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/customer/updateGoogleInfo",
        {
          credential: credentialResponse.credential,
        }
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={connectGoogle}
      onError={() => console.log("Error")}
    />
  );
}

export default ConnectGoogle;