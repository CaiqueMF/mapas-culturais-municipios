import * as charts from 'echarts';

export function echarts(node: HTMLElement, option: { title: { text: string; left: string; } | { text: string; left: string; textStyle: { fontSize: string; }; }; xAxis: { type: string; inverse: boolean; data: any[]; } | { type: string; data: string[]; }; yAxis: { type: string; } | { type: string; }; legend?: { show: boolean; top: string; }; tooltip: { trigger: string; axisPointer: { type: string; }; } | { trigger: string; axisPointer: { type: string; }; }; series: { name: string; data: any[]; type: string; }[] | { data: (string | { value: string; itemStyle: { color: string; }; })[]; type: string; }[]; }) {
	const chart = charts.init(node);
	chart.setOption(option);
}