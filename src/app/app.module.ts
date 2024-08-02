import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableUsersComponent } from './table-users/table-users.component';
import { ModalAddComponent } from './modal/modal-add/modal-add.component';
import { ModalUpdateComponent } from './modal/modal-update/modal-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    TableUsersComponent,
    ModalAddComponent,
    ModalUpdateComponent,
    FooterComponent,
    NavComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    ToastModule,
    MenubarModule,
    ConfirmDialogModule,
    
  ],
  entryComponents:[
    ModalUpdateComponent
  ],
  providers: [DialogService, DynamicDialogConfig,DynamicDialogRef, MessageService, ConfirmationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
