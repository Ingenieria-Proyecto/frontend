import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Park } from 'src/app/interfaces/park';
import { Rate } from 'src/app/interfaces/rate';
import { ErrorService } from 'src/app/services/error.service';
import { ParkService } from 'src/app/services/park.service';
import { RatesService } from 'src/app/services/rates.service';

@Component({
  selector: 'app-add-edit-rate',
  templateUrl: './add-edit-rate.component.html',
  styleUrls: ['./add-edit-rate.component.css']
})
export class AddEditRateComponent implements OnInit{

  formRate: FormGroup
  loading: boolean = false
  operacion: string = 'Agregar '
  id: number
  listParques: Park[] = []

  constructor(private fb: FormBuilder, private _rateService: RatesService,
    private router: Router, private toastr: ToastrService, private _errorService: ErrorService,
    private aRouter: ActivatedRoute, private _parkService: ParkService) {

      this.formRate = this.fb.group({
        fk_parque: ['', Validators.required],
        precio_nacional: ['', [Validators.required, Validators.min(0), Validators.max(60000), Validators.pattern(/^[0-9]+$/)]],
        precio_extranjero: ['', [Validators.required, Validators.min(0),  Validators.max(50), Validators.pattern(/^[0-9]+$/)]]
      });
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }


  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar '
      this.getRate(this.id)
    }
    this.getListParks()
  }

  getListParks() {
    const park = [{id: '', nombre: '', visitas: ''}]
    this.loading = true;
    this._parkService.getListParks().subscribe((data: Park[]) => {
      this.listParques = data;
      this.loading = false;
    });
  }

  getRate(id: number) {
    this.loading = true
    this._rateService.getRate(id).subscribe((data: Rate) => {
      console.log("getRate: ",data)
      this.loading = false
      this.formRate.setValue({
        fk_parque: data.fk_parque,
        precio_nacional: data.precio_nacional,
        precio_extranjero: data.precio_extranjero
      })
    })
  }

  addRate(){
    console.log(this.formRate.value.fk_parque)
    const rate: Rate = {
      fk_parque: this.formRate.value.fk_parque,
      precio_nacional: this.formRate.value.precio_nacional,
      precio_extranjero: this.formRate.value.precio_extranjero
    }

    if(rate.precio_nacional>0 && rate.precio_nacional<50000){
      this.toastr.warning("El precio no debe de superar los c50.000")
      return
    }
    if(rate.precio_extranjero>0 && rate.precio_extranjero<50){
      this.toastr.warning("El precio no debe de superar los $50")
      return
    }

    this.loading = true
    if(this.id !==0){
      //para editar
      rate.id = this.id
      this._rateService.updateRate(this.id,rate).subscribe({
        next: (data: any) => {
          this.loading = false
          this.toastr.success(data.msg, 'Exito')
          this.router.navigate(['/rates'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          this._errorService.msjError(e)
        }
      })
    }else{
      //agregar
      this._rateService.saveRate(rate).subscribe({
        next: (data: any) => {
          this.loading = false
          this.toastr.success(data.msg, 'Exito')
          this.router.navigate(['/rates'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          this._errorService.msjError(e)
        }
      })
    }

  }

}
