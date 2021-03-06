import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { Photo, UserProfile, UserWork, UserContacts, UserSocial, UserSettings } from '../photos.model';

@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.scss']
})
export class PDFDialogComponent implements OnInit {
  public form:FormGroup;
  public passwordHide:boolean = true;
  constructor(public dialogRef: MatDialogRef<PDFDialogComponent>,
              // @Inject(MAT_DIALOG_DATA) public user: Photo,
              public fb: FormBuilder) {
    this.form = this.fb.group({
      id: null,
      username: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],       
      profile: this.fb.group({
        name: null,
        surname: null,  
        birthday: null,
        gender: null,
        image: null
      }),
      work: this.fb.group({
        company: null,
        position: null,
        salary: null
      }),
      contacts: this.fb.group({
        email: null,
        phone: null,
        address: null          
      }),
      social: this.fb.group({
        facebook: null,
        twitter: null,
        google: null
      }),
      settings: this.fb.group({
        isActive: null,
        isDeleted: null,
        registrationDate: null,
        joinedDate: null
      })
    });
  }

  ngOnInit() {
    // if(this.user){
    //   this.form.setValue(this.user);
    // } 
    // else{
      // this.user = new User();
      // this.user.profile = new UserProfile();
      // this.user.work = new UserWork();
      // this.user.contacts = new UserContacts();
      // this.user.social = new UserSocial();
      // this.user.settings = new UserSettings();
    // } 
  }

  close(): void {
    this.dialogRef.close();
  }

}
