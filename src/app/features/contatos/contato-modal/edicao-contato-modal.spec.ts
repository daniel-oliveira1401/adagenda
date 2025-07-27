import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoContatoModal } from './edicao-contato-modal';

describe('ContatoModal', () => {
  let component: EdicaoContatoModal;
  let fixture: ComponentFixture<EdicaoContatoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdicaoContatoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoContatoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
