<script>
	import { acharporcentagens } from './sections/scripts/AcharPorcentagens';
	import { numeroDadosMeso, numeroDadosMuni } from './sections/scripts/PuxarDados';
	import TesteMunicipio from './sections/TesteMunicipio.svelte';

	
	
	let municipio="CASCAVEL"
	let valorMuncipio = municipio
	//$:acharporcentagens(municipio).then((Response)=>{
	//	console.log(Response)
	//})
	
	
	

</script>
<div class="container" style="display: flex;">
	<button on:click={()=>{
		valorMuncipio = municipio
	}}> mudar valor </button>
	<div class="header">
		<input bind:value={municipio}>
	</div>
    <TesteMunicipio municipio={valorMuncipio}></TesteMunicipio>
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


