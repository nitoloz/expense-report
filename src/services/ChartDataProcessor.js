import * as d3 from 'd3';
import ExpenseItem from "../enums/ExpenseItem";

const OTHERS_GROUP = 'Other';

export default class ChartDataProcessor {

    processPieChartData(data, groupByOption, minimalLevel = 0.02) {
        const internalMap = new Map();
        data.forEach(d => internalMap[d[groupByOption]]
            ? internalMap[d[groupByOption]] += d[ExpenseItem.PURCHASE_AMOUNT]
            : internalMap[d[groupByOption]] = d[ExpenseItem.PURCHASE_AMOUNT]);

        const totalSum = d3.sum(data.map(d => d[ExpenseItem.PURCHASE_AMOUNT]));

        const defaultSortingFunction = (a, b) => {
            return b.key === OTHERS_GROUP
                ? -1
                : a.key === OTHERS_GROUP
                    ? Number.MAX_VALUE
                    : b.value.value - a.value.value
        };

        return d3.nest()
            .key(d => internalMap[d[groupByOption]] / totalSum > minimalLevel ? d[groupByOption] || OTHERS_GROUP : OTHERS_GROUP)
            .rollup(d => {
                const values = d.map(response => response[ExpenseItem.PURCHASE_AMOUNT]);
                return {
                    value: -1 * d3.sum(values),
                    percentageValue: Math.round(d3.sum(values) / totalSum * 100),
                }
            })
            .entries(data)
            .sort(defaultSortingFunction);
    }

    processStackedBarChartData(data) {
        return data.map(d => {
            return {month: d.id, data: d.expenseTypes}
        })
    }
}