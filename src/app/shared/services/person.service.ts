import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, map, Observable, tap} from "rxjs";
import {EmailInterface} from "../interfaces/email.interface";
import {ValidationErrors} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  getPerson(): Observable<EmailInterface[]> {
    return this.http.get<EmailInterface[]>('assets/person.json')
  }

  validatorEmail(email: string, snackBar: MatSnackBar): Observable<ValidationErrors| null> {
    return this.getPerson().pipe(
      delay(2000),
      map((personEmail: EmailInterface[]) =>
        personEmail.filter((item: EmailInterface) => item.email.toLowerCase().trim() === email.toLowerCase().trim() )
      ),
      map((email: EmailInterface[]) =>  {
        if(email.length) {
          snackBar.open(email[0].email, 'Існує', {duration: 5000})
          return <ValidationErrors> {isEmail: true}
        }
        return null;
      }),
    )
  }
}
