import axios from "axios";
export const quickSearch = async (data) => {
  const { dateof, timeOf, lessonType } = data;
  const body = {
    day: dateof || "",
    time: timeOf || "",
    category: lessonType || "",
  };
  try {
    const data = await axios.post("/quicksearch", body);
    return data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
