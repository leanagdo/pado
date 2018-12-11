import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form:FormGroup;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public fb: FormBuilder, public router:Router){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'login': ["guest", Validators.compose([Validators.required, Validators.minLength(3)])],
      //email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])] 
    });
  }

  public onSubmit(values:Object):void {
    debugger;
    //var email = this.form.value["email"];
    var login = this.form.value["login"];
    var password = this.form.value["password"];
    if (this.form.valid && login === "dpak" && password === "dominique") {
      this.router.navigate(['/']);
      this.settings.logged = true;
      debugger;
      this.settings.loggedLogin = login;
    }
    if (this.form.valid && login === "guest" && password === "guest") {
      this.router.navigate(['/']);
      this.settings.logged = true;
      debugger;
      this.settings.loggedLogin = login;
    }
  }

  public onExit(values:Object):void {
    this.router.navigate(['/']);
    this.settings.logged = false;
    this.settings.loggedLogin = null;
  }



  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }
}