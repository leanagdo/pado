import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { BillCardComponent } from './billcard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SpentByCategoryComponent } from './spent-by-category/spent-by-category.component';
import { ChartSpentComponent } from './chart-spent/chart-spent.component';

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
    SpentByCategoryComponent,
    ChartSpentComponent,
  ]
})
export class BillCardModule { }
