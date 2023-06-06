import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from 'src/app/interfaces/schedule';
import { CountryService } from 'src/app/services/country.service';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})

export class BuyTicketComponent implements OnInit {

  formReservation: FormGroup
  loading: boolean = false
  id: number
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
  selectedForeing: boolean = false;
  selectedNational: boolean = true
  listFrom: string[] = ['Nacional','Extranjero']

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute,
    private _errorService: ErrorService, private _scheduleService: ScheduleService, private _countryService: CountryService) {
    this.formReservation = this.fb.group({
      fecha_reservacion: ['', Validators.required],
      horario: ['', Validators.required],
      email: ['',Validators.required],
      detalle: ['', Validators.required],
      cantidad_campos_nacional: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      procedencia_nacional: ['',Validators.required],
      cantidad_campos_extranjero: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      procedencia_extranjera: ['',Validators.required],
      selectedForeing:[''],
      selectedNational: [true, ],
      selectFrom: ['Nacional']
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
  getListSchedule() {
    this.loading = true
    this._scheduleService.getListSchedule().subscribe((data: Schedule[]) => {
      console.log(data)
      this.listSchudule_service = data
      this.loading = false
      this.createSchedule()
    })
  }

  onCheckboxChangeForeing(event: any) {
    this.formReservation.patchValue({
      cantidad_campos_nacional: 0
    })
    this.price_national = 0
    this.iva_national = 0
    this.total = 0

    this.selectedForeing = event.target.checked
    console.log('estado del checkbox: ',this.selectedForeing)
    const cantidadCamposExtranjeroControl = this.formReservation.get('cantidad_campos_extranjero')
    const selectProcedencia = this.formReservation.get('procedencia_extranjera')
    if(cantidadCamposExtranjeroControl){
      if (this.selectedForeing===true) {
        this.formReservation.patchValue({
          selectedNational: false
        })
        this.selectedNational = false
        cantidadCamposExtranjeroControl.enable()
        selectProcedencia?.enable()
      } else if(this.selectedForeing===false) {
        this.selectedNational = true
        this.formReservation.patchValue({
          selectedNational: true
        })
        cantidadCamposExtranjeroControl.disable()
        selectProcedencia?.disable()
      }
    }
  }

  onCheckboxChangeNational(event: any) {

    this.formReservation.patchValue({
      cantidad_campos_extranjero: 0
    })
    this.price_foreing = 0
    this.iva_foreing = 0
    this.total = 0

    this.selectedNational = event.target.checked
    console.log('estado del checkbox: ',this.selectedNational)
    const quantityFieldsNational = this.formReservation.get('cantidad_campos_nacional')
    const selectProcedencia = this.formReservation.get('procedencia_nacional')
    if(quantityFieldsNational){
      if (this.selectedNational===true) {
        this.formReservation.patchValue({
          selectedForeing: false
        })
        this.selectedForeing = false
        quantityFieldsNational.enable();
        selectProcedencia?.enable()
       
      } else if(this.selectedNational===false) {
        this.formReservation.patchValue({
          selectedForeing: true
        })
        this.selectedForeing = true
        quantityFieldsNational.disable();
        selectProcedencia?.disable()
      }
    }
  }

  changeSelect(){

    const selectFromValue = this.formReservation.value.selectFrom
    console.log('list', this.listFrom)
    if(selectFromValue){
      if(selectFromValue==='Nacional'){
        this.selectedNational = true
        if (this.selectedNational===true) {

          this.formReservation.patchValue({
            cantidad_campos_extranjero: 0
          })
          this.price_foreing = 0
          this.iva_foreing = 0
          this.total = 0

          this.formReservation.patchValue({
            selectedForeing: false
          })
          this.selectedForeing = false
         
        } else if(this.selectedNational===false) {
          this.formReservation.patchValue({
            selectedForeing: true
          })
          this.selectedForeing = true
        }
      }else{

        this.formReservation.patchValue({
          cantidad_campos_nacional: 0
        })
        this.price_national = 0
        this.iva_national = 0
        this.total = 0
        
        this.selectedForeing = true
        if (this.selectedForeing===true) {
          this.formReservation.patchValue({
            selectedNational: false
          })
          this.selectedNational = false
        } else if(this.selectedForeing===false) {
          this.selectedNational = true
          this.formReservation.patchValue({
            selectedNational: true
          })

        }
      }
    }
  }


}
