import { Timestamp } from "@angular/fire/firestore";

export interface Habit {
  __id: string,
  _createdAt?: Timestamp,
  _updatedAt?: Timestamp,
  name: string,
  description: string,
}