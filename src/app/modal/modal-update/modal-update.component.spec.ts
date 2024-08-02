import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateComponent } from './modal-update.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ServiceClient } from 'src/app/service/service.service';

describe('ModalUpdateComponent', () => {
  let mockDynamicDialogRef = {
    close: () => {}
  }
  let mockServiceClient = {
    updateUser: () => of({
      "id": 4,
      "nombre": "Prueba",
      "apellido": "Actualizar",
      "correo": "prueba.actualizar@correo.com"
  }),
   
  }
  let component: ModalUpdateComponent;
  let fixture: ComponentFixture<ModalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateComponent ],
      imports:[HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: DynamicDialogRef, useValue: mockDynamicDialogRef }, DynamicDialogConfig, { provide: ServiceClient, useValue: mockServiceClient } ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateComponent);
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


  it('Llamada al servicio updateUser()', () => {
    spyOn(mockServiceClient, 'updateUser').and.returnValue(of({
      "id": 4,
      "nombre": "Prueba",
      "apellido": "Actualizar",
      "correo": "prueba.actualizar@correo.com"}));

    component.form.patchValue({nombre:'Prueba', apellido:'Actualizar', correo:'prueba@correo.com'})
    component.submit();
    expect(component.form.valid).toBe(true);
    expect(mockServiceClient.updateUser).toHaveBeenCalled();
  })

  it('Valida formulario reactivo', () => {

    component.form.reset()
    component.submit();
    expect(component.form.valid).toBe(false);

  })
});
