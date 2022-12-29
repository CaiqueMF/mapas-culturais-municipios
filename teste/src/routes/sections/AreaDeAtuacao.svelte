<script>


	import { Chart } from "svelte-echarts";
import {tratarDadosInteresse } from "./scripts/PuxarDados";
    /**
	 * @type {string}
	 */
     export let municipio
    
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let nomesAgentes
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let valoresAgentes
    let restanteAgentes

    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let nomesLocais
    /**
	 * @type {String[] | { name: String; value: string; }}
	 */
    let valoresLocais
    let restanteLocais
    $: tratarDadosInteresse(municipio, "agent").then((Response)=>{
        // @ts-ignore
        nomesAgentes = Response[0][0]
        // @ts-ignore
        valoresAgentes = Response[0][1]
        restanteAgentes = Response[1]


    })
    $: tratarDadosInteresse(municipio, "space").then((Response)=>{
        // @ts-ignore
        nomesLocais = Response[0][0]
        // @ts-ignore
        valoresLocais = Response[0][1]
        restanteLocais = Response[1]
    })
    $: options = {
  title: {
    text: 'Área de atuação dos membros de '+municipio,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  yAxis: {
    type: 'category',
    data: nomesAgentes,
    inverse: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: valoresAgentes,
      type: 'bar',
      colorBy: 'data'
    }
  ]
};

$: optionEspaco = {
  title: {
    text: 'Área de atuação dos membros de '+municipio,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  yAxis: {
    type: 'category',
    data: nomesLocais,
    inverse : true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: valoresLocais,
      type: 'bar',
      colorBy: 'data'
    }
  ]
};
</script>
<div class="segurarAmbos">
    <div class="container">
        <Chart {options}/>
    </div>
    <div class="container" id="segundo" >
        <Chart options={optionEspaco}/>
    </div>
</div>
<style>
    #segundo{
        margin-left: 20px;
    }
    .segurarAmbos{
        display: flex;
    }
    .container {
        
        background-color: white;
        margin-left: 20px;
        margin-bottom: 20px;
        padding: 20px;
        padding-bottom: 0px;
        border-radius: 10px;
        width: 800px;
        height: 800px;
        padding-left: 35px;
    }
</style>