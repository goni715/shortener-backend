import express from "express";
import UrlController from "../controllers/url.controller";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constants/user.constant";
import validationMiddleware from "../middlewares/validationMiddleware";
import { createShortUrlSchema } from "../validation/url.validation";


const router = express.Router();


router.post(
  "/create-short-url",
  AuthMiddleware(UserRole.user),
  validationMiddleware(createShortUrlSchema),
  UrlController.createShortUrl
);
router.get(
  "/get-urls",
  AuthMiddleware(UserRole.user),
  UrlController.getUrls
);
router.get(
  "/redirect/:code",
  UrlController.redirectUrl
);
router.delete(
  "/delete-url/:urlId",
  AuthMiddleware(UserRole.user),
  UrlController.deleteUrl
);

const UrlRoutes = router;
export default UrlRoutes;