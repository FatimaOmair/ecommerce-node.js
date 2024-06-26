import { roles } from "../../middleware/auth.js";

export const endPoint={
    create:[roles.User],
    all:[roles.Admin],
    change:[roles.Admin],
    getOrder:[roles.User],
    get:[roles.Admin,roles.User],
    active:[roles.User],
    delete:[roles.Admin]
}