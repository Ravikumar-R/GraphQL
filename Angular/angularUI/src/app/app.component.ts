import { Component } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [""]
})
export class AppComponent {
  constructor(private apollo: Apollo) {}
  title = "Angular UI";
  detailsInJSON: any;
  data: any;
  getEmployeeDetails() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            user {
              name
              age
              address {
                country
                city
                pin
              }
              organization {
                name
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.detailsInJSON = this.data.user;
      });
  }

  getEmployeeDetailsWithoutAddress() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            user {
              name
              age
              organization {
                name
              }
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.detailsInJSON = this.data.user;
      });
  }

  getOrganization() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            organization {
              name
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.detailsInJSON = this.data.organization;
      });
  }
}
