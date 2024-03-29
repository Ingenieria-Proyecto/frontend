import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/interfaces/reservation';
import { Schedule } from 'src/app/interfaces/schedule';
import { CountryService } from 'src/app/services/country.service';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { format } from 'date-fns';
import { ReservationService } from 'src/app/services/reservation.service';
import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';
import { RatesService } from 'src/app/services/rates.service';
import { Rate } from 'src/app/interfaces/rate';


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
  listFrom: string[] = ['Nacional', 'Extranjero']
  listProvince: string[] = ['San José', 'Heredia', 'Alajuela', 'Cartago', 'Puntarenas', 'Guanacaste', 'Limón']
  fields: string = ""
  name_park: string = ""
  minDate: string;
  subTotalNational: number = 0
  subTotalForeing: number = 0
  listMount: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  listYear: string[] = ['2023', '2024', '2025', '2026', '2027', '2028']
  conditionPay: boolean = false
  titleButton: string = "Aceptar"
  conditionForm: boolean = true

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute, private _parkService: ParkService,
    private _errorService: ErrorService, private _scheduleService: ScheduleService, private _countryService: CountryService, private _reservationService: ReservationService, private _rateServuce: RatesService) {
    this.formReservation = this.fb.group({
      fecha_reservacion: ['', Validators.required],
      horario: ['', Validators.required],
      email: ['', Validators.required],
      detalle: ['', Validators.required],
      cantidad_campos_nacional: ['0', [Validators.required, Validators.min(1), Validators.max(10)]],
      procedencia_nacional: ['', Validators.required],
      cantidad_campos_extranjero: ['0', [Validators.required, Validators.min(1), Validators.max(9)]],
      procedencia_extranjera: ['', Validators.required],
      selectedForeing: [''],
      selectedNational: [true,],
      selectFrom: ['Nacional'],
      numberPay: ['', Validators.required],
      titular: ['', Validators.required],
      mount: ['', Validators.required],
      year: ['', Validators.required],
      ccv: ['', Validators.required]
    })
    const today = new Date();
    this.minDate = this.formatDate(today);
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    this.getListSchedule()
    this.getCountry()
    this.getFields()
    this.getNamePark()
    this.getRate()
    if (this.id !== 0) {
      //this.getSchedule(this.id)
      this.createSchedule()
    }
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getRate() {
    this._rateServuce.getRate(this.id).subscribe({
      next: (data: Rate) => {
        console.log('rate: ', data)
        this.value_national = data.precio_nacional
        this.value_foreing = data.precio_extranjero
      },
      error: (error: any) => {
      }
    })
  }
  getNamePark() {
    this._parkService.getPark(this.id).subscribe({
      next: (data: Park) => {
        this.name_park = data.nombre
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error)
      }
    })
  }

  getFields() {
    const fecha = new Date()
    const formatoDeseado = 'yyyy-MM-dd';
    const fechaFormateada = format(fecha, formatoDeseado)

    const date = {
      date_actual: fechaFormateada,
      id: this.id
    }
    console.log('fecha: ', date)
    this._reservationService.getFieldsEMpty(date).subscribe({
      next: (data: any) => {
        console.log(data.disponible)
        this.fields = data.disponible
      },
      error: (error: HttpErrorResponse) => {
        this._errorService.msjError(error)
      }
    })
  }

  getCountry() {
    this._countryService.getListCountry().subscribe({
      next: (data: any) => {
        console.log('paises:', data[10].name.common)
        const response = data
        for (const country of response) {
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
          this.listSchedule.push(dato + " pm")
          result = true
          count = 0
        } else if (result) {
          this.listSchedule.push(dato + " pm")
        } else {
          this.listSchedule.push(dato + " am")
        }
        count++
      }
      console.log(this.listSchedule)
    } else {
      console.log("no se encontro")
    }

  }

  getQuantityNational() {
    const value = this.formReservation.value.cantidad_campos_nacional || this.value_national
    this.subTotalNational = value * this.value_national
    this.iva_national = (this.subTotalNational * 0.13)
    this.price_national = this.iva_national + this.subTotalNational
    this.total = parseFloat((this.price_national + (this.price_foreing * 539.47)).toFixed(2))
  }
  getQuantityForeing() {
    const value: number = this.formReservation.value.cantidad_campos_extranjero || this.value_foreing
    this.subTotalForeing = value * this.value_foreing
    this.iva_foreing = parseFloat((this.subTotalForeing * 0.13).toFixed(2))
    this.price_foreing = this.iva_foreing + this.subTotalForeing
    this.total = parseFloat(((this.price_foreing * 539.47) + this.price_national).toFixed(2))
  }

  addReservation() {
    if (!this.formReservation.value.fecha_reservacion || !this.formReservation.value.email || !this.formReservation.value.horario) {
      alert('los campos no deben estar vacios')
      this.toastr.warning('los campos no deben estar vacios')
      return
    }
    const quantityFields: number = this.formReservation.value.cantidad_campos_nacional > 0 ? this.formReservation.value.cantidad_campos_nacional : this.formReservation.value.cantidad_campos_extranjero
    const nationality: string = this.formReservation.value.selectFrom
    const origin: string = this.formReservation.value.selectFrom === 'Nacional' ? this.formReservation.value.procedencia_nacional : this.formReservation.value.procedencia_extranjera
    const fecha = new Date();
    const formatoDeseado = 'yyyy-MM-dd HH:mm:ss';
    const fechaFormateada = format(fecha, formatoDeseado);

    if (quantityFields > 10 || quantityFields < 1) {
      alert('la cantidad de campos debe estar entre 0 y 10')
      this.toastr.warning('la cantidad de campos debe estar entre 0 y 10')
      this.formReservation.value.cantidad_campos_extranjero = 1
      this.formReservation.value.cantidad_campos_nacional = 1

      return
    }
    if (!origin) {
      alert("No selecciono procedencia")
      this.toastr.warning('Debe seleccionar la procedencia')
      return
    }



    const reservation: Reservation = {
      id_parque: this.id,
      horario: this.formReservation.value.horario,
      cantidad_campos: quantityFields,
      fecha_reservacion: fechaFormateada,
      total: this.total,
      email: this.formReservation.value.email,
      moneda: 'Colón',
      procedencia: origin,
      nacionalidad: nationality,
      nombre_reservacion: this.formReservation.value.detalle
    }

    if (this.titleButton === 'Aceptar') {
      const fieldsTotal: number = parseInt(this.fields) - reservation.cantidad_campos
      console.log('total campos', fieldsTotal)
      if (fieldsTotal <= 0) {
        this.toastr.warning("La cantidad de campos se excede")
        return
      } else {
        this.conditionPay = true
        this.titleButton = 'Reservar'
        this.conditionForm = false
        return
      }
    }

    if (this.titleButton === 'Reservar') {
      if (this.formReservation.value.numberPay < 10000000000000) {
        this.toastr.warning('El número de tarjeta debe ser de 16 dígitos')
        return
      }
      if (!this.formReservation.value.numberPay || !this.formReservation.value.titular || !this.formReservation.value.mount || !this.formReservation.value.year
        || !this.formReservation.value.ccv) {
        this.toastr.warning('Falta campos por llenar de la tarjeta')
        return
      }
      if (this.formReservation.value.ccv < 100) {
        this.toastr.warning('El número CCV debe de tener 3 dígitos')
        return
      }

      this._reservationService.saveReservation(reservation).subscribe({
        next: (data: any) => {
          console.log('realizando reserva: ', data)
          this.toastr.success(data.msg)
          this.router.navigate(['/indexTicket'])
        },
        error: (error: HttpErrorResponse) => {
          this._errorService.msjError(error)
        }
      })
    }



    console.log('Reservacion: ', reservation)

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

  changeSelect() {

    const selectFromValue = this.formReservation.value.selectFrom
    console.log('list', this.listFrom)
    if (selectFromValue) {
      if (selectFromValue === 'Nacional') {
        this.selectedNational = true
        if (this.selectedNational === true) {

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

        } else if (this.selectedNational === false) {
          this.formReservation.patchValue({
            selectedForeing: true
          })
          this.selectedForeing = true
        }
      } else {

        this.formReservation.patchValue({
          cantidad_campos_nacional: 0
        })
        this.price_national = 0
        this.iva_national = 0
        this.total = 0

        this.selectedForeing = true
        if (this.selectedForeing === true) {
          this.formReservation.patchValue({
            selectedNational: false
          })
          this.selectedNational = false
        } else if (this.selectedForeing === false) {
          this.selectedNational = true
          this.formReservation.patchValue({
            selectedNational: true
          })

        }
      }
    }
  }


}
