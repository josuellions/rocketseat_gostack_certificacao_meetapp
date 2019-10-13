import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import Eventsmeetups from './app/controllers/EventsmeetupsControlle';
import ScheduleEventsController from './app/controllers/ScheduleEventsController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/events', Eventsmeetups.index);
routes.post('/events', Eventsmeetups.store);

routes.get('/schedules', ScheduleEventsController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
