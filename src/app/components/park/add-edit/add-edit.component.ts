import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private fb: FormBuilder,
    private _parkService: ParkService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.formProduct = this.fb.group({
      nombre_parque: ['', [Validators.required, Validators.maxLength(60)]],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getPark(this.id)
    }
  }

  getPark(id: number) {
    this.loading = true;
    this._parkService.getPark(id).subscribe((data: Park) => {
      this.loading = false;
      this.formProduct.setValue({
        nombre_parque: data.nombre_parque,
      });
    });
  }

  addProduct = () => {
    const park: Park = {
      nombre_parque: this.formProduct.value.nombre_parque,
    };
    this.loading = true
    if (this.id !== 0) {
      // es editar
      park.id = this.id
      this._parkService.updatePark(park).subscribe(() => {
        this.toastr.info(`El producto ${park.nombre_parque} fue actualizado con éxito`, 'Parque actualizado')
        this.loading = false
        this.router.navigate(['/listPark'])
      })

    } else {

      this._parkService.addPark(park).subscribe(() => {
        this.toastr.success(`El parque ${park.nombre_parque} fue registrado con exito`, 'Parque registrado')
        this.loading = false
        this.router.navigate(['/listPark'])
      })
    }


  };
}
