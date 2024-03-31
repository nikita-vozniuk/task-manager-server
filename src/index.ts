import express from 'express';
import http from 'http';
import cron from 'node-cron';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { Server } from 'socket.io';

import { client } from './utils/mongo.connect';

import { ITask } from './types';
import { TaskModel } from './db/tasks';

import router from './router';

import { PORT, DATABASE_URL } from './config';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
   console.log(`Database url: ${DATABASE_URL}`);
});

const io = new Server(server);

client.then(() => console.log('DB running'));

const pendingNotifications: Map<string, ITask[]> = new Map();

cron.schedule('0 0 * * *', async () => {
    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

    const tasksDueTomorrow = await TaskModel.find({ dueDate: { $lte: oneDayFromNow } });

    tasksDueTomorrow.forEach(task => {
        if (task.user.toString() in pendingNotifications) {
            pendingNotifications.get(task.user.toString()).push(task);
        } else {
            pendingNotifications.set(task.user.toString(), [task]);
        }
    });

    io.emit('notification', tasksDueTomorrow);
});

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (pendingNotifications.has(userId)) {
        const notifications = pendingNotifications.get(userId);
        socket.emit('notification', notifications);
        pendingNotifications.delete(userId);
    }
});

app.use('/', router());

export default server;
