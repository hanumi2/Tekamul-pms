import { ROLES } from "../models/mockData";

export const getDashboardPath = (role) => {
  if (!role) return "/login";
  
  switch (role) {
    case ROLES.ADMIN:
      return "/admin/dashboard";
    case ROLES.PROJECT_MANAGER:
      return "/pm/dashboard";
    case ROLES.ENGINEER:
      return "/engineer/dashboard";
    case ROLES.MESSENGER:
      return "/messenger/dashboard";
    case ROLES.CLIENT:
      return "/client/dashboard";
    case ROLES.DIRECTOR:
      return "/director/dashboard";
    default:
      return "/login";
  }
};
