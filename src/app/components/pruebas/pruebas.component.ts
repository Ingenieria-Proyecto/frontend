import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from 'src/app/interfaces/schedule';
import { CountryService } from 'src/app/services/country.service';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit{

  formReservation: FormGroup
  loading: boolean = false
  id: number
  //schedule = {} as Schedule
  listSchudule_service: Schedule[] = []
  listSchedule: string[] = []
  country: string[] = []
  total_national: number = 0
  total_foreing: number = 0
  price_national: number = 0
  price_foreing: number = 0
  value_national: number = 1000
  value_foreing: number = 10
  iva_national: number = 0
  iva_foreing: number = 0
  total: number = 0

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute,
    private _errorService: ErrorService, private _scheduleService: ScheduleService, private _countryService: CountryService) {
    this.formReservation = this.fb.group({
      fecha_reservacion: ['', Validators.required],
      horario: ['', Validators.required],
      email: ['',Validators.required],
      detalle: ['', Validators.required],
      cantidad_campos_nacional: [''],
      procedencia_nacional: [''],
      cantidad_campos_extranjero: [''],
      procedencia_extranjera: [''],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getListSchedule()
    this.getCountry()
    if (this.id !== 0) {
      //this.getSchedule(this.id)
      this.createSchedule()
    }
  }

  async createSchedule() {
    const objet = this.listSchudule_service.find(schedule => schedule.fk_parque === this.id)
    if (objet) {
      console.log(objet)
      let final_schedule: number = parseInt(objet.hora_salida.split(":")[0])
      let init_schedule: number = parseInt(objet.hora_entrada.split(":")[0])
      let count: number = init_schedule
      let result: boolean = false

      while (count !== final_schedule) {
        let dato = `${count}:00`

        if (count === 12) {
          this.listSchedule.push(dato+ " pm")
          result = true
          count = 0
        } else if(result){
          this.listSchedule.push(dato+ " pm")
        } else {
          this.listSchedule.push(dato+" am")
        }
        count++
      }
      console.log(this.listSchedule)
    } else {
      console.log("no se encontro")
    }

  }

  getCountry(){
    this._countryService.getListCountry().subscribe({
      next: (data:any) => {
        console.log('paises:',data[10].name.common)
        const response = data
        for(const country of response){
          this.country.push(country.name.common)
        }
      },
      error: (error) => {
      }
    })
  }
  getListSchedule() {
    this.loading = true
    this._scheduleService.getListSchedule().subscribe((data: Schedule[]) => {
      console.log(data)
      this.listSchudule_service = data
      this.loading = false
      this.createSchedule()
    })
  }

  getQuantityNational(){
    const value = this.formReservation.value.cantidad_campos_nacional
    value===null? this.value_national:this.value_national = value*1000
    this.iva_national = (this.value_national*0.13)
    this.price_national = this.iva_national+this.value_national
    this.total = parseFloat((this.price_national+(this.price_foreing*539.47)).toFixed(2))
  }
  getQuantityForeing(){
    const value:number = this.formReservation.value.cantidad_campos_extranjero
    value===null? this.value_foreing:this.value_foreing = value*10
    this.iva_foreing = parseFloat((this.value_foreing*0.13).toFixed(2))
    this.price_foreing = this.iva_foreing+this.value_foreing
    this.total =parseFloat(((this.price_foreing*539.47)+this.price_national).toFixed(2))
  }

  addReservation(){
    console.log("me llamaron: ",this.formReservation.value.fecha_reservacion)
    if(!this.formReservation.value.fecha_reservacion){
      alert('hola')
    }
    this.toastr.warning("Campo fecha falta por completar")
  }

}
