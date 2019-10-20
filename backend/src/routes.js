import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EventsmeetupsControlle from './app/controllers/EventsmeetupsControlle';
import SubscriptionmeetupsController from './app/controllers/SubscriptionmeetupsController';
import ScheduleEventsController from './app/controllers/ScheduleEventsController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/events', EventsmeetupsControlle.index);
routes.post('/events', EventsmeetupsControlle.store);
routes.put('/events/:_id', EventsmeetupsControlle.update);
routes.delete('/events/:_id', EventsmeetupsControlle.delete);

routes.get('/schedules', ScheduleEventsController.index);

routes.get('/subscriptions', SubscriptionmeetupsController.index);
routes.post('/subscriptions/:_eventId', SubscriptionmeetupsController.store);
routes.delete('/subscriptions/:_eventId', SubscriptionmeetupsController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
