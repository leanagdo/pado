import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { PhotosComponent } from './photos.component';
import { PhotosData } from './photos.data';
import { PhotosDialogComponent } from './photos-dialog/photos-dialog.component';

export const routes = [
  { path: '', component: PhotosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(PhotosData, { delay: 500 }),
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    PhotosComponent,
    PhotosDialogComponent
  ],
  entryComponents:[
    PhotosDialogComponent
  ]
})
export class PhotosModule { }
