import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EmailVerificationService } from '../services/email-verification.service';
import { map, catchError, of } from 'rxjs';

export const emailVerifiedGuard: CanActivateFn = (route, state) => {
  const emailVerificationService = inject(EmailVerificationService);
  const router = inject(Router);

  return emailVerificationService.getUserVerificationStatus().pipe(
    map(response => {
      if (response.emailVerified) {
        return true; // Email verificado, permite acesso
      } else {
        // Email não verificado, redireciona para a página de perfil com um parâmetro
        router.navigate(['/perfil'], { queryParams: { emailVerification: 'required' } });
        return false;
      }
    }),
    catchError(() => {
      // Em caso de erro, redirecionar para perfil
      router.navigate(['/perfil']);
      return of(false);
    })
  );
}; 