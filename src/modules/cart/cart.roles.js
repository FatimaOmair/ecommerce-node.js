import { roles } from "../../middleware/auth.js";

export const endPoint={
    create:[roles.User],
    destroy:[roles.User]
}