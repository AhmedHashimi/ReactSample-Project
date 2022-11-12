import axios from "axios";

export const getSingleAthlete = async (data) => {
  const body = data;
  try {
    const data = await axios.get(`/getAthlete/${body}`);
    // console.log(data);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const getRelatedSlots = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  try {
    const resp = await axios.get(`/getslots/${user.athlete_id}`);
    return resp;
  } catch (error) {
    return error.response;
  }
};
export const upDateAthlete = async (data) => {
  const body = data;
  try {
    const data = await axios.post(`/editathlete`, body);
    return data;
  } catch (error) {
    return error.response;
  }
};
export const addSlot = async (data) => {
  const body = data;
  try {
    const data = await axios.post(`/newslot`, body);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const getIncome = async (data) => {
  const body = data;
  try {
    const data = await axios.get(`/incom/${body}`);
    // console.log(data);
    return data;
  } catch (error) {
    return error.response;
  }
};
