import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';


@Component({
  selector    : 'page-user-login',
  templateUrl : 'user-login.html'
})
export class UserLoginPage {
  loading: any;
 
  constructor(
  	public  navCtrl     : NavController,
  	public  auth        : Auth,
  	public  user        : User,
  	private loadingCtrl : LoadingController) {
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: "Authenticating..."
    });
 
    this.loading.present();
 
  }
 
  signupEmail(email, password){
 
    this.showLoader();
 
    let details: UserDetails = {
        'email': email, 
        'password': password
    };
 
    this.auth.signup(details).then(() => {
 
        this.loading.dismiss();
 
        // success
        console.log(this.user);
 
    }, (err: IDetailedError<string[]>) => {
 
        this.loading.dismiss();
 
        // handle errors
        for(let error of err.details){
 
            if(error === 'required_email'){
                // email missing
            } else if(error === 'required_password'){
                // password missing
            } else if(error === 'conflict_email'){
                // email already in use
            } else if (error === 'conflict_username'){
                // username alerady in use
            } else if (error === ' invalid_email'){
                // email not valid
            }
 
        }
 
    });
 
  }
 
  login(email, password){
 
    this.showLoader();
 
    let details: UserDetails = {
        'email': 'user@email.com',
        'password': '123456'
    };
 
    this.auth.login('basic', details).then(() => {
 
        this.loading.dismiss();
 
        // success
        console.log(this.user);
 
    }, (err) => {
 
        this.loading.dismiss();
 
        // problem logging in
        console.log(err);
 
    });
 
  }
 
  logout(){
    this.auth.logout();
  }
 
  testSignup(){
    this.signupEmail('me@test.com', 'password');
  }
 
  testLogout(){
    this.logout();
  }
 
  testLogin(){
    this.login('me@test.com', 'password');
  }
 


}
