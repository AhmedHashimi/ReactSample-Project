import axios from "axios";

export const getCart = async (data) => {
  const body = { ...data };
  try {
    const data = await axios.post("/cartdetails", body);
    // console.log(data);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const deleteCart = async (data) => {
  const body = data;
  try {
    const data = await axios.get(`/deletefromcart/${body}`);
    // console.log(data);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const saveCartApi = async (data) => {
  let body = data;
  console.log(body);
  try {
    const data = await axios.post(`/savecart`, body);
    // console.log(data);
    return data;
  } catch (error) {
    return error.response;
  }
};
