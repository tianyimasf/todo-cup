// src/models/Todo.ts

import mongoose, { Document, Schema } from 'mongoose';

interface ITodo extends Document {
  taskName: string;
  description: string;
  category: string;
  estimatedHours: number;
  estimatedMinutes: number;
  dueDate: string;
  completed: string;
}

const TodoSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    estimatedHours: { type: Number, required: true },
    estimatedMinutes: { type: Number, required: true },
    dueDate: { type: String, required: true },
    completed: { type: String, required: true },
  },
  {
    timestamps: true, // To track created and updated times
  }
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;
