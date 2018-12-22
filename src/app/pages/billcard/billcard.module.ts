import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { BillCardComponent } from './billcard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const routes = [
  { path: '', component: BillCardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule,
    SharedModule,
    NgxDatatableModule,

  ],
  declarations: [
    BillCardComponent,
  ]
})
export class BillCardModule { }
