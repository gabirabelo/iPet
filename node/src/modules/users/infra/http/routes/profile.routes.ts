import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import ProfileController from "../controllers/ProfileController";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { join } from "path";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get("/", profileController.show);
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
      address_line: Joi.string(),
      postal_code: Joi.string(),
      number: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      state: Joi.string()
    },
  }),
  profileController.update
);

export default profileRouter;
