import { Component, OnInit } from '@angular/core';
import { ServiceClient } from '../service/service.service';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalUpdateComponent } from '../modal/modal-update/modal-update.component';
import { ModalAddComponent } from '../modal/modal-add/modal-add.component';
import { Form } from '@angular/forms';
import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit{
  
  items:any =[]
  page: number = 0;
  totalRecords:number = 0
  rows: number = 5;

  displayModal: boolean = false

  ngOnInit(){
    this.cargarTabla();
  }

  constructor( private messageService:MessageService,
              private service: ServiceClient,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public dialogService: DialogService
  ){

  }

  cargarTabla(){
    this.service.getUser(this.page, this.rows).subscribe((response) => {
      this.items = response.content;
      this.totalRecords = response.totalElements;
    });
  }



  onPageChange(event:any) {
    this.page = event.page;
    this.rows = event.rows;
    this.cargarTabla();
  }

  updateUser(value:any) {
    const ref = this.dialogService.open(ModalUpdateComponent, {
        data: value,
        header: 'Actualizar usuario',
        width: '60%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000
    });

    ref.onClose.subscribe((resp: any) => {
      if (resp) {
        this.messageService.add({severity:'success', summary:'Exitoso¡¡', detail:'Usuario creado correctamente.'});
        this.cargarTabla();
      } else {
        this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo crear el usuario.'});
      }
    });
  }

  createUser(){const ref = this.dialogService.open(ModalAddComponent, {
    header: 'Crear nuevo usuario',
    width: '60%',
    contentStyle: {"max-height": "500px", "overflow": "auto"},
    baseZIndex: 10000

  });
  ref.onClose.subscribe((resp: any) => {
    if (resp) {
      console.log(resp, "este valor se devolvio al")
      this.messageService.add({severity:'success', summary:'Exitoso¡¡', detail:'Usuario creado correctamente.'});
      this.cargarTabla();
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo crear el usuario.'});
    }
  });
  }

  deleteUser(id:number){
    this.service.deleteUser(id).subscribe((resp)=>{
      console.log(resp)
      this.cargarTabla()
    })
  }


}




