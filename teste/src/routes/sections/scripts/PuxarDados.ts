import axios from "axios"
import { number } from "echarts"
import { element } from "svelte/internal"
import { MUNICIPIOS } from "./CONSTANTS/MUNICIPIOS"







async function numeroDadosMuni(lugar : string){
    //concidera que recebe ou um municipio ou uma mesoregiao
    //locais/agentes coletivos/agentes individuais
    const final: number[] = []
        const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMunicipio' : 'EQ('+lugar+')',
        '_type' : 'EQ(1)'
        }})

        const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMunicipio' : 'EQ('+lugar+')',
        '_type' : 'EQ(2)'
        }})

        const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
        '@select' : 'id',
        'geoMunicipio' : 'EQ('+lugar+')',
        }})
        
    
    const dataTotal = await Promise.all([p1,p2,p3])
    dataTotal.forEach(data => {
        final.push(data?.data.length)
    });

    return final
}

async function interessesMuni(municipio:string, tipo : string) {
    const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/'+tipo+'/find', {params:{
        '@select' : 'terms',
        'geoMunicipio' : 'EQ('+municipio+')'
    }})
    let dados = await p1
    let mapaInteresses = new Map <String,number>() 
    dados.data.forEach((dado: any) =>{
        let atual = dado.terms.area
        atual.forEach((interesseAtual: String) =>{
            let valor : number
            if(mapaInteresses.get(interesseAtual)!==undefined){
                valor = mapaInteresses.get(interesseAtual)!
                mapaInteresses.set(interesseAtual, valor+1)
            }else{
                mapaInteresses.set(interesseAtual,1)
            }
        })
    })
    return mapaInteresses
}
async function tratarDadosInteresse(lugar :string, tipo: string) {
    let mapa = new Map <String,number>()
    if(lugar!=="ESTADO"){
        mapa = await interessesMuni(lugar,tipo)
    }else{
        //depois tenho que ver como vou fazer o request pra estado, os testes estão dando errado
    }
    let dados = Array.from(mapa, ([name, value]) => ({ name, value}));
    dados.sort((a,b)=>b.value-a.value)
    //tamano total pra calculo de perocentagem
    /* let total = 0
    dados.forEach(dado=>{
        total = total + dado.value
    })
    let outros = {
        name: 'Outros (menos de 1%):',
        value: 0
    }
    let quantidade = 0;
    dados.forEach((dado,index,objeto)=>{
        if(dado.value/total<0.01){
            if(quantidade < 5){
                outros.name=outros.name + "\n -"+dado.name
                quantidade++
            }else if(quantidade == 5){
                outros.name=outros.name+" ..."
                quantidade++
            }
            
            outros.value=outros.value+dado.value
            objeto.splice(index,1)
        }
    })
    if(quantidade!=0){
        dados.push(outros)
    }
 */
    

    return dados

}
async function numerosDadosEstado(){
    const final : number[] = []
        const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id',
            '_type' : 'EQ(1)'
        }})

        const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id',
            '_type' : 'EQ(2)'
        }})

        const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
        '@select' : 'id'
        }})

        const dataTotal = await Promise.all([p1,p2,p3])
        dataTotal.forEach(data => {
            final.push(data?.data.length)
        });

    return final

}

async function numeroDadosMeso(lugar : string) {
    const final: number[] = []
        const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMesorregiao' : 'EQ('+lugar+')',
        '_type' : 'EQ(1)'
        }})

        const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
        '@select' : 'id',
        'geoMesorregiao' : 'EQ('+lugar+')',
        '_type' : 'EQ(2)'
        }})

        const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
        '@select' : 'id',
        'geoMesorregiao' : 'EQ('+lugar+')',
        }})
        
    
    const dataTotal = await Promise.all([p1,p2,p3])
    dataTotal.forEach(data => {
        final.push(data?.data.length)
    });

    return final
}


async function numerosSemelhantes(listaMunis :string[]) {
    const listaP = []
    for (const muni of listaMunis) {
        listaP.push(numeroDadosMuni(muni))
    }
    const dadosGerais = await Promise.all(listaP)
    return dadosGerais
}

async function dadosBrutosEstado() {
    //vai chamar todos os dados da api, ordenar por numero de agetes individuis e devolver um array no formato [[array municipios na ordem],[array agentes individuais],[array agente coletivos],[arrays espacos]]
    //lista de elementos [nome, agentInd,agenteConj,]
    let listaPersonalizada: {lugar : string , agentesInd : number , agentesColet : number , espacos : number} []  = []
    MUNICIPIOS.forEach((muni)=>{
        let ind = {lugar : muni, agentesInd : 0, agentesColet: 0, espacos: 0}
        listaPersonalizada.push(ind)
    })

    const p1 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id,geoMunicipio',
            '_type' : 'EQ(1)',
            'geoMunicipio' : '!NULL()'
        }})
    const p2 = axios.get('https://mapacultural.secult.ce.gov.br/api/agent/find',{params:{
            '@select' : 'id,geoMunicipio',
            '_type' : 'EQ(2)',
            'geoMunicipio' : '!NULL()'
        }})
    const p3 = axios.get('https://mapacultural.secult.ce.gov.br/api/space/find',{params:{
            '@select' : 'id,geoMunicipio',
            'geoMunicipio' : '!NULL()'
            }})
    const dataTotal = await Promise.all([p1,p2,p3])
    dataTotal[0].data.forEach((element: {id : number , geoMunicipio : string}) => {
        let index = acharIndexElemento(listaPersonalizada, element.geoMunicipio)
        listaPersonalizada[index].agentesInd+=1
    });
    dataTotal[1].data.forEach((element: {id : number , geoMunicipio : string}) => {
        let index = acharIndexElemento(listaPersonalizada, element.geoMunicipio)
        listaPersonalizada[index].agentesColet+=1
    });
    dataTotal[2].data.forEach((element: {id : number , geoMunicipio : string}) => {
        let index = acharIndexElemento(listaPersonalizada, element.geoMunicipio)
        listaPersonalizada[index].espacos+=1
    });
    listaPersonalizada.sort(function(a, b){
        return b.agentesInd - a.agentesInd 
    })
    let listaA: string[] = []
    let listaB: number[] = []
    let listaC: number[] = []
    let listaD: number[] = []
    listaPersonalizada.forEach(element =>{
        listaA.push(element.lugar)
        listaB.push(element.agentesInd)
        listaC.push(element.agentesColet)
        listaD.push(element.espacos)
    })
    let listaFinal = []
    listaFinal.push(listaA)
    listaFinal.push(listaB)
    listaFinal.push(listaC)
    listaFinal.push(listaD)

    return listaFinal;
}

function acharIndexElemento(lista: {lugar : string , agentesInd : number , agentesColet : number , espacos : number} [] , alvo : string){
    for(let i = 0; i<lista.length;i++){
        if(lista[i].lugar === alvo)
        return i;
    }
    return 0
}

async function todosDadosEstado() {
    let p1 = numerosDadosEstado()
    let p2 = dadosBrutosEstado()
    let resultado = await Promise.all([p1,p2])
    return resultado
}
export {tratarDadosInteresse , interessesMuni, numeroDadosMuni,numeroDadosMeso,numerosSemelhantes, numerosDadosEstado, dadosBrutosEstado, todosDadosEstado}