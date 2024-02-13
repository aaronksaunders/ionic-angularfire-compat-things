import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss'],
})
export class ThingListComponent  implements OnInit {
  @Input() things: any;
  @Output() delete = new EventEmitter<string>(); 
  @Output() edit = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit() {
    return null
  }

}
