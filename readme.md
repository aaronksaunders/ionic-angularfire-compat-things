

- create ionic angular project
- install angular fire `npm install @angular/fire`
- add imports
```javascript
// app.module.ts
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
```
- add imports and includes firebase config from environments
```javascript
// app.module.ts
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  ```
  - inside home.page.ts add the angular fire imports
```javascript
// home.page.ts
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
```
- lets add some variable for the component
```javascript
// are we still loading the user check
loading = true;

// is user authenticated
isAuthenticated = false;

// used in login form
email: string = '';
password: string = '';

// user if authenticated
user: any | null = null;

// things from the collection
things$: any;
  ```
- in the constructor make the following changes
```javascript
// home.page.ts
  constructor(
    public readonly auth: AngularFireAuth,
    public readonly firestore: AngularFirestore
  ) {}
```
- ngInit will set up the component and check if there is a user, if user then get informtion from the things collection. We are using the loading flag to prevent the UI from being rendered until we know if we have a user or not
```javascript
// home.page.ts
  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.isAuthenticated = user !== null;
      this.user = user;
      console.log('user', user?.email);
      this.loading = false;

      user && this.loadThings();
    });
  }
```
- if we are not logged in then `isAuthenticated` will be false. the component template renders the `authview` template if authenticated and the `loginview` template if not. it also loads the spinner if loading...
```html
<ion-content [fullscreen]="true">
  <!-- Loading indicator -->
  <ng-container *ngIf="loading; else authLoaded">
    <ion-spinner></ion-spinner>
  </ng-container>

  <ng-template #authLoaded>
    <!-- Loading completed... -->
    <ng-container *ngIf="!isAuthenticated; else authview" #loginview>
        <!-- Un Authenticated UI... -->
    </ng-container>

    <ng-template #authview>
         <!-- Authenticated UI... -->
    </ng-template>
  </ng-template>
</ion-content>
```
- if we are done loading and dont have a user then the login information template `loginview` is rendered
```html
<ng-container *ngIf="!isAuthenticated; else authview" #loginview>
  <ion-card>
    <ion-card-header>
      <ion-card-title> Login </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input type="text" [(ngModel)]="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input type="password" [(ngModel)]="password"></ion-input>
      </ion-item>
      <ion-button expand="block" (click)="loginUser()">Login</ion-button>
    </ion-card-content>
  </ion-card>
</ng-container>
```
- if we have a user, then the `authview` is loaded
```html
<ng-template #authview>
  <ion-card>
    <ion-card-content>
      <ion-item
        lines="none"
        style="--inner-padding-end: 0px; --padding-start: 0px"
      >
        <h2>Welcome {{ user?.email }}</h2>
      </ion-item>
    </ion-card-content>
  </ion-card>
</ng-template>
```
- if we are logged in and have a user we call `loadThings` to get information from the collection and setting the `things$` observable
```javascript
// home.page.ts
  loadThings() {
    console.log('Loading things...');
    this.things$ = this.firestore
      .collection('Things')
      .valueChanges({ idField: 'id' });
  }
```
