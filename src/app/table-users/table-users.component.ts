import { Component, OnInit } from '@angular/core';
import { ServiceClient } from '../service/service.service';
import { ConfirmationService, ConfirmEventType, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalUpdateComponent } from '../modal/modal-update/modal-update.component';
import { ModalAddComponent } from '../modal/modal-add/modal-add.component';
import Swal from 'sweetalert2'
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

  idDelete:any=[]
  alert:boolean=false 

  ngOnInit(){
    this.cargarTabla();
  }

  constructor( private messageService:MessageService,
              private service: ServiceClient,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public dialogService: DialogService,
              private confirmationService: ConfirmationService
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
  
  createUser(){const ref = this.dialogService.open(ModalAddComponent, {
    header: 'Crear nuevo usuario',
    width: '40%',
    contentStyle: {"max-height": "400px", "overflow": "auto" },
    baseZIndex: 10000

  });
  ref.onClose.subscribe((resp: any) => {
    if (resp) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Usuario creado con exito."
      });
      this.cargarTabla();
    } else {
    }
  });
  }

  updateUser(value:any) {
    const ref = this.dialogService.open(ModalUpdateComponent, {
        data: value,
        header: 'Actualizar usuario',
        width: '40%',
        contentStyle: {"max-height": "400", "overflow": "auto"},
        baseZIndex: 10000
    });

    ref.onClose.subscribe((resp: any) => {
      if (resp) {
        
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "info",
          title: "Actualizado con exito"
        });

        this.cargarTabla();
      } else {
      }
    });
  }


  deleteUser(){
    this.service.deleteUser(this.idDelete).subscribe((resp)=>{
      this.messageService.add({ key: 'confirmed', severity: 'success', summary: 'Eliminado', detail: 'Usuario eliminado correctamente.' });
      this.cargarTabla()
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Eliminado con exito"
      });
    })
  }

  openModal(data:any){
    this.idDelete = data
    this.alert= true
    console.log("se esta enviadno esto", this.idDelete)
  }

}




