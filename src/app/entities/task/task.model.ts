import { Timestamp } from "@angular/fire/firestore";

export interface Task {
  __id?: string,
  _createdAt?: Timestamp,
  _updatedAt?: Timestamp,
  name: string,
  description?: string,
  completeBy: Timestamp | null,
  completed?: boolean,
  completedAt: Timestamp | null,
}

/**
 * DESIGN
 * Main properties
 * __id
 * _createdAt?
 * _updatedAt?
 * name
 * completed
 * 
 * Task that can be of different types
 * 
 */