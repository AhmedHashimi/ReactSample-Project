import axios from "axios";
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const socailLogin = async (data) => {
  let body = data;
  try {
    const data = await axios.post(`/socialLogin`, body);
    // console.log(data);
    return data;
  } catch (error) {
    return error.response;
  }
};

// export const signIn = (data) => {
//   axios
//     .post("http://appcrates.net/admin_virtuallesson/api/login", {
//       email: data.email,
//       password: data.password,
//     })
//     .then((res) => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
