import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { KeycloakAuthGuard, KeycloakService } from "keycloak-angular";


@Injectable({
    providedIn : 'root'
})

export class  AuthGuard extends KeycloakAuthGuard {


    constructor(protected override router: Router, protected override keycloakAngular: KeycloakService) {
            super(router, keycloakAngular)
    }

    override isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        return new Promise((resolve, reject) => {

            let permission;
            if(!this.authenticated) {

                this.keycloakAngular.login({redirectUri: window.location.origin + state.url}).catch((e) => console.error(e));
                return reject(false);
                 
            }
            const requiredRoles: string[] = route.data["roles"];
            if(!requiredRoles || requiredRoles.length === 0) {
                    permission = true;
            }
            else {
                if(!this.roles || this.roles.length === 0) {
                    permission = false;
                }
                if(requiredRoles.every((role)  => this.roles.indexOf(role) >-1)) {
                        permission = true;
                }
                else { permission = false;
                }
            }
            if(!permission) {
                this.router.navigate(['/']);
            }
            resolve(permission)
        });
    }



    
}