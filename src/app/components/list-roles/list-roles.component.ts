import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/interfaces/role';
import { ErrorService } from 'src/app/services/error.service';
import { RoleService } from 'src/app/services/role.service';
import {Subject} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})

export class ListRolesComponent implements OnInit{

  listRole: Role[] = []
  loading: boolean = false
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private _roleService: RoleService, private _serviceError: ErrorService,
    private toastr: ToastrService){
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language:{
        searchPlaceholder: 'Por nombre de roles',
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    }
    this.getListRoles()
  }

  getListRoles(){
    this.loading = true
    this._roleService.getListRoles().subscribe({
      next: (data) => {
        this.listRole = data
        this.loading = false
        this.dtTrigger.next(null)
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._serviceError.msjError(e)
      }
    })
  }

  deleteRole(id: number){
    this.loading = true
    this._roleService.deleteRole(id).subscribe({
      next: (data: any) => {
        this.loading = false
        this.toastr.warning(data.msg, "Rol eliminado")
        this.getListRoles()
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
          this._serviceError.msjError(e)
      },

    })
  }

}
