import { Component, OnInit } from '@angular/core';
import { MobileService } from './mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private mobileService: MobileService) { }


  mobiles: any = null;
  formHeader = "Add mobile";
  mobileName: string = "";
  price: string = "";
  ram: string = "";
  storage: string = "";
  showform = false;
  id: number = 0;


  ngOnInit(): void {
    this.getMobiles();
  }

  getMobiles() {
    this.mobileService.fetchMobiles().subscribe(
      (data) => {
        this.mobiles = data
      },
      (error) => {
        console.log("error");
      }
    )
  }

  deleteMobile(id: number) {
    this.mobileService.deleteMobile(id).subscribe(
      (data) => {
        this.getMobiles();
      },
      (error) => {
        console.log("error");
      }
    )
  }

  openForm(data: any = null) {
    this.showform = true;
    // console.log(data)
    if (data) {
      this.mobileName = data["mobile"];
      this.price = data["price"];
      this.ram = data["ram"];
      this.storage = data["storage"];
      this.id = data["id"];
      this.formHeader = "Edit mobile";

    } else {
      this.id = 0;
      this.formHeader = "Add mobile";
      this.clearForm();
    }
  }

  closeForm() {
    this.showform = false;
    this.clearForm();
  }

  clearForm() {
    this.mobileName = "";
    this.price = "";
    this.ram = "";
    this.storage = "";
  }

  saveMobile() {
    this.showform = false;
    let body = {
      id: this.id,
      mobile: this.mobileName,
      price: this.price,
      ram: this.ram,
      storage: this.storage
    }
    console.log(body)
    if (this.id) {
      // console.log(this.id)
      body["id"] = this.id;
      this.mobileService.putMobile(body,this.id).subscribe(
        (data) => {
          console.log(data)
          this.getMobiles();
        },
        (error) => {
          console.log("error");
        }
      )
    } else {
      this.mobileService.postMobile(body).subscribe(
        (data) => {
          this.getMobiles();
        },
        (error) => {
          console.log("error");
        }
      )
    }}
  }
