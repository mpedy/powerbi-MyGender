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
import { image } from "./unige_image";
import { mars_image, calcPerc as mars_calc_perc } from "../assets/Mars_riempitivo";
import { venus_image, calcPerc as venus_calc_perc } from "../assets/Venus_riempitivo";

type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private margin = { top: 30, right: 100, bottom: 50, left: 30, xAxistop: 15 };
    private options: VisualUpdateOptions;
    private isGender_insidetext = false
    private Mars: Selection<SVGElement>;
    private Venus: Selection<SVGElement>;

    constructor(options: VisualConstructorOptions) {
        console.log("Visual build options", options)
        console.log("Salvato", this.options)
        this.svg = d3.select(options.element)
            .append('svg')

    }

    public update(options: VisualUpdateOptions) {
        this.options = options
        console.log("Update options", options)
        this.svg.selectAll("*").remove()
        //debugger;
        let dataView: DataView = options.dataViews[0];
        console.log("Dataview", dataView)
        //debugger;
        const dim = Math.min(options.viewport.width, options.viewport.height)
        if (this.isGender_insidetext) {
            this.svg.attr("width", options.viewport.width).attr("height", options.viewport.height)
            this.Mars = this.svg
                .append("g")
                .attr("transform", `translate(${(options.viewport.width - dim) / 3},${options.viewport.height / 4})`)
                .html(mars_image);
            this.Mars.select("svg").attr("width", dim / 2).attr("height", dim / 2)
            this.Venus = this.svg
                .append("g")
                .attr("transform", `translate(${options.viewport.width - (options.viewport.width - dim) / 3 - dim / 2},${options.viewport.height / 4})`)
                .html(venus_image)
            this.Venus.select("svg").attr("width", dim / 2).attr("height", dim / 2)
            var a1 = (Math.random() * 1000) % 100
            var a2 = 100 - a1
            this.Mars.select("#mars_perc").attr("width", mars_calc_perc(a1) + "px")
            this.Mars
                .append("text")
                .text(a1.toFixed(2) + "%")
                .attr("x", 17.39 * dim / 2 / 100)
                .attr("y", 63.77 * dim / 2 / 100)
                .style("font-size", (13.91 * dim / 2 / 100) + "px")
                .style("font-weight", "bold")
                .style("fill", "blue")
                .style("stroke", "black")
                .style("stroke-width", "2px");
            this.Venus.select("#venus_perc").attr("width", venus_calc_perc(a2) + "px")
            this.Venus
                .append("text")
                .text(a2.toFixed(2) + "%")
                .attr("x", 31.88 * dim / 2 / 100)
                .attr("y", 37.68 * dim / 2 / 100)
                .style("font-size", (10.43 * dim / 2 / 100) + "px")
                .style("font-weight", "bold")
                .style("fill", "pink")
                .style("stroke", "black")
                .style("stroke-width", "2px");
        } else {
            this.svg.attr("width", options.viewport.width).attr("height", options.viewport.height)
            this.Mars = this.svg
                .append("g")
                .attr("transform", `translate(${(options.viewport.width - dim) / 3},${options.viewport.height / 4})`)
                .html(mars_image);
            this.Mars.select("svg").attr("width", dim / 2).attr("height", dim / 2)
            this.Venus = this.svg
                .append("g")
                .attr("transform", `translate(${options.viewport.width - (options.viewport.width - dim) / 3 - dim / 2},${options.viewport.height / 4})`)
                .html(venus_image)
            this.Venus.select("svg").attr("width", dim / 2).attr("height", dim / 2)
            var a1 = (Math.random() * 1000) % 100
            var a2 = 100 - a1
            this.Mars.select("#mars_perc").attr("width", mars_calc_perc(a1) + "px")
            this.Venus.select("#venus_perc").attr("width", venus_calc_perc(a2) + "px")
            this.Mars
                .append("text")
                .text(a1.toFixed(2) + "%")
                .attr("x", dim / 4)
                .attr("y", dim / 2 + 60)
                .style("text-anchor", "middle")
                .style("font-size", (13.91 * dim / 2 / 100) + "px")
                .style("font-weight", "bold")
                .style("fill", "#199BFC")
                .style("stroke", "black")
                .style("stroke-width", "2px");
            this.Venus
                .append("text")
                .text(a2.toFixed(2) + "%")
                .attr("x", dim / 4)
                .attr("y", dim / 2 + 60)
                .style("text-anchor", "middle")
                .style("font-size", (13.91 * dim / 2 / 100) + "px")
                .style("font-weight", "bold")
                .style("fill", "pink")
                .style("stroke", "black")
                .style("stroke-width", "2px");
        }
        this.svg
            .append("image")
            .attr("xlink:href", "data:image/png;base64," + image)
            .attr("x", options.viewport.width - 300)  // Posizione X dell'immagine
            .attr("y", 0)  // Posizione Y dell'immagine
            .attr("width", 300)  // Larghezza dell'immagine
            .attr("height", 300/1.66);  // Altezza dell'immagine
        return;
    }
}