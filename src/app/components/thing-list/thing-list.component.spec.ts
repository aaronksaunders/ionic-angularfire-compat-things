import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThingListComponent } from './thing-list.component';

describe('ThingListComponent', () => {
  let component: ThingListComponent;
  let fixture: ComponentFixture<ThingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ThingListComponent]
}).compileComponents();

    fixture = TestBed.createComponent(ThingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
