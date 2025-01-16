import { useMutation } from "react-query";
import { determineInstance } from "utils/helper";

const post = async ({ url, payload, type, token = false, file = false, customHeaders = {} }) => {
  const instance = determineInstance(type);
  let headers = {
    "Content-Type": "application/json",
    "Cookie": "pin_writes=y"
  };
  if (token) {
    const token = localStorage.getItem( "token" );
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ token }`,
    };
  }
  if(Object.keys(customHeaders).length > 0) {
    headers = {...headers, ...customHeaders}
  }
  if (file) {
    headers = { ...headers, "Content-Type": "image/jpeg" };
  }
  const { data } = await instance.post(url, payload, { headers:headers, responseType: file ? "blob" : "json" })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.dir(e, { depth: null });
      throw e;
    });
  return data;
};

const usePost = () => useMutation(post);

export default usePost;
