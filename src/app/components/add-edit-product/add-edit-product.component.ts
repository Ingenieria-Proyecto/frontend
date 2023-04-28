import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  formProduct: FormGroup
  loading: boolean = false
  id: number
  operacion: string = 'Agregar '

  constructor(private fb: FormBuilder, private _productService: ProductService,
    private router: Router, private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.formProduct = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'))
  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar '
      this.getProduct(this.id)
    }
  }

  getProduct(id: number) {
    this.loading = true
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false
      this.formProduct.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

  addProduct = () => {
    console.log(this.formProduct.value.name)
    const product: Product = {
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      price: this.formProduct.value.price,
      stock: this.formProduct.value.stock
    }

    this.loading = true
    if (this.id !== 0) {
      // es editar
      product.id = this.id
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fue actualizado con éxito`, 'Producto actualizado')
        this.loading = false
        this.router.navigate(['/'])
      })

    } else {

      this._productService.saveProduct(product).subscribe(() => {
        console.log('producto agregado')

        this.toastr.success(`El producto ${product.name} fue registrado con exito`, 'Producto registrado')
        this.loading = false
        this.router.navigate(['/'])
      })
    }

  }

}
