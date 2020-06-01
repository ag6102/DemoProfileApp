import { Injectable } from "@angular/core";

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  public user: IProfile;

  constructor() {}

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          console.log("Passed");
          this.user = {
            firstName: "Michael",
            lastName: "Collins",
            username: "michael.collins",
            age: 30,
            email: "Michael.Collins@blueface.com",
          };
          resolve(this.user);
        } else {
          console.log("Failed");
          reject({ error: "Error!" });
        }
      }, Math.random() * 5000);
    });
  }

  setName(userObj: IProfile): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.firstName = userObj.firstName;
          this.user.lastName = userObj.lastName;
          resolve(this.user);
        } else {
          reject({ error: "Error!" });
        }
      }, Math.random() * 5000);
    });
  }

  setUserEmail(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user.email =
            this.user.firstName.replace(/\s/g, "") +
            "." +
            this.user.lastName.replace(/\s/g, "") +
            "@blueface.com";
          resolve(this.user);
        } else {
          reject({ error: "Error on email generation" });
        }
      }, Math.random() * 5000);
    });
  }
}
