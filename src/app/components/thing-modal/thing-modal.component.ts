import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-thing-modal',
    templateUrl: './thing-modal.component.html',
    styleUrls: ['./thing-modal.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        NgIf,
    ],
})
export class ThingModalComponent implements OnInit {
  @Input() data: any;
  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  modalType: 'add' | 'update' = 'add';
  modalData: any = {
    id: undefined,
    name: '',
    description: '',
  };
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    
    if (this.data && this.data.id) {
      this.modalType = 'update';
      this.modalData = { ...this.data };
    } else {
      this.modalType = 'add';
      this.modalData = {
        id: undefined,
        name: '',
        description: '',
      };
    }
  }

  handleConfirm() {
    
    this.confirm.emit({ modalType: this.modalType, data: this.modalData });
    this.modalController.dismiss({
      role: 'confirm',
      data: { modalType: this.modalType, data: this.modalData  },
    });
  }

  handleCancel() {
    
    this.cancel.emit({ modalType: this.modalType, data: null });
    this.modalController.dismiss({
      role: 'cancel',
      data: { modalType: this.modalType, data: null },
    });
  }
}
