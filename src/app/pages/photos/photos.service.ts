import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photos.model';

@Injectable()
export class PhotosService {
    public url = "api/users";
    constructor(public http:HttpClient) { }
    
    getUsers(): Observable<Photo[]> {
        return this.http.get<Photo[]>(this.url);
    }

} 