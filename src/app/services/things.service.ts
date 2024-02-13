import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  CollectionReference,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Timestamp } from '@angular/fire/firestore';
import { ThingCreateInput, ThingEditInput } from './things.model';

@Injectable({
  providedIn: 'root',
})
export class ThingsService {
  private thingsRef: AngularFirestoreCollection<any> | undefined = undefined;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.thingsRef = this.firestore.collection('Things');
  }

  /// THINGS - LOADING
  loadThings() {
    console.log('Loading things...');
    return this.thingsRef?.valueChanges({ idField: 'id' });
  }

  /// THINGS - DELETING
  deleteThing(id: string) {
    this.thingsRef?.doc(id).delete();
  }

  /**
   * Adds a new thing to the collection.
   * @param {ThingCreateInput} thing - The thing to be added.
   * @returns {Promise<DocumentReference | null>} A promise that resolves with the reference
   *  to the added document, or null if an error occurred.
   */
  async saveThing({ name, description }: ThingCreateInput) {
    try {
      return this.thingsRef?.add({
        name,
        description,
        created: Timestamp.now(),
        updated: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error adding thing', error);
      return null;
    }
  }

  /// THINGS - UPDATING
  /**
   * Updates a thing with the specified ID, name, and description by saving it to the database.
   *
   * @param {any} param - The object containing the ID, name, and description of the thing.
   * @returns {Promise<any>} - A promise that resolves when the thing is successfully updated,
   *  or null if there was an error.
   */
  async updateThing({ id, name, description }: ThingEditInput) {
    try {
      return this.thingsRef?.doc(id).update({
        name,
        description,
        updated: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating thing', error);
      return null;
    }
  }

  /// THINGS - GETTING
  /**
   * Gets the thing to be updated from the database and passes it to the modal.
   *
   * @param id - The ID of the thing to be updated.
   */
  getThing(id: string): Observable<any> | undefined {
    return this.thingsRef?.doc(id).get();
  }
}
