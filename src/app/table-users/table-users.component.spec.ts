import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsersComponent } from './table-users.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ServiceClient } from '../service/service.service';
import { of } from 'rxjs';
const responseGetUser = {
  "content": [
      {
          "id": 6,
          "nombre": "Ana",
          "apellido": "García",
          "correo": "ana.garcia@example.com"
      }
  ],
  "pageable": {
      "pageNumber": 1,
      "pageSize": 5,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "offset": 5,
      "paged": true,
      "unpaged": false
  },
  "last": false,
  "totalPages": 1,
  "totalElements": 1,
  "first": false,
  "size": 5,
  "number": 1,
  "sort": {
      "empty": true,
      "sorted": false,
      "unsorted": true
  },
  "numberOfElements": 5,
  "empty": false
}
describe('TableUsersComponent', () => {
  let component: TableUsersComponent;
  let fixture: ComponentFixture<TableUsersComponent>;

  let mockSomeService = {
    getUser: () => of(responseGetUser),
    createUser: () => of({}),
    updateUser: () => of({}),
    deleteUser: () => of({
      "message": "User successfully deleted."
  })
  }
  let mockMessageService = {add: () => {}}
  let mockDialogService = {open: () => {}}
  let mockConfirmService = {
    confirm: () => of({})
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableUsersComponent ],
      imports:[
        HttpClientTestingModule, ToastModule, ConfirmDialogModule, TableModule, PaginatorModule
      ],
      providers:[
        DynamicDialogConfig,
        { provide: DialogService, useValue: mockDialogService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: DynamicDialogRef, useValue: {} },
        { provide: ConfirmationService, useValue: mockConfirmService },
        { provide: ServiceClient, useValue: mockSomeService }
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });


  // it('Llamada al metodo createUser()', () => {
  //   spyOn(mockDialogService, 'open').and.callFake(() => of({}));
  //   component.createUser();
  //   expect(mockDialogService.open).toHaveBeenCalled();
  // });

  // it('Llamada al metodo updateUser()', () => {
  //   spyOn(mockDialogService, 'open').and.callFake(() => of({}));
  //   component.updateUser(1);
  //   expect(mockDialogService.open).toHaveBeenCalled();
  // });

  it('Llamada al servicio getUser()', () => {
    spyOn(mockSomeService, 'getUser').and.returnValue( of(responseGetUser) );
    component.cargarTabla();
    expect(mockSomeService.getUser).toHaveBeenCalled();
    expect(component.items).toEqual(responseGetUser.content);
    expect(component.totalRecords).toEqual(responseGetUser.totalElements);
  })

  it('Llamada al servicio deleteUser()', () => {
    spyOn(mockSomeService, 'deleteUser').and.returnValue( of({"message": "User successfully deleted." }) );
    component.deleteUser();
    expect(mockSomeService.deleteUser).toHaveBeenCalled();

  })

  it('Llamada al servicio add()', () => {
    spyOn(mockMessageService, 'add').and.callFake(() => of({}));
    component.deleteUser();
    expect(mockMessageService.add).toHaveBeenCalled();

  })

  it('Llamada al metodo onPageChange()', () => {
    component.onPageChange({page:1, rows:5});
    expect(component.page).toEqual(1);
    expect(component.rows).toEqual(5);

  })

  it('Llamada al metodo openModal()', () => {
    component.openModal(1);
    expect(component.idDelete).toEqual(1);
    expect(component.alert).toEqual(true);

  })

});
