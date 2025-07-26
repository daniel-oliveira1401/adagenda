import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoModal } from './contato-modal';

describe('ContatoModal', () => {
  let component: ContatoModal;
  let fixture: ComponentFixture<ContatoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContatoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
