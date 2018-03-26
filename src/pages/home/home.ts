import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { } from '../../providers/inventor/inventor';
import { Observable } from 'rxjs/Observable';
import { InventorProvider } from '../../providers/inventor';
import { Inventor } from '../../models/inventor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inventors: Observable<any>;

  constructor(
    public navCtrl: NavController,
     private provider: InventorProvider,
     private toast: ToastController) {
    this.inventors = this.provider.getAll();
  }

  newInventor() {
    this.navCtrl.push('InventorDetailPage');
  }

  editContact(inventor: any) {
    this.navCtrl.push('InventorDetailPage', { inventor: inventor });

  }

  removeContact(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }

}
