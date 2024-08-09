import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlertType } from '../../models/alert-type';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input()
  type!: AlertType;
  @Input()
  message!: string;

  showSuccess: boolean = false;
  showDanger: boolean = false;
  showInfo: boolean = false;

  constructor() { }

  ngOnInit(): void {
    switch(this.type) {
      case AlertType.SUCCESS:
        this.message = 'Cadastro com sucesso';
        this.showAlertSuccess();
        break;
      case AlertType.DANGER:
        this.message = 'Erro ao cadastrar';
        this.showAlertDanger();
        break;
      case AlertType.INFO:
        this.message = 'Informação';
        this.showAlertInfo();
        break;
      default:
        this.showSuccess = false;
        this.showDanger = false;
        this.showInfo = false;
        break;
    }
  }

  showAlertSuccess() {
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }

  showAlertDanger() {
    this.showDanger = true;
    setTimeout(() => {
      this.showDanger = false;
    }, 3000);
  }

  showAlertInfo() {
    this.showInfo = true;
    setTimeout(() => {
      this.showInfo = false;
    }, 3000);
  }

  hideAlertSuccess() {
    this.showSuccess = false;
  }

  hideAlertDanger() {
    this.showDanger = false;
  }
  
  hideAlertInfo() {
    this.showInfo = false;
  }
}
