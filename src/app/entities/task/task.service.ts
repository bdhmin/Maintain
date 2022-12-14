
import { CollectionReference, DocumentData, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Firestore, collectionData, docData, setDoc, Timestamp, query, where, onSnapshot, onSnapshotsInSync } from '@angular/fire/firestore';

import { Injectable } from "@angular/core";
import { combineLatest, map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.taskCollection = collection(this.firestore, 'tasks');
  }

  getAll(): Observable<Task[]> {
    return collectionData(this.taskCollection, {
      idField: '__id',
    }) as Observable<Task[]>;
  }

  getTasksOfToday(): Observable<Task[]> {
    const oldTasksQuery = query(this.taskCollection,
      where('_createdAt', '<=', Timestamp.now()),
      where('completed', '==', false),
      where('isHabit', '==', false),
    );
    const startOfDay = Timestamp.fromMillis(new Date().setHours(0, 0, 0, 0));
    const endOfDay = Timestamp.fromMillis(new Date().setHours(24, 0, 0, 0));
    const completedTodayQuery = query(this.taskCollection,
      where('completedAt', '>=', startOfDay),
      where('completedAt', '<=', endOfDay),
      where('completed', '==', true),
      where('isHabit', '==', false),
    );
    const habitTasksQuery = query(this.taskCollection,
      where('isHabit', '==', true),
    );
    const oldTasks$ = collectionData(oldTasksQuery) as Observable<Task[]>;
    const completedTodayTasks$ = collectionData(completedTodayQuery) as Observable<Task[]>;
    const habitTasks$ = collectionData(habitTasksQuery) as Observable<Task[]>;
    return combineLatest([oldTasks$, completedTodayTasks$, habitTasks$]).pipe(
      map(([oldTasksData, completedTodayTasksData, habitTasksData]) => {
        return [...new Set([...oldTasksData, ...completedTodayTasksData, ...habitTasksData])]
          .sort((a, b) => (a._createdAt||Timestamp.now()).toMillis() - (b._createdAt||Timestamp.now()).toMillis());
      })
    );
  }



  getCompletedTasks(): Observable<Task[]> {
    const completedTasksQuery = query(this.taskCollection,
      where('completed', '==', true))
    const completedTasks$ = collectionData(completedTasksQuery) as Observable<Task[]>;
    return completedTasks$.pipe(
      map((completedTasks) => {
        return completedTasks
          .sort((a, b) => (a._createdAt||Timestamp.now()).toMillis() - (b._createdAt||Timestamp.now()).toMillis());
      })
    );
  }

  get(id: string) {
    const tasksDocumentReference = doc(this.firestore, `tasks/${id}`);
    return docData(tasksDocumentReference, { idField: '__id' });
  }

  create(task: Task) {
    const tasksDocumentReference = doc(collection(this.firestore, "tasks"));
    task.__id = tasksDocumentReference.id;
    task._createdAt = Timestamp.now();
    task._updatedAt = Timestamp.now();
    task.description = '';
    task.completed = false;
    task.completeBy = null;
    task.completedAt = null;
    task.completions = [];
    return setDoc(tasksDocumentReference, task);
  }

  update(task: Task) {
    const tasksDocumentReference = doc(this.firestore, `tasks/${task.__id}`);
    task._updatedAt = Timestamp.now();
    return updateDoc(tasksDocumentReference, { ...task });
  }

  delete(id: string) {
    const tasksDocumentReference = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(tasksDocumentReference);
  }


}