import axios from "axios";

export const addClinicToCart = async (data) => {
  const body = { ...data };
  try {
    const data = await axios.post("/addclinictocart", body);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
