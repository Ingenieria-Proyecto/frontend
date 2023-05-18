import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rate } from 'src/app/interfaces/rate';
import { ErrorService } from 'src/app/services/error.service';
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
  listParques: any[] = [{
    id: 1,
    name: 'Manuel Antonio'
  },
  {
    id: 2,
    name: 'Volcán Irazú'
  },
  {
    id: 3,
    name: 'Volcán Poás'
  },
  {
    id: 4,
    name: 'Volcán San José'
  },
  {
    id: 5,
    name: 'Volcán San Luis'
  },
  {
    id: 6,
    name: 'Volcán San Fernando'
  }
]
  constructor(private fb: FormBuilder, private _rateService: RatesService,
    private router: Router, private toastr: ToastrService, private _errorService: ErrorService,
    private aRouter: ActivatedRoute) {

    this.formRate = this.fb.group({
      fk_parque: ['', Validators.required],
      precio_nacional: ['', Validators.required],
      precio_extranjero: ['', Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }

  
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar '
      this.getRate(this.id)
    }
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
