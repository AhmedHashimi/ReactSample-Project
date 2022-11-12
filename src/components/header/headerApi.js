import axios from "axios";
export const searchApi = async (data) => {
  const body = { search: data };
  try {
    const data = await axios.post("/search", body);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
