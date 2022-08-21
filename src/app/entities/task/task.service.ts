
import { CollectionReference, DocumentData, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Firestore, collectionData, docData, setDoc, Timestamp, query, where } from '@angular/fire/firestore';

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
      where('completed', '==', false)
    );
    const startOfDay = Timestamp.fromMillis(new Date().setHours(0, 0, 0, 0));
    const endOfDay = Timestamp.fromMillis(new Date().setHours(24, 0, 0, 0));
    const todayTasksQuery = query(this.taskCollection, 
      where('_createdAt', '>=', startOfDay), 
      where('_createdAt', '<=', endOfDay), 
      where('completed', '==', true)
    );
    const oldTasks$ = collectionData(oldTasksQuery);
    const todayTasks$ = collectionData(todayTasksQuery);
    return combineLatest([oldTasks$, todayTasks$]).pipe(
      map(([oldTasksData, todayTasksData]) => {
        return [...new Set([...oldTasksData, ...todayTasksData])];
      })
    ) as Observable<Task[]>;
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
    return setDoc(tasksDocumentReference, task);
  }

  update(task: Task) {
    const tasksDocumentReference = doc(this.firestore, `pokemon/${task.__id}`);
    task._updatedAt = Timestamp.now();
    return updateDoc(tasksDocumentReference, { ...task });
  }

  delete(id: string) {
    const tasksDocumentReference = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(tasksDocumentReference);
  }

  
}