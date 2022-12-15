import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/environments/globals';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    private router: Router,
    public modalServices: ModalService,
    ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalServices.open = !this.modalServices.open;
  }

  async execute(){
    this.modalServices.open = !this.modalServices.open;
    setTimeout(() => {this.router.navigate([this.modalServices.modalContinue])}, GlobalVariable.lagToLoad)
  }

}
