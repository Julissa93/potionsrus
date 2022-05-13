import axios from "axios";
const attemptTokenLogin = async () => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if(token) {
      const { data } = await axios.get(`/api/auth`, {
        headers: {
          authorization: token.token
        }
      });
      console.log("data = ", data);
      return data;
    }
  }

  export default attemptTokenLogin;