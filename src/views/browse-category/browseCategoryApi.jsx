import axios from "axios";

export const getCategories = async (data) => {
  const body = { search: data };
  try {
    const data = await axios.get("/getCategory", body);
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error.response);
    return error.response;
  }
};
