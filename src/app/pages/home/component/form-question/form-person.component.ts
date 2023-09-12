import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent {
  @Input() formPerson!: FormGroup;
  @Input() arrayFramework!: string[];
  @Input() arrayFrameworkVersion!: any;
  @Output() eventAddHobby = new EventEmitter();
  @Output() eventCreatePerson = new EventEmitter();

  addHobby(): void {
    this.eventAddHobby.emit();
  }

  createPerson(): void {
    this.eventCreatePerson.emit(this.formPerson.value);
  }

  get hobbyArray(): FormArray {
    return this.formPerson.get("hobby") as FormArray;
  }

  get framework() {
    return this.formPerson.getRawValue().framework
  }
}
