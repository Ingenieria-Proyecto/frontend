import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';


import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  formProduct: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';
  selectedFile: File | null = null;
  image: string | null = null;


  constructor(
    private fb: FormBuilder,
    private _parkService: ParkService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formProduct = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      visitas: ['', [Validators.required, Validators.max(10000), Validators.min(100)]]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getPark(this.id)
    }
  }


  handleClick() {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  guardarArchivo(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.selectedFile = file;
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }


  getPark(id: number) {
    this.loading = true;
    this._parkService.getPark(id).subscribe((data: Park) => {
      this.loading = false;
      this.formProduct.setValue({
        nombre: data.nombre,
        visitas: data.visitas
      });
    });
  }

  addProduct = () => {
    const park: Park = {
      nombre: this.formProduct.value.nombre,
      visitas: this.formProduct.value.visitas,
      nombre_Admin: ""+localStorage.getItem('user')
    };
    this.loading = true
    if (this.id !== 0) {
      console.log(park.visitas)
      park.id = this.id
      this._parkService.updatePark(park).subscribe(() => {
        this.toastr.info(`El producto ${park.nombre} fue actualizado con éxito`, 'Parque actualizado')
        this.loading = false
        this.router.navigate(['/listPark'])
      })

    } else {
      this._parkService.addPark(park).subscribe(() => {
        this.toastr.success(`El parque ${park.nombre} fue registrado con exito`, 'Parque registrado')
        this.loading = false
        this.router.navigate(['/listPark'])
      })
    }
}

}
