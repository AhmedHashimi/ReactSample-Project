import axios from "axios";

export const addToCartApi = async (data) => {
  const body = { ...data };
  try {
    const data = await axios.post("/addslottocart", body);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
