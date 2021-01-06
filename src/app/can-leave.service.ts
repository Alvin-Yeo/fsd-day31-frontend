import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";

export interface canLeaveRoute {
    canLeave(): Boolean | Promise<Boolean>;
}

@Injectable()
export class CanLeaveService implements CanDeactivate<canLeaveRoute> {

    canDeactivate(comp: canLeaveRoute, currRoute: ActivatedRouteSnapshot, 
        currState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
            if(!comp.canLeave()) 
                return confirm('Are you sure you want to leave this page?');
            
            return true;
    }
    
}