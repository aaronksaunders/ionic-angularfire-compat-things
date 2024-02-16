import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(public readonly firebaseApp: FirebaseApp,) {
    console.log(firebaseApp.name)
  }
}
