import * as d3 from 'd3';

const OTHERS_GROUP = 'Other';
const AMOUNT = 'Betrag in EUR';

export default class ChartDataProcessor {

  processPieChartData(data, groupByOption, minimalLevel = 0.01) {
    const internalMap = new Map();
    data.forEach(d => internalMap[d[groupByOption]]
        ? internalMap[d[groupByOption]] += d[AMOUNT]
        : internalMap[d[groupByOption]] = d[AMOUNT]);

    const totalSum = d3.sum(data.map(d => d[AMOUNT]));

    const defaultSortingFunction = (a, b) => {
      return b.key === OTHERS_GROUP
          ? -1
          : a.key === OTHERS_GROUP
              ? Number.MAX_VALUE
              : b.value.value - a.value.value
    };

    return d3.nest()
        .key(d => internalMap[d[groupByOption]] / totalSum > minimalLevel ? d[groupByOption] : OTHERS_GROUP)
        .rollup(d => {
          const values = d.map(response => response[AMOUNT]);
          return {
            value: -1 * d3.sum(values),
            percentageValue: Math.round(d3.sum(values) / totalSum * 100),
          }
        })
        .entries(data)
        .sort(defaultSortingFunction);
  }
}