import { PoeItem, PoePassive } from "@/types";

export default (data: PoeItem | PoePassive) => {
  if (!data.sections) {
    data.sections = {};
  }

  return data;
};
