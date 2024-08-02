import { TestBed } from '@angular/core/testing';

import { ServiceClient } from './service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ServiceService', () => {
  let service: ServiceClient;
  let httpMock:HttpTestingController;
  let response = {
          "id": 21,
          "nombre": "yerinson",
          "apellido": "muentes",
          "correo": "muentes@correo.com" };
  let responseGetUser = {
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(ServiceClient);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('debe crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('llamada al metodo createUser', () => {
    service.createUser({
      "id": 21,
      "nombre": "yerinson",
      "apellido": "muentes",
      "correo": "muentes@correo.com"
  }).subscribe(resp => {
      expect(resp).toEqual(response)
    })

    const req = httpMock.expectOne('http://localhost:3000/users');
    req.flush(response)

  });

  it('llamada al metodo updateUser', () => {
    service.updateUser({
      "nombre": "yerinson",
      "apellido": "muentes",
      "correo": "muentes@correo.com"
  }, 21).subscribe(resp => {
      expect(resp).toEqual(response)
    })

    const req = httpMock.expectOne('http://localhost:3000/users/21');
    req.flush(response)

  });

  it('llamada al metodo getUser', () => {
    service.getUser(1, 5).subscribe(resp => {
      expect(resp).toEqual(responseGetUser)
    })

    const req = httpMock.expectOne('http://localhost:3000/users/paged?page=1&size=5');
    req.flush(responseGetUser)

  });

  it('llamada al metodo deleteUser', () => {
    service.deleteUser(1).subscribe(resp => {
      expect(resp).toEqual({"message": "User successfully deleted." })
    })

    const req = httpMock.expectOne('http://localhost:3000/users/1');
    req.flush({"message": "User successfully deleted." })

  });


});
