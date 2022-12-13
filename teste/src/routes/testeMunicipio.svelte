<script>
    import Comparativo from "./sections/comparativo.svelte";
    import Percentual from "./sections/percentual.svelte";
    export let municipio
    /**
	 * @type {{ name: string; valueAgentIndividual: number; valueAgentColetivo: number; valueLocais: number; }[]}
	 */
    let tudo
    /**
	 * @type {{ name: string; valueAgentIndividual: number; valueAgentColetivo: number; valueLocais: number; }}
	 */
    let muni
    
    tudo = [{
        name : 'CANINDÉ',
        valueAgentIndividual: 256,
        valueAgentColetivo: 47,
        valueLocais: 14
    },
    {
        name : 'PACAJUS',
        valueAgentIndividual: 165,
        valueAgentColetivo: 18,
        valueLocais: 9
    },
    {
        name : 'CRATEÚS',
        valueAgentIndividual: 128,
        valueAgentColetivo: 18,
        valueLocais: 5
    },
    {
        name : 'RUSSAS',
        valueAgentIndividual: 113,
        valueAgentColetivo: 18,
        valueLocais: 11
    },
    {
        name : 'PACATUBA',
        valueAgentIndividual: 289,
        valueAgentColetivo: 39,
        valueLocais: 8
    }
]
    muni = {
        name: 'QUIXADÁ',
        valueAgentIndividual: 248,
        valueAgentColetivo: 28,
        valueLocais: 34
    }
    
    
</script>
<div style="display: block;">
    <div class="organize">
        <div>
            <Percentual populacaoTotal = 920008 populacaoLocal = 88899 populacaoTotalApi= 1930 populacaoLocalApi = {muni.valueAgentIndividual} nome = {muni.name}></Percentual>
            <div class="organize">
                <div class="similar">
                    <h2>municipios semelhantes para comparação (<span>17%</span>)</h2>
                    <ul>
                        <li>CANINDÉ</li>
                        <li>PACAJUS</li>
                        <li>CRATEÚS</li>
                        <li>RUSSAS</li>
                        <li>PACATUBA</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="organize2">
            <div class="organize">
                <div class="info">
                    <h1>numero de agentes individuais</h1>
                    <h3>{muni.valueAgentIndividual}</h3>
                </div>
                <div class="info">
                    <h1>numero de agentes coletivos</h1>
                    <h3>{muni.valueAgentColetivo}</h3>
                </div>
                <div class="info">
                    <h1>numero de locais</h1>
                    <h3>{muni.valueLocais}</h3>
                </div>
            </div>
            <div>
                <Comparativo file = {tudo} municipio = {muni}></Comparativo>
            </div>
        </div>
        
    </div>
    
</div>
<style>
    .organize{
        display: flex;
        flex-direction: row;
    }

    .info{
        min-width: 350px;
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
    .organize2 {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .similar {
        min-width: 535px;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        margin-top: 15px;
        margin-bottom: 30px;
        margin-left: 15px;
        margin-right: 5px;
    }

    .similar h2{
        font-weight: 300;
        text-align: center;
    }
    .similar h2 span {
        color: red;
    }
    .similar ul{
        list-style-type: none;
    }
    .similar ul li{
        font-size: 16px;
        text-align: center;
        padding-bottom: 5px;
    }
</style>


