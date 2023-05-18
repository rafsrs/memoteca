import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = new FormGroup({
        id: new FormControl(pensamento.id),
        conteudo: new FormControl(
          pensamento.conteudo,
          Validators.compose([
          Validators.required,
          Validators.pattern(/(\s)*\S/)
        ])),
        autoria: new FormControl(
          pensamento.autoria,
          Validators.compose([
          Validators.required,
          Validators.pattern(/(\s)*\S/),
          Validators.minLength(3)
        ])),
        modelo: new FormControl(pensamento.modelo),
        favorito: new FormControl(pensamento.favorito)
      })
    });


  }

  editarPensamento() {
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
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
