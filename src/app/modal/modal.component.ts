import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    shootModal = false;
  constructor(private _dataService : DataService){

  }

  ngOnInit(){
    this.shootModal = this._dataService.shootModal;
  }
}
