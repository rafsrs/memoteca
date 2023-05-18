import { PensamentoService } from './../pensamento.service';
import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css'],
})
export class CriarPensamentosComponent {

  formulario!: FormGroup ;

  constructor(
    private service: PensamentoService, private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      conteudo: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/(\s)*\S/)
      ])),
      autoria: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(/(\s)*\S/),
        Validators.minLength(3)
      ])),
      modelo: new FormControl("modelo1"),
      favorito: new FormControl(false)
    })
  }



  criarPensamento() {
    console.log(this.formulario.get('conteudo')?.errors)
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

}

