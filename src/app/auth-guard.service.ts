import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

export const canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isInReserveMode().then((reserving) => {
    if(reserving){
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  });
}
