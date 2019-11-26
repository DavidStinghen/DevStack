import { Router } from "express";
import multer from "multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import multerConfig from "./config/multer";
import FileController from "./app/controllers/FileController";
import JobController from "./app/controllers/JobController";
import JobFileController from "./app/controllers/JobFileController";
import ShareController from "./app/controllers/ShareController";
import ListController from "./app/controllers/ListController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/jobs", JobController.index);
routes.get("/jobs/:id", JobController.show);
routes.post("/jobs", JobController.store);
routes.put("/jobs/:id", JobController.update);
routes.delete("/jobs/:id", JobController.delete);

routes.post("/jobfiles", JobFileController.store);
routes.delete("/jobfiles/:id", JobFileController.delete);

routes.get("/shares", ShareController.index);
routes.post("/shares", ShareController.store);
routes.delete("/shares/:id", ShareController.delete);

routes.get("/lists", ListController.index);
routes.post("/lists", ListController.store);
routes.put("/lists/:id", ListController.update);
routes.delete("/lists/:id", ListController.delete);

export default routes;
