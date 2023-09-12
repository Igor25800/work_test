import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {PersonService} from "../../shared/services/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {arrayFramework, arrayFrameworkVersion} from "../../shared/until/info";
import {FrameworkVersionInterface} from "../../shared/interfaces/frameworkVersion.interface";
import {PersonInterface} from "../../shared/interfaces/person.interface";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  formPerson!: FormGroup;
  private destroyRef = inject(DestroyRef);
  arrayFramework: string[] = arrayFramework;
  arrayFrameworkVersion: FrameworkVersionInterface = arrayFrameworkVersion;
  person!: PersonInterface;

  constructor(
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._getFormPerson();
    this._disabledSelected();
  }

  addHobby(): void {
    const array = this.formPerson.get("hobby") as FormArray;
    array.push(this._hobby);
  }

  createPerson(person: PersonInterface): void {
    const dateOfBirth = this.datePipe.transform(person.dateOfBirth, 'dd-MM-yyyy') as string;
    this.person = {...person, dateOfBirth};
  }

  private get _hobby(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
    });
  }

  private _getFormPerson(): void {
    this.formPerson = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      framework: new FormControl('', Validators.required),
      frameworkVersion: new FormControl({value: '', disabled: true}, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email] , this._emailValidatorServer.bind(this)),
      hobby: new FormArray([this._hobby])
    })
  }

  private _emailValidatorServer(control: AbstractControl): Observable<ValidationErrors> {
    return this.personService.validatorEmail(control.value, this._snackBar) as Observable<ValidationErrors>
  }

  private _disabledSelected(): void{
    this.formPerson.get('framework')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((framework: string) => {
      const control = this.formPerson.get('frameworkVersion');
      framework ? control?.enable() : control?.disable()
    })
  }
}
