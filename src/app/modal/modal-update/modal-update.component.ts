import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceClient } from 'src/app/service/service.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css']
})
export class ModalUpdateComponent implements OnInit{


  form:FormGroup;

  ngOnInit(): void {
  }
  constructor(private fb: FormBuilder,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private modalService:ServiceClient
  ){
    this.form = this.fb.group({
      nombre: [this.config.data.nombre, Validators.required],
      apellido: [this.config.data.apellido, Validators.required],
      correo: [this.config.data.correo, [Validators.required, Validators.email]]
    });
  }

  selectCar() {
    this.ref.close();
}

  submit(){
    if (this.form.valid) {
      
      const formData= this.form.value
      const id = this.config.data.id

      this.modalService.updateUser(formData, id).subscribe((resp)=>{
        this.ref.close(this.form.value)

      },(err)=>{
        console.log(err)
      })
    } else {
      console.log('Formulario inválido');
    }
  }

}
