import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private formBuilder:FormBuilder,
              private router: Router,
              private authService: AuthService  
            ) { }
  myForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  });
  hide = true;

/*   email = new FormControl('', [Validators.required, Validators.email]);
 */
  getErrorMessage() {
    /** consultar error  username */
    if (this.myForm.get('username')?.hasError('required')) 
      return 'You must enter a value';
    if(this.myForm.get('username')?.hasError('unique'))
      return this.myForm.get('username')?.getError('message');
  }

  register() {
    console.log(this.myForm.value);
    const { username, password } = this.myForm.value;
    this.authService.registerUser(username, password).subscribe((res) => {
      console.log(res);
      if(res.statusCode == 400){
        this.myForm.get('username')?.setErrors({unique: true , message: res.message});
      }
      if(res.token){
        this.router.navigate(['/home']);
      }
      });
    //add errors handling
  }



  invalid(){
    return this.myForm.invalid;
  }
}
