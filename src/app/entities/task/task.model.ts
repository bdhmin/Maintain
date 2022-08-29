import { Timestamp } from "@angular/fire/firestore";

export interface Task {
  __id?: string,
  _createdAt?: Timestamp,
  _updatedAt?: Timestamp,
  name: string,
  description?: string,
  // order: string,
  completed?: boolean,
  completeBy?: Timestamp | null,
  completedAt?: Timestamp | null,
  isHabit: boolean,
  completions?: Timestamp[],
}

// export interface Todo extends Task {

// }

// export interface Habit extends Task {
//   completions: {}
//   endDate?: Timestamp | null,
// }

/**
 * Design of the 'order' property
 * Instead of ordering by number which has limited precision,
 * order by string, where if a new item needs to be inserted between items
 * just append a another character
 * 
 * ALGORITHM DESIGN
 * Creating a new task and Inserting an existing task will have
 * same reordering algorithm.
 * 
 * CASES:
 * Insert (default on top)
 *  If no tasks exist, order = "m"
 *  If tasks, order = topTask.order.previousLetter() -> previousLetter() returns the previous letter or if its last char is a append a
 * Insert Bottom (feature to implement)
 *  If no tasks exist, order = "m"
 *  If tasks, order = botTask.order.nextLetter()
 * Insert Bewteen (feature to implement)
 *  If no tasks exist, order = "m"
 *  If tasks, order = betweenLetter() -> gets letter between top and bottom. If overlapping, append top string + last top char
 *  
 * Insert Top
 * Insert Bottom
 * Insert Between
 */

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