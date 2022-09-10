import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ProjectComponent } from './dialog/project/project.component';
import { ManageTimeEntriesComponent } from './manage-time-entries/manage-time-entries.component';
import { TimeEntriesComponent } from './dialog/time-entries/time-entries.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { TaskComponent } from './dialog/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageProjectComponent,
    ProjectComponent,
    ManageTimeEntriesComponent,
    TimeEntriesComponent,
    ManageEmployeeComponent,
    ManageTaskComponent,
    TaskComponent    
  ]
})
export class MaterialComponentsModule {}
