import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServiceClient } from 'src/app/service/service.service';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit{

  displayModal:boolean = false;
  form:FormGroup;

  ngOnInit(){

  }

  constructor(private fb: FormBuilder,
              private modalService: ServiceClient,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig
  ){
    this.form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]]
  });

  }

  selectCar() {
    this.ref.close();
}
  submit(){
    if (this.form.valid) {
      const formData = this.form.value; 
      this.modalService.createUser(formData).subscribe((resp)=>{
        this.form.reset
        this.ref.close(this.form.value)

      },(err)=>{
        console.log(err)
      })
    } else {
      console.log('Ocurrio un erorr o el Formulario es inválido');
    }
  }

}
