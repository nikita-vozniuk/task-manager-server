import mongoose, { Schema } from 'mongoose';

import { ITask } from '../types';

const TaskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);

export const getTaskById = (id: string) => TaskModel.findById(id);
export const getUserTasks = (userId: string) => TaskModel.find({ user: userId }).populate('user').exec();
export const createTask = (values: Partial<ITask>) => new TaskModel(values)
    .save().then((task) => task.toObject());
export const deleteTaskById = (id: string) => TaskModel.findOneAndDelete({ _id: id });
export const updateTaskById = (id: string, values: Partial<ITask>) =>
    TaskModel.findByIdAndUpdate(id, values);