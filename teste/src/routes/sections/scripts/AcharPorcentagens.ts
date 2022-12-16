import { MESO } from "./CONSTANTS/MESO"
import { MICRO } from "./CONSTANTS/MICRO"
import { POPULACAO } from "./CONSTANTS/POPULACAO"
import { numeroDadosLocal } from "./PuxarDados"

async function acharporcentagens(municipio:string){
    let porcentagemPop = POPULACAO.get(municipio)
    const meso = MESO.get(MICRO.get(municipio))
    const micros = new Set()
    const munis = []
    for (const entry of MESO.entries()) {
        if(entry[1]==meso){
            micros.add(entry[0])
        }
    }
    
    for (const entry of MICRO.entries()) {
        if(micros.has(entry[1])){
            munis.push(entry[0])
        }
    }
    let populacaoTotal = 0
    
    munis.forEach(element => {
        populacaoTotal = populacaoTotal + POPULACAO.get(element)
    });
    porcentagemPop = porcentagemPop / populacaoTotal
    

    let populacaoApi =1
    const p1 = numeroDadosLocal(municipio)
    let populacaoTotalApi=1
    const p2 = numeroDadosLocal(meso)
    const data = await Promise.all([p1,p2])
    populacaoApi = data[0][0]
    populacaoTotalApi = data[1][0]
    populacaoApi = populacaoApi/populacaoTotalApi
    return [porcentagemPop,populacaoApi]
}


export {acharporcentagens}