import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonModal, ModalController } from '@ionic/angular';
import { ThingModalComponent } from '../components/thing-modal/thing-modal.component';
import { ThingsService } from '../services/things.service';
import { ThingCreateInput, ThingEditInput } from '../services/things.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) addThingModal: IonModal = undefined!;

  loading = true;
  isAuthenticated = false;
  email: string = '';
  password: string = '';
  user: any | null = null;

  things$: any;

  constructor(
    public readonly auth: AngularFireAuth,
    private modalController: ModalController,
    private thingsService: ThingsService
  ) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.isAuthenticated = user !== null;
      this.user = user;
      console.log('user', user?.email);
      this.loading = false;

      if (user) {
        this.things$ = this.thingsService.loadThings();
      }
    });
  }

  /// AUTHENTICATION
  async loginUser() {
    try {
      await this.auth.signInWithEmailAndPassword(this.email, this.password);
    } catch (error) {
      alert('Error logging in' + (error as Error)?.message);
    }
  }

  async logoutUser() {
    try {
      await this.auth.signOut();
    } catch (error) {
      alert('Error logging in' + (error as Error)?.message);
    }
  }

  /**
   * Handles the addition of a thing.
   */
  handleAddThing() {
    console.log('Adding thing');
    this.openModal();
  }

  /**
   * Handles the deletion of a thing.
   * @param id - The ID of the thing to be deleted.
   */
  handleDeleteThing(id: string) {
    console.log('Deleting thing', id);
    this.thingsService.deleteThing(id);
  }

  /**
   * Handles the update of a thing. is called when the edit button is clicked on a thing.
   * gets the thing to be updated from the database and passes it to the modal.
   *
   * @param id - The ID of the thing to be updated.
   */
  handleUpdateThing(id: string) {
    console.log('Editing thing', id);

    // get the thing to edit from the database
    this.thingsService.getThing(id)?.subscribe((doc) => {
      // pass the data to the modal
      this.openModal({ ...(doc.data() as any), id: doc.id });
    });
  }

  /**
   * Opens a modal with the given modalData.
   * @param {ThingCreateInput | undefined} modalData - The data to be passed to the modal.
   * @returns A promise that resolves when the modal is presented.
   */
  async openModal(modalData?: ThingCreateInput) {
    // create the modal
    const modal = await this.modalController.create({
      component: ThingModalComponent,
      componentProps: {
        data: modalData,
      },
    });

    // get information back when modal is dismissed
    modal.onDidDismiss().then((modalResponse) => {
      let responseData = modalResponse.data;
      let modalType = responseData.data.modalType;
      let modalData = responseData.data.data as
        | ThingCreateInput
        | ThingEditInput;

      if (responseData.role === 'confirm') {
        // Handle confirm event
        console.log('Confirm event data:', responseData.data);
        if (modalType === 'add') {
          this.thingsService.saveThing(modalData);
        } else if (modalType === 'update') {
          this.thingsService.updateThing(modalData as ThingEditInput);
        }
      } else if (responseData.role === 'cancel') {
        // Handle cancel event
        console.log('Cancel event data:', responseData.data);
      }
    });

    // present the modal
    return await modal.present();
  }
}
