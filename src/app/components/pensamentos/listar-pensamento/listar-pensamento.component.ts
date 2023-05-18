import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent {
  listaPensamentos: Pensamento[] = [];

  titulo: string = 'Meu Mural';

  filtro: string = '';
  favoritos: boolean = false
  listaAtualizaFavoritos: Pensamento[] = [];

  paginaAtual: number = 1;
  maisPensamentos: boolean = true;

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((lista) => {
      this.listaPensamentos = lista;
    });
  }

  carregarMaisPensamentos(): void {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        console.log(listaPensamentos)
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.maisPensamentos = false
        }
      })
  }

  pesquisarPensamentos(): void {

    this.maisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(lista => {
        this.listaPensamentos = lista
      })
  }

  listarFavoritos() {
    this.favoritos = !this.favoritos
    this.maisPensamentos = true;
    this.paginaAtual = 1;
    if (this.favoritos) {
      this.titulo = 'Meus Favoritos'
      this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
        .subscribe(pensamentosFav => {
          this.listaPensamentos = pensamentosFav
          this.listaAtualizaFavoritos = pensamentosFav
        })
    } else {
      this.service.listar(this.paginaAtual, this.filtro).subscribe(pensamentos => this.listaPensamentos = pensamentos)
      this.titulo = 'Meu Mural';
    }
  }
}


