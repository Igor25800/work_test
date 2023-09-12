import {EmailInterface} from "./email.interface";

export interface PersonInterface {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    framework: string;
    frameworkVersion: string;
    email: string;
    hobby: Array<EmailInterface>;
}
