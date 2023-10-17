import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
