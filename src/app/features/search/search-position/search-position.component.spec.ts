import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPositionComponent } from './search-position.component';

describe('SearchPositionComponent', () => {
  let component: SearchPositionComponent;
  let fixture: ComponentFixture<SearchPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
