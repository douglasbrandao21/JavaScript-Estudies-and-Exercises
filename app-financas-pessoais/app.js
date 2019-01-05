class Despesa {

    constructor(ano, mes, dia, tipo, descricao, valor) {
        this._ano = ano
        this._mes = mes
        this._dia = dia
        this._tipo = tipo
        this._descricao = descricao
        this._valor = valor
    }

    get Ano() {
        return this._ano
    }

    get Mes() {
        return this._mes
    }

    get Dia() {
        return this._dia
    }

    get Tipo() {
        return this._tipo
    }

    get Descricao() {
        return this._descricao
    }

    get Valor() {
        return this._valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }

}

class DataBase {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id',0)
        }

    }

    getNextId() {
        let nextId = localStorage.getItem('id')
        return parseInt(nextId)+1
    }

    Storage (despesa) {
        let id = this.getNextId()

        localStorage.setItem(id, JSON.stringify(despesa))
        
        localStorage.setItem('id', id)
    }

    getRegistros() {
        
        let id = localStorage.getItem('id')
        let listaDespesas = Array()

        for(let i = 1; i<=id; i++) {

            let despesa = localStorage.getItem(i)

            if(despesa != null) {
                despesa = JSON.parse(despesa)
                despesa.id = i
                listaDespesas.push(despesa)
            }

        }
        return listaDespesas
    }

    getDespesa(despesa) {
        
        let AllDespesas = this.getRegistros()
        
        //Filtering the attrributes

        if(despesa._ano != '') {
            AllDespesas = AllDespesas.filter(function(index) {
                return index._ano == despesa._ano
            })
        } 
        if(despesa._mes != '') {
            AllDespesas = AllDespesas.filter(function(index) {
                return index._mes == despesa._mes
            })
        }

        if(despesa._dia != '') {
            AllDespesas = AllDespesas.filter(function(index) {
                return index._dia == despesa._dia
            })
        }

        if(despesa._tipo != '') {
            AllDespesas = AllDespesas.filter(function(index) {
                return index._tipo == despesa._tipo
            })
        }

        if(despesa._descricao != '') {
            AllDespesas = AllDespesas.filter(function(index) {  
                return index._descricao == despesa._descricao
            })
        }

        if(despesa._valor != '') {
            AllDespesas = AllDespesas.filter(function(index) {
                return index._valor == despesa._valor
            })
        }

        return AllDespesas
    }

    removeDespesa(id) {
        localStorage.removeItem(id)
    }
}

let database = new DataBase()

function cadastrarDespesa() {

    var ano = $('#ano').val()
    var mes = $('#mes').val()
    var dia = $('#dia').val()
    var tipo = $('#tipo').val()
    var descricao = $('#descricao').val()
    var valor = $('#valor').val()

    var despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    var msg = ""
    var modalTitle = ""
    var titleClass = ""
    var btnClass = ""
    var textBtn = ""

    if(despesa.validarDados()) {
        database.Storage(despesa)
        msg = "A despesa foi cadastrada com sucesso"
        modalTitle = "Cadastro efetuado com sucesso"
        titleClass = "text-success"
        btnClass = 'btn-success'
        textBtn = 'Voltar'
    }
    else {
        msg = 'Opa, algo deu errado. Tente novamente!'
        modalTitle = 'Erro'
        titleClass = 'text-danger'
        btnClass = 'btn-danger'
        textBtn = 'Corrigir'
    }

    $('body').append(`
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header ${titleClass}">
            <h5 class="modal-title" id="exampleModalLabel">${modalTitle}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${msg}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn ${btnClass}" data-dismiss="modal">${textBtn}</button>
          </div>
        </div>
      </div>
    </div>`)

    $('#modal').modal('show')

    document.getElementById('dia').value = ''
    document.getElementById('mes').value = ''
    document.getElementById('ano').value = ''
    document.getElementById('tipo').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('valor').value = ''

}

function printDespesas(despesas = Array()) {

    if(despesas.length == 0) {
        despesas = database.getRegistros()
    }
    
    var tableDespesas = document.getElementById('tableDespesas')
    tableDespesas.innerHTML = ''

    despesas.forEach(function(i) {
        let data = `${i._dia}/${i._mes}/${i._ano}`

         let linha = tableDespesas.insertRow()

        linha.insertCell(0).innerHTML = data

        switch(i._tipo){
            case '1':
                i._tipo = 'Alimentação'
                break
            case '2':
                i._tipo = 'Educação'
                break
            case '3':
                i._tipo = 'Lazer'
                break
            case '4':
                i._tipo = 'Saúde'
                break
            case '5':
                i._tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = i._tipo
        linha.insertCell(2).innerHTML = i._descricao
        linha.insertCell(3).innerHTML = `R$ ${i._valor}`

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = i.id
        btn.onclick = function() {
            database.removeDespesa(this.id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
} 

function pesquisarDespesa() {
    
    let dia = $('#dia').val()
    let mes = $('#mes').val()
    let ano = $('#ano').val()
    let tipo = $('#tipo').val()
    let descricao = $('#descricao').val()
    let valor = $('#valor').val()

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let resultDespesas = database.getDespesa(despesa)
    
    printDespesas(resultDespesas)

    
}