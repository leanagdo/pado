import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
//import { Photo, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from './photos.model';
import { PhotosService } from './photos.service';
import { PhotosDialogComponent } from './photos-dialog/photos-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ PhotosService ]  
})
export class PhotosComponent implements OnInit {
    public photos = [];
    public searchText: string;
    public page:any;
    public settings: Settings;
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public photosService:PhotosService){
        this.fetch((data) => {
            debugger;
            this.photos = data.photos;
            console.log(this.photos);
            setTimeout(() => { }, 1500);
            });     
                    
    }

    
    fetch(data) {
        const req = new XMLHttpRequest();
        req.open('GET', 'assets/data/photos.json');
        req.onload = () => {

            data(JSON.parse(req.response));
        };
        req.send();
    }
    


    ngOnInit() {
    }

    public getUsers(): void {
        this.photos = null; //for show spinner each time
       // this.photosService.getUsers().subscribe(photos => this.photos = photos);    
    }
    


    public onPageChanged(event){
        this.page = event;
        //this.getUsers();
        if(this.settings.fixedHeader){      
            document.getElementById('main-content').scrollTop = 0;
        }
        else{
            document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
    }


    public openPhotosDialog(user){
        debugger;
        let dialogRef = this.dialog.open(PhotosDialogComponent, {
            data: user, height: '90%', width: '95%'
        });

        dialogRef.afterClosed().subscribe(user => {
            // if(user){
            //     (user.id) ? this.updateUser(user) : this.addUser(user);
            // }
        });
    }

}