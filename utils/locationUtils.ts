import divisionsData from "@/data/divisions.json";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

export async function getLocationName(
  type: "division" | "district" | "upazila",
  id: string
): Promise<string> {
  let data;
  switch (type) {
    case "division":
      data = divisionsData;
      break;
    case "district":
      data = districtsData;
      break;
    case "upazila":
      data = upazilasData;
      break;
    default:
      return "Unknown";
  }

  const location = data.find((item) => item.id === id);
  return location ? location.name : "Unknown";
}
