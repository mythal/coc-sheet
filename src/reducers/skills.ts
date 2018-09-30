import { Skill, skillList } from "../system/skills";
import { EditSkills } from "../actions";
import { EDIT_SKILLS } from "../constants";

export const skills = (state: Array<Skill> = skillList, action: EditSkills) => {
  if (action.type === EDIT_SKILLS) return action.skills;
  return state;
};
