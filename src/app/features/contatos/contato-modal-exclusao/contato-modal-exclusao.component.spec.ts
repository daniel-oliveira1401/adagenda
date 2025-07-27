/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContatoModalExclusaoComponent } from './contato-modal-exclusao.component';

describe('ContatoModalExclusaoComponent', () => {
  let component: ContatoModalExclusaoComponent;
  let fixture: ComponentFixture<ContatoModalExclusaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoModalExclusaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoModalExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
