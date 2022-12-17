<script>
// @ts-nocheck





    import { Chart } from 'svelte-echarts'
	  import { acharporcentagens } from './scripts/AcharPorcentagens';


    /**
	 * @type {string}
	 */
     export let municipio
    

    let dados = [0,0]
    let options
    $: options = {
      title :{
        text: " % participação de "+ municipio +" x % populacao de "+municipio,
        left: "center",
        textStyle : {
          fontSize : "auto"
        }
      },
      tooltip : {
        trigger: 'axis',
      axisPointer: {
      type: 'shadow',
    }
      },
    xAxis: {
    type: 'category',
    data: ['% participação','% populacao']
    },
    yAxis: {
    type: 'value'
    },
    series: [
    {
      data: [
        {
          value: dados[0].toFixed(2),
          itemStyle: {
            color: '#a90000'
          }
        },
        dados[1].toFixed(2),
        
      ],
      type: 'bar'
    }
  ]
};

    $: acharporcentagens(municipio).then((Response)=>{
    
    dados = Response

	  })
    

     
</script>

<div class="container">
  
  <Chart {options} />
</div>

<style>
	.container {
    margin-top: 15px;
		width: 500px;
		height: 500px;
    padding: 15px 15px 0px 15px;
    background-color: white;
    border-radius: 15px;
    margin-left: 5px;
    margin-right: 5px;
	}
</style>