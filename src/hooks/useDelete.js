import { useMutation } from "react-query";
import { determineInstance } from "utils/helper";

const deleteRequest = async ({ url, type, token = false }) => {
  const instance = determineInstance(type);
  let headers = {};
  if (token) {
    const token = localStorage.getItem("token");
    console.log(token, "------------toke");
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const { data } = await instance
    .delete(url, { headers })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.dir(e, { depth: null });
      throw e;
    });
  return data;
};

const useDelete = () => useMutation(deleteRequest);

export default useDelete;
