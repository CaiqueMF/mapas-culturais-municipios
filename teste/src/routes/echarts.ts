import * as charts from 'echarts';


export function echarts(node: HTMLElement, option: any) {
	const chart = charts.init(node);
	chart.setOption(option);
}