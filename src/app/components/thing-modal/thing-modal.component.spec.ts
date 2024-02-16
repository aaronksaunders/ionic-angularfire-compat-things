import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThingModalComponent } from './thing-modal.component';

describe('ThingModalComponent', () => {
  let component: ThingModalComponent;
  let fixture: ComponentFixture<ThingModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ThingModalComponent]
}).compileComponents();

    fixture = TestBed.createComponent(ThingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
