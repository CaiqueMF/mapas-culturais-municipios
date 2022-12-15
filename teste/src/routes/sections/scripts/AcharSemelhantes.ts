import { MUNICIPIOS } from "./CONSTANTS/MUNICIPIOS"
import { PIB } from "./CONSTANTS/PIB"
import { POPULACAO } from "./CONSTANTS/POPULACAO"


function getCommon(arr1: string[], arr2: string[]) {
    arr1.sort();                      
    arr2.sort();
    const common = [];                  
    let i = 0, j = 0;                 
    while(i<arr1.length && j<arr2.length) {
      
      if(arr1[i] == arr2[j]) {        
        common.push(arr1[i]);
        i++;
        j++;
      }
      else if(arr1[i] < arr2[j]) {  
        i++;                        
      }                            
      else {
        j++;
      }
    }
    
    return common;
  }



function acharSemelhantes(municipio : string){
    if(MUNICIPIOS.has(municipio)){
      let municipiosPopulacao: string[] = []
      let municipiosPib: string[] = []
      const popMunicipio = POPULACAO.get(municipio)
      const pibMunicipio = PIB.get(municipio)

      let ambos: string[] = []
      let tolerance = 0
      while(ambos.length<5&&tolerance<1){
          municipiosPopulacao = []
          municipiosPib = []
          tolerance = tolerance + 0.01

          for (const entry of POPULACAO.entries()) {
            if((popMunicipio*(1-tolerance))<=entry[1] && (popMunicipio*(1+tolerance))>=entry[1]){
              municipiosPopulacao.push(entry[0])
          }
          }

          for (const entry of PIB.entries()) {
            if((pibMunicipio*(1-tolerance))<=entry[1] && (pibMunicipio*(1+tolerance))>=entry[1]){
              municipiosPib.push(entry[0])
          }
          }
          ambos = getCommon(municipiosPopulacao,municipiosPib)
          ambos.splice(ambos.indexOf(municipio),1)
      }
      ambos.push(tolerance.toFixed(2).toString())
      return ambos
  }
  else{
      console.error("municipio não encontrado")
      return []
  }
    
    

}


export {acharSemelhantes}