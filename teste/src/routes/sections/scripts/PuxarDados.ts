import axios from "axios"
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
export {numeroDadosMuni,numeroDadosMeso,numerosSemelhantes, numerosDadosEstado, dadosBrutosEstado, todosDadosEstado}