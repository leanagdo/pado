import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'PhotosSearchPipe', pure: false })
export class PhotosSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(photo => {
        if (photo.url) {
          return photo.url.search(searchText) !== -1;
        }
        else{
          return photo.date.search(searchText) !== -1;
        }
      });
    }
  }
}