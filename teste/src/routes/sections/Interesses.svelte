<script>
// @ts-nocheck

	import { Chart } from "svelte-echarts";
import {tratarDadosInteresse } from "./scripts/PuxarDados";
    export let municipio
    /**
	 * @type {{ name: String; value: number; }[]}
	 */
    let dados
    /**
	 * @type {{ name: String; value: number; }[]}
	 */
    let dadosEspacos
    $: tratarDadosInteresse(municipio, "agent").then((Response)=>{
        // @ts-ignore
        dados = Response
    })
    $: tratarDadosInteresse(municipio, "space").then((Response)=>{
        // @ts-ignore
        dadosEspacos = Response
    })
    $: options = {
  title: {
    text: 'interesses dos agentes de '+municipio,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
        minShowLabelAngle: 3,
      type: 'pie',
      radius: '60%',
      data: dados,
      label: {
      fontSize: 14
    },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

$: optionEspaco = {
  title: {
    text: 'interesses dos espaços de '+municipio,
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    
    {
        minShowLabelAngle: 3,
      type: 'pie',
      radius: '60%',
      data: dadosEspacos,
      label: {
      fontSize: 14
    },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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