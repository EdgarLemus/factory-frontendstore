import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { MatDialogRef } from '@angular/material';
import { SignInComponent } from '../pages/sign-in/sign-in.component';

@Injectable()
export class AuthService {

    public userProfile: any;

    auth0 = new auth0.WebAuth({
        clientID: '9bKqwjFywLBaRroDIi4bH1TYzwVssMyx',
        domain: 'dev-2tgff13e.auth0.com',
        responseType: 'token id_token',
        redirectUri: environment.URLAmazon,
        scope: 'openid profile'
    });

    constructor(public router: Router) {
    }

    public login(): void {

        //this.auth0.authorize();
    }

    

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['']);
            } else if (err) {
                this.router.navigate(['']);
                console.log(err);
            }
        });
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                //this.logout();
            }
        });
    }

    public setSession(authResult): void {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
        localStorage.setItem('access_token_jwt', authResult.access_token);
        localStorage.setItem('id_token', authResult.access_token);
        localStorage.setItem('expires_at', expiresAt);
    } 

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token_jwt');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {

        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token_jwt');

        if (!accessToken) {
            throw new Error('Existe actualmente un token de seguridad asociado al perfil');
        }

        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

}