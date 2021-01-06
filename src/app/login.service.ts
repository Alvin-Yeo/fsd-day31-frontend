import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class LoginService implements CanActivate {

    private token = '';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    login(username: string, password: string): Promise<boolean> {
        return this.http.post('http://127.0.0.1:3000/login', { username, password }, { observe: 'response' })
            .toPromise()
            .then((resp) => {
                if(resp.status == 200) {
                    this.token = resp['body']['token'];
                }
                console.info('[RESP]: ', resp);
                return true;
            })
            .catch((error) => {
                if(error.status === 401) {
                    // do something
                    console.info('Status Code 401.');
                }
                console.error('[ERROR]: ', error)
                return false;
            });
    }

    isLogin() {
        return this.token != '';
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.isLogin())
            return true;

        return this.router.parseUrl('/login');
    }
}