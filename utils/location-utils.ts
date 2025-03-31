import divisionsData from "@/data/divisions.json";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

export const divisions = divisionsData;
export const districts = districtsData;
export const upazilas = upazilasData;
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Get division name by ID
export const getDivisionNameById = (id: string): string => {
  const division = divisions.find((div) => div.id === id);
  return division ? division.name : "";
};

// Get district name by ID
export const getDistrictNameById = (id: string): string => {
  const district = districts.find((dist) => dist.id === id);
  return district ? district.name : "";
};

// Get upazila name by ID
export const getUpazilaNameById = (id: string): string => {
  const upazila = upazilas.find((upz) => upz.id === id);
  return upazila ? upazila.name : "";
};

// Get division ID by name
export const getDivisionIdByName = (name: string): string => {
  const division = divisions.find((div) => div.name === name);
  return division ? division.id : "";
};

// Get district ID by name
export const getDistrictIdByName = (name: string): string => {
  const district = districts.find((dist) => dist.name === name);
  return district ? district.id : "";
};

// Get upazila ID by name
export const getUpazilaIdByName = (name: string): string => {
  const upazila = upazilas.find((upz) => upz.name === name);
  return upazila ? upazila.id : "";
};

// Get districts by division name
export const getDistrictsByDivisionName = (
  divisionName: string
): typeof districts => {
  const divisionId = getDivisionIdByName(divisionName);
  if (!divisionId) return [];
  return districts.filter((district) => district.division_id === divisionId);
};

// Get upazilas by district name
export const getUpazilasByDistrictName = (
  districtName: string
): typeof upazilas => {
  const districtId = getDistrictIdByName(districtName);
  if (!districtId) return [];
  return upazilas.filter((upazila) => upazila.district_id === districtId);
};
