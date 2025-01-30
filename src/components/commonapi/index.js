import { useGet } from "hooks/useGet";
import {
  GET_ASSEMBLY_LIST,
  GET_ASSEMBLY_LIST_BY_DISTRICT,
  GET_DISTRICT_LIST_BY_STATE,
  GET_ELECTION_PARTY,
  GET_STATE_LIST,
  GET_ROLE_LIST,
} from "constants/api";

const fetchData = async ({ url, type }) => {
  const { mutateAsync } = useGet();
  try {
    const response = await mutateAsync({ url, type });
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const CommonApiService = {
  getUserRole: () => fetchData({ url: GET_ROLE_LIST, type: "details" }),
  getElectionParty: () =>
    fetchData({ url: GET_ELECTION_PARTY, type: "details" }),
  getStates: () => fetchData({ url: GET_STATE_LIST, type: "details" }),
  getDistrictByState: (stateId) =>
    fetchData({
      url: `${GET_DISTRICT_LIST_BY_STATE}${stateId}`,
      type: "details",
    }),
  getAssemblyListByState: (stateId) =>
    fetchData({ url: `${GET_ASSEMBLY_LIST}${stateId}`, type: "details" }),
  getAssemblyListByDistrict: (districtId) =>
    fetchData({
      url: `${GET_ASSEMBLY_LIST_BY_DISTRICT}${districtId}`,
      type: "details",
    }),
};
