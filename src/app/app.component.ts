import { Component } from '@angular/core';
import { ListService } from "app/service/list.service";
import { DropDownService } from "app/service/drop-down.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ListService]
})
export class AppComponent {
  title: string;
  name: string;
  lastName: string;
  userDetail = {};
  arrayList: any[] = [];
  genderArray: any[] = [];
  nameInChar: boolean = true;
  lastNameInChar: boolean = true;

  constructor(private _listService: ListService, private _dropDownService: DropDownService, public fb: FormBuilder) { }
 
  registerForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
    genderType: ['', Validators.required]
  })

  ngOnInit() {
    this.userDetail = {
      name: '',
      lastName: '',
      age: '',
      genderType: ''
    }
    this.genderArray = this._dropDownService.getDropDown();
  }

checkChar(data) {
    var regex = /^[a-zA-Z ]*$/;
    if(data.name === "name") {
      this.nameInChar = regex.test(data.value);
    } else {
      this.lastNameInChar = regex.test(data.value);
    }
  }
  submit(values, isValid) {
    if (!isValid) {
      return;
    }
    console.log(values);
    let model = {
      name: values.name,
      lastName: values.lastName,
      age: values.age,
      gender: values.gender
    }
    this._listService.addList(model);
    this.arrayList = this._listService.getList();
  }
}
