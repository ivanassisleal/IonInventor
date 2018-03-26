import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventorProvider } from '../../providers/inventor';

@IonicPage()
@Component({
  selector: 'page-inventor-detail',
  templateUrl: 'inventor-detail.html',
})
export class InventorDetailPage {

  title: string;
  form: FormGroup;
  inventor: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: InventorProvider,
    private toast: ToastController) {

      this.inventor = this.navParams.data.inventor || { };
      this.createForm();
      console.log( this.inventor);

  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.inventor.key],
      firstName: [this.inventor.firstName, Validators.required],
      lastName: [this.inventor.lastName, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Inventor saved with success.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Error save the inventor.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
