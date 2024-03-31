import { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken?: string;
    };
}

interface ITask extends Document {
    title: string;
    description: string;
    dueDate?: Date;
    completed: boolean;
    user: Schema.Types.ObjectId;
}

export { IUser, ITask };
