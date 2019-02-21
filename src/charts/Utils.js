import * as d3 from "d3";

const colorScale = d3.scaleOrdinal()
    .domain(['Lebensmittel', 'Restaurants', 'Transport', 'Reisen', 'Haus', 'Unterhaltung', 'Shopping', 'Lehre', 'Medizin', 'Haushaltswaren', 'Sonstig', 'Other'])
    .range(["#8dd3c7", "#ffffb3", "#bebada", "#d9d9d9", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#fb8072", "#bc80bd", "#ccebc5", "#ffed6f"]);

export {colorScale};