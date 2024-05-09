import { roles } from "../../middleware/auth.js";

export const endPoint={
    create:[roles.Admin],
    get:[roles.Admin,roles.User],
    active:[roles.User],
    delete:[roles.Admin]
}