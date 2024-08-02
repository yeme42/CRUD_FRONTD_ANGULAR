import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddComponent } from './modal-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ServiceClient } from 'src/app/service/service.service';

describe('ModalAddComponent', () => {
  let mockServiceClient = {
    createUser: () => of( 
      {
          "id": 21,
          "nombre": "yerinson",
          "apellido": "muentes",
          "correo": "muentes@correo.com"
      }
    )
  }
  let mockDynamicDialogRef = {
    close: () => {}
  }
  let component: ModalAddComponent;
  let fixture: ComponentFixture<ModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddComponent ],
      imports:[HttpClientTestingModule, ReactiveFormsModule],
      providers: [DynamicDialogConfig,
         { provide: ServiceClient, useValue: mockServiceClient },
         { provide: DynamicDialogRef, useValue: mockDynamicDialogRef } 
        ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Llamada al metodo selectCar()', () => {
    spyOn(mockDynamicDialogRef, 'close').and.callFake(() => of({}));
    component.selectCar();
    expect(mockDynamicDialogRef.close).toHaveBeenCalled();
  });

  it('Llamada al servicio createUser()', () => {
    spyOn(mockServiceClient, 'createUser').and.returnValue(of(
      {
        "id": 21,
        "nombre": "yerinson",
        "apellido": "muentes",
        "correo": "muentes@correo.com"
    }));

    component.form.patchValue({nombre:'Prueba', apellido:'Actualizar', correo:'prueba@correo.com'})
    component.submit();
    expect(component.form.valid).toBe(true);
    expect(mockServiceClient.createUser).toHaveBeenCalled();
  })

  it('Valida formulario reactivo', () => {
    component.form.reset()
    component.submit();
    expect(component.form.valid).toBe(false);

  })

});
