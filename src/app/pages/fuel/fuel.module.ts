import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { FuelComponent } from './fuel.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InfoFuelComponent } from './info-fuel/info-fuel.component';
import { ChartFuelComponent } from './chart-fuel/chart-fuel.component';

export const routes = [
  { path: '', component: FuelComponent, pathMatch: 'full' }
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
    FuelComponent,
    InfoFuelComponent,
    ChartFuelComponent
  ]
})
export class FuelModule { }
