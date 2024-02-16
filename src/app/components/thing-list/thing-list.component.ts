import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { add, trash, create, addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({ add, trash, create, addCircle });

@Component({
  selector: 'app-thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon
  ],
})
export class ThingListComponent implements OnInit {
  @Input() things: any;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    return null;
  }
}
