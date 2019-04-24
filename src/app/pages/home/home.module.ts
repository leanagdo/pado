import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PDFDialogComponent } from './pdf-dialog/pdf-dialog.component';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule

  ],
  declarations: [
    HomeComponent,
    PDFDialogComponent
  ],
  entryComponents:[
    PDFDialogComponent
  ]

})
export class HomeModule { }
