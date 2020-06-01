import { Component, OnInit } from "@angular/core";

import {
  IProfile,
  ProfileService,
} from "../../profile-service/profile.service";

@Component({
  selector: "app-profile-settings",
  templateUrl: "./profile-settings.component.html",
  styleUrls: ["./profile-settings.component.sass"],
})
export class ProfileSettingsComponent implements OnInit {
  userData: IProfile;
  isUpdating: boolean;
  errorMsg: string = "";

  constructor(private profile: ProfileService) {}

  ngOnInit(): void {
    this.fetchUserInfo();
    // this.retry(this.profile.getProfileUser)
    //   .then((data) => {
    //     this.userData = data;
    //     console.trace();
    //     console.log("success");
    //   })
    //   .catch((err) => {
    //     console.trace();
    //     console.error("error");
    //   });
  }

  fetchUserInfo(): void {
    this.profile.getProfileUser().then(
      (val) => {
        this.userData = JSON.parse(JSON.stringify(val));
      },
      (err) => {
        this.fetchUserInfo();
      }
    );
  }

  updateUserInfo(): any {
    this.isUpdating = true;
    this.errorMsg = "";
    this.profile
      .setName(this.userData)
      .then(
        (val) => {
          this.userData = JSON.parse(JSON.stringify(val));
          this.errorMsg = "";
          return this.profile.setUserEmail().then(
            (res) => {
              this.userData = JSON.parse(JSON.stringify(res));
              this.errorMsg = "";
            },
            (err) => {
              this.errorMsg = err.error;
            }
          );
        },
        (err) => {
          this.errorMsg = err.error;
        }
      )
      .finally(() => {
        this.isUpdating = false;
      });
  }

  retry(fn, promise = null, promiseObject = null) {
    promiseObject = promiseObject || {
      resolve: null,
      reject: null,
    };

    promise =
      promise ||
      new Promise((resolve, reject) => {
        promiseObject.resolve = resolve;
        promiseObject.reject = reject;
      });

    fn()
      .then((result) => {
        promiseObject.resolve(result);
      })
      .catch((err) => {
        this.retry(fn, promise, promiseObject);
      });

    return promise;
  }

  inputChanged(): void {
    this.errorMsg = "";
  }
}
