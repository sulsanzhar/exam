import App from './app';
import logger from './middlewares/logger';
import cors from 'cors';
import { UserRoute } from './routes/user.route';
import { DocumentsRoute } from '@/routes/documents.route';
import { DealHistoryRoute } from '@/routes/dealHistory.route';
import { AdminRoute } from './routes/admin.route';
import { RatingRoute } from './routes/rating.route';
import { NotificationRoute } from './routes/notifications.route';
import { userSocketHandler } from '@/sockets/userSocketHandler';
import { ChatHistoryRoute } from '@/routes/chatHistory.route';
import { OpenAIRoute } from './routes/openAI.route';
import { ToDoListRoute } from './routes/toDoList.route';

const app = new App({
    port: 8000,
    middlewares: [
        logger(),
        cors({
            credentials: true,
            origin: ['http://localhost:5173','http://77.240.39.89:8080'],
        }),
    ],
    controllers: [new UserRoute(), new DocumentsRoute(), new DealHistoryRoute(),
    new AdminRoute(), new NotificationRoute(), new RatingRoute(), new ChatHistoryRoute(),
    new OpenAIRoute(), new ToDoListRoute()]
});

app.listen().then(() => {
    userSocketHandler(app.getServer());
})

export default app;