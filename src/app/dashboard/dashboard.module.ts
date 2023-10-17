import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
