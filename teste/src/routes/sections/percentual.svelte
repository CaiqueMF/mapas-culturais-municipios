<script>
    import { echarts } from "../echarts";
    export let populacaoTotal;
    export let populacaoLocal;
    export let populacaoTotalApi
    export let populacaoLocalApi
    /**
	 * @type {string}
	 */
     export let nome

    let porcentagem = ((populacaoLocal/populacaoTotal)*100).toFixed(2)
    let porcentagemApi = ((populacaoLocalApi/populacaoTotalApi)*100).toFixed(2)
    let option = {
      title :{
        text: " % participação de "+ nome +" x % populacao de"+nome,
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
          value: porcentagemApi,
          itemStyle: {
            color: '#a90000'
          }
        },
        porcentagem,
        
      ],
      type: 'bar'
    }
  ]
};
</script>

<div class="container" use:echarts={option} />

<style>
	.container {
    margin-top: 15px;
		min-width: 500px;
		min-height: 500px;
    padding: 15px 15px 0px 15px;
    background-color: white;
    border-radius: 15px;
    margin-left: 5px;
    margin-right: 5px;
	}
</style>