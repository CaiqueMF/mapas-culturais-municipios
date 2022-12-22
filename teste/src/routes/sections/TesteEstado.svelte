<script>
// @ts-nocheck

	import { Chart } from "svelte-echarts";
import { element } from "svelte/internal";
	import { dadosBrutosEstado, todosDadosEstado } from "./scripts/PuxarDados";

    
    
    /**
	 * @type {number[]}
	 */
    let dadosTitulos = []
    let munis = []
    let inds = []
    let colets = []
    let espacos = []
    todosDadosEstado().then((Response)=>{
        dadosTitulos = Response[0]
        munis = Response[1][0]
        inds = Response[1][1]
        colets = Response[1][2]
        espacos = Response[1][3]
    })
    let options
    $: options = {
        legend: {
    show: true,
    top: "25px"
  },
    title: {
    text: 'visão geral do estado',
    left: 'center'
    },
    toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    bottom: 90
  },
  dataZoom: [
    {
      type: 'inside'
    },
    {
      type: 'slider'
    }
  ],
  xAxis: {
    data: munis
  },
  yAxis: {
    splitArea: {
      show: false
    }
  },
  series: [
    {
      name: "agentes individuais",
      data: inds,
      type: 'bar',
      large: true
    },
    {
      name: "agentes coletivos",
      data: colets,
      type: 'bar',
      large: true
    },
    {
      name: "espaços",
      data: espacos,
      type:'bar',
      large: true
    }
  ]
};
</script>
<div class="organize">
    <div class="info">
        <h1>número de agentes individuais</h1>
        <h3>{dadosTitulos[0]}</h3>
    </div>
    <div class="info">
        <h1>número de agentes coletivos</h1>
        <h3>{dadosTitulos[1]}</h3>
    </div>
    <div class="info">
        <h1>número de locais</h1>
        <h3>{dadosTitulos[2]}</h3>
    </div>
</div>

<div class="container">
  <Chart {options}/>
</div>




<style>
    .container {
    padding: 0;
    margin-top: 5px;
	width: 1720px;
	height: 600px;
    padding-top: 10px;
    padding-left: 80px;
    padding-right: 80px;
    margin-left: 10px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;
    padding-bottom: 5px;
	}
    .organize{
        display: flex;
        flex-direction: row;
        margin-left: 5px;
        margin-right: 5px;
        justify-content: space-between;
    }
    .info{
        min-width: 600px;
        background-color: white;
        padding: 10px;
        margin: 15px 5px 5px 5px;
        border-radius: 15px;
    }
    .info h1{
        margin: 0px;
        font-weight: 300;
        text-align: center;
    }
    .info h3{
        margin: 0px;
        text-align: center;
        font-size: 60px;
        font-weight: 200;
    }
</style>