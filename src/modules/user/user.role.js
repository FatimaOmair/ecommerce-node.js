import { roles } from "../../middleware/auth.js";

export const endPoint={
    getUserData:[roles.User,roles.Admin],
    getUsers:[roles.Admin]
}