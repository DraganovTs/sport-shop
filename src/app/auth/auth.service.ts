import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserProfile } from '../shared/model/userProfile';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile} from 'keycloak-js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated = false;
  private userProfileSource = new ReplaySubject<UserProfile>(1);
  public userProfile$ = this.userProfileSource.asObservable();
  private _loggedIn = false;
  private profile: KeycloakProfile | undefined;

  constructor(private keycloakService: KeycloakService) {}

  public async login(redirectUrlSegment?: string): Promise<void> {
    let redirectUrl = window.location.origin + '/' + (redirectUrlSegment !== undefined ? redirectUrlSegment : '');
    console.log('Starting Keycloak login. Redirect Uri: ' + redirectUrl);
    await this.keycloakService.login({ redirectUri: redirectUrl });
    await this.loadUserProfile();
  }

  private async loadUserProfile() {
    const loggedIn = await this.keycloakService.isLoggedIn();
    if (loggedIn) {
      try {
        const profile = await this.keycloakService.loadUserProfile();
        console.log(profile);
        this._authenticated = true;
        this.profile = profile;
        this.userProfileSource.next(profile as UserProfile);
      } catch (error) {
        console.log(error);
        this._authenticated = false;
        this.profile = undefined;
      }
    } else {
      this._authenticated = false;
      this.profile = undefined;
    }
  }

  public async logout() {
    const redirectUrl = "http://localhost:4200/home";
    await this.keycloakService.logout(redirectUrl);
    console.log("logged out");
    this.keycloakService.clearToken();
    this._authenticated = false;
    this.profile = undefined;
    window.location.href = `http://localhost:9003/realms/oauth2-demo-realm/protocol/openid-connect/logout?redirect_uri=${redirectUrl}`;
  }

  private textHelperMethod(text: string | null | undefined): string {
    return !!text ? text : '';
  }

  public getUserName(): string {
    return this.textHelperMethod(this.profile?.username);
  }

  public getEmail(): string {
    return this.textHelperMethod(this.profile?.email);
  }

  public getFullName(): string {
    let firstName = this.textHelperMethod(this.profile?.firstName);
    return (!!firstName ? firstName + ' ' : '') + this.textHelperMethod(this.profile?.lastName);
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  private async isLoggedIn() {
    this._loggedIn = await this.keycloakService.isLoggedIn();
    console.log("LoggedIn?");
    console.log(this._loggedIn);
  }

  get loggedIn() {
    return this._loggedIn;
  }
}
