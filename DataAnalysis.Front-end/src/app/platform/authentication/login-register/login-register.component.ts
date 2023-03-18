import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validator';
import { AuthenticationAction } from './models/authentication-actions.enum';
import * as fromAppStore from 'src/app/store/app-state.reducer';
import { select, Store } from '@ngrx/store';
import * as AuthActions from '../actions/authentication.actions';
import { combineLatest, debounceTime, filter } from 'rxjs';
import * as fromState from 'src/app/store/app-state.reducer';
import * as NavigationAction from 'src/app/store/navigation-state/navigation.actions';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent {
  credentialForm: FormGroup;
  registerMessage: string = `You do not have an account, start journey with us from`;
  loginMessage: string = `You already have an account, just log in from`;
  isRegisterFromSelected: boolean = false;

  constructor(
    private store: Store<fromAppStore.AppState>,
    private formBuilder: FormBuilder
  ) {
    this.credentialForm = this.formBuilder.group({
      authenticationAction: new FormControl(AuthenticationAction.Login),
      authenticationMessage: new FormControl(this.registerMessage),
      email: new FormControl('', [CustomValidators.email]),
      password: new FormControl('', [CustomValidators.minLength(4)]),
      confirmPassword: new FormControl('', [CustomValidators.minLength(4)]),
    });
    combineLatest([
      this.store.pipe(select(fromState.getRouterUrl)),
      this.store.pipe(select(fromState.selectRouteNestedParams)),
    ])
      .pipe(
        debounceTime(500),
        filter(
          ([url, params]) => url?.startsWith(`/authentication`) && !!params
        )
      )
      .subscribe(([, params]) => {
        const authAction: AuthenticationAction = params['auth-type'];
        switch (authAction) {
          case AuthenticationAction.Login:
          case AuthenticationAction.Register:
            this.isRegisterFromSelected =
              authAction === AuthenticationAction.Register;
            this.updateCredentialForm();
            break;
          default:
            console.log('change route');
            this.store.dispatch(
              NavigationAction.navigateTo({ route: '/authentication/login' })
            );
            break;
        }
      });
  }

  isValidateInputValue(inputName: string) {
    return (
      this.credentialForm.get(inputName).invalid &&
      (!this.credentialForm.get(inputName).pristine ||
        this.credentialForm.get(inputName).dirty)
    );
  }

  getInputValidationError(inputName: string) {
    return this.credentialForm.controls[inputName]?.errors['value'];
  }

  getInputValue(inputName: string) {
    return this.credentialForm.controls[inputName]?.value;
  }

  onSubmitChanges(form: FormGroup) {
    const credentials = {
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    };
    if (!this.isRegisterFromSelected) {
      this.store.dispatch(AuthActions.login(credentials));
    } else {
      this.store.dispatch(AuthActions.register(credentials));
    }
  }

  updateCredentialForm() {
    this.credentialForm.reset();
    this.credentialForm.patchValue({
      ...this.credentialForm,
      authenticationAction: !this.isRegisterFromSelected
        ? AuthenticationAction.Login
        : AuthenticationAction.Register,
      authenticationMessage: !this.isRegisterFromSelected
        ? this.registerMessage
        : this.loginMessage,
    });
  }

  onChangeAuthAction() {
    this.store.dispatch(
      NavigationAction.navigateTo({
        route: `/authentication/${
          !this.isRegisterFromSelected
            ? AuthenticationAction.Register
            : AuthenticationAction.Login
        }`,
      })
    );
  }
}
