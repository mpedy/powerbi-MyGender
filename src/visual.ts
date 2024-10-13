/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;
    private circle: Selection<SVGElement>;
    private textValue: Selection<SVGElement>;
    private textLabel: Selection<SVGElement>;
    private margin = { top: 10, right: 30, bottom: 30, left: 40 };

    constructor(options: VisualConstructorOptions) {
        console.log("Visual build options", options)
        this.svg = d3.select(options.element)
            .append('svg')
        this.container = this.svg.append("g")
            .classed('container', true);
        this.circle = this.container.append("circle")
            .classed('circle', true);
        this.textValue = this.container.append("text")
            .classed("textValue", true);
        this.textLabel = this.container.append("text")
            .classed("textLabel", true);
    }

    public percentile = (arr, val) => d3.quantile(arr, val);

    public old_percentile = (arr, val) =>
        (100 *
            arr.reduce(
                (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
                0
            )) /
        arr.length;

    public calculations(dataView: DataView) {
        var result = ""
        for (var area of dataView.matrix.rows.root.children) {
            result += area.value + " : ";
            result += "\nMin=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 0)).toFixed(2);
            result += "\nperc5=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 0.05)).toFixed(2);
            result += "\nQ1=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 0.25)).toFixed(2);
            result += "\nMediana=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 0.50)).toFixed(2);
            result += "\nQ3=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 0.75)).toFixed(2);
            result += "\nPerc95=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 0.95)).toFixed(2);
            result += "\nMax=" + parseFloat("" + this.percentile(Object.values(area.values).map(a => a.value), 1)).toFixed(2);
        }
        return result;
    }

    public update(options: VisualUpdateOptions) {
        console.log("Update options", options)
        let dataView: DataView = options.dataViews[0];
        console.log("Dataview", dataView)
        debugger;
        let width: number = options.viewport.width - this.margin.left - this.margin.right;
        let height: number = options.viewport.height - this.margin.top - this.margin.bottom;
        this.svg.attr("width", width);
        this.svg.attr("height", height);
        let radius: number = Math.min(width, height) / 2.2;
        this.circle
            .style("fill", "white")
            .style("fill-opacity", 0.5)
            .style("stroke", "black")
            .style("stroke-width", 2)
            .attr("r", radius)
            .attr("cx", width / 2)
            .attr("cy", height / 2);
        let fontSizeValue: number = Math.min(width, height) / 5;
        let result = this.calculations(dataView);
        this.textValue
            .text("Eccoci")
            .attr("x", "50%")
            .attr("y", "50%")
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .style("font-size", fontSizeValue + "px");
        let fontSizeLabel: number = fontSizeValue / 4;
        console.log("VALORI METADATA: ", dataView.metadata.columns[0].displayName);
        this.textLabel
            .text(result)
            .attr("x", "50%")
            .attr("y", height / 2)
            .attr("dy", fontSizeValue / 5.2)
            .attr("text-anchor", "middle")
            .style("font-size", fontSizeLabel + "px");
    }
}