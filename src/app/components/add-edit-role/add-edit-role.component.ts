import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/interfaces/role';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.css']
})
export class AddEditRoleComponent implements OnInit{

  formRole: FormGroup
  loading: boolean = false
  operacion: string = "Agregar"
  id: number

  constructor(private fb: FormBuilder, private _roleService: RoleService, private router: Router, private toastr: ToastrService,
    private _errorService: ErrorService, private aRouter: ActivatedRoute){
      this.formRole = fb.group({
        nombre_rol: ['', Validators.required]
      })
      this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    if(this.id!==0){
      this.operacion = "Editar"
      this.getRole(this.id)
    }
    
  }

  getRole(id: number){
    this.loading = true
    this._roleService.getRole(id).subscribe((data: Role) => {
      this.loading = false
      this.formRole.setValue({
        nombre_rol: data.nombre_rol
      })
    })
  }

  addRole(){
    const role: Role = {
      nombre_rol: this.formRole.value.nombre_rol
    }

    this.loading = true
    if(this.id !== 0){
      //editar
      role.id_rol = this.id
      this._roleService.updateRole(role).subscribe({
        next: (data: any) => {
          this.loading = false
          this.toastr.success(data.msg, 'Exito')
          this.router.navigate(['/listRole'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          this._errorService.msjError(e)
        }
      })
    } else {
      //agregar
      this._roleService.saveRole(role).subscribe({
        next: (data: any) => {
          this.loading = false
          this.toastr.success(data.msg, "Exito")
          this.router.navigate(['/listRole'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          this._errorService.msjError(e)
        }
      })
    }
  }

}
