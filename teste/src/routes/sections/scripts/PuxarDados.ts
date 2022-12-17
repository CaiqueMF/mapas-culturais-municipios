import axios from "axios"







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


export {numeroDadosMuni,numeroDadosMeso,numerosSemelhantes}