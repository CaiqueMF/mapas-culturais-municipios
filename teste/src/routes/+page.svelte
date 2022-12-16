<script>
	import { echarts } from './echarts';
	import { acharporcentagens } from './sections/scripts/AcharPorcentagens';
	import { numeroDadosLocal } from './sections/scripts/PuxarDados';
	import TesteMunicipio from './TesteMunicipio.svelte';

	
	
	let municipio="QUIXADÁ"

	$:numeroDadosLocal(municipio).then((response)=>{
		console.log(response)
	})
	$:acharporcentagens(municipio).then((Response)=>{
		console.log(Response)
	})
	

</script>
<div class="container" style="display: flex;">
	<div class="header">
		<input bind:value={municipio}>
	</div>
    <TesteMunicipio {municipio}></TesteMunicipio>
</div>

<style>
*{
	background-color: burlywood;
}
input {
	margin-left: 30px;
	background-color: lightgray;
	margin-bottom: 5px;
	min-width: 200px;
	min-height: 50px;
	border: none;
	font-size: 30px;
	border-radius: 5px;
	padding: 5px;
	font-family: 'Times New Roman', Times, serif;
}
.header{
	background-color: white;
	border-radius: 0px 0px 15px 15px;
}
.container{
	display: flex;
	flex-direction: column;
}


</style>


