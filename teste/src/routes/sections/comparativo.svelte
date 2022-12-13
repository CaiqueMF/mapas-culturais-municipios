<script>
    import { echarts } from "../echarts";
    export let file
    export let municipio
    let datas = []
    let values = []
    let valuesColetivo = []
    let valuesLocais = []
    for (const key in file) {
        const element = file[key];
        datas.push(element.name)
        values.push(element.valueAgentIndividual)
        valuesColetivo.push(element.valueAgentColetivo)
        valuesLocais.push(element.valueLocais)
    }    
    console.log(values)
    console.log(datas)
    console.log(valuesLocais)
    const option = {
  title: {
    text: "comparativo municipios semelhantes",
    left: "center"
  },
  xAxis: {
    type: 'category',
    inverse: true,
    data: [...datas,municipio.name]
  },
  yAxis: {
    type: 'value'
  },
  legend: {
    show: true,
    top: "25px"
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  series: [
    {
      name: "agentes individuais",
      data: [...values,{
        value: municipio.valueAgentIndividual,
        itemStyle: {
            color: '#005eaa'
          }
      }],
      type: 'bar'
    },
    {
      name: "agentes coletivos",
      data: [...valuesColetivo,{
        value:municipio.valueAgentColetivo,
        itemStyle: {
            color: '#2b821d'
          }
        
      }],
      type: 'bar'
    },
    {
      name: "espaços",
      data: [...valuesLocais,{
        value:municipio.valueLocais,
        itemStyle: {
            color: '#e6b600'
          }
      }],
      type:'bar'
    }
  ]
};

</script>

<div class="container" use:echarts={option} />

<style>
	.container {
    padding: 0;
    margin-top: 5px;
		min-width: 1150px;
		min-height: 575px;
    padding-top: 10px;
    padding-left: 30px;
    margin-left: 5px;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 20px;
    padding-bottom: 5px;
	}
</style>