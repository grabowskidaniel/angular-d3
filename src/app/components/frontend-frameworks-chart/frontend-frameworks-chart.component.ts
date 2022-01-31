import { Component, OnInit } from "@angular/core";
import * as d3 from "d3";
import { FrontendFramework } from "./frontend-frameworks.interface";

@Component({
  selector: "app-frontend-frameworks-chart",
  templateUrl: "./frontend-frameworks-chart.component.html",
})
export class FrontendFrameworksChartComponent implements OnInit {
  private data: FrontendFramework[] = [
    { name: "Vue", stars: 166443, released: "2014" },
    { name: "React", stars: 150793, released: "2013" },
    { name: "Angular", stars: 62342, released: "2016" },
    { name: "Backbone", stars: 27647, released: "2010" },
    { name: "Ember", stars: 21471, released: "2011" },
  ];

  private colors: { [framework: string]: string } = {
    Vue: "#a20021",
    React: "#F52F57",
    Angular: "#F79D5C",
    Backbone: "#F3752B",
    Ember: "#d04a35",
  };

  private margin = 70;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  public frameworkClicked: FrontendFramework | undefined;

  ngOnInit(): void {
    const svg = this.createSvg();
    this.drawBars(this.data, svg); 
  }

  private createSvg(): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    return d3
      .select("figure#bar")
      .append("svg")
      .attr("width", this.width + this.margin * 2)
      .attr("height", this.height + this.margin * 2)
      .append("g")
      .attr("transform", `translate(${this.margin},${this.margin})`);
  }

  private drawBars(data: FrontendFramework[], svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(["framework"])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    // Draw the X-axis on the DOM
    svg
      .append("g")
      .attr("transform", `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "middle");

    // text label for the x axis
    svg
      .append("text")
      .attr('class', 'x-axis-label')
      .attr("y", this.height + this.margin)
      .attr("x", this.width / 2)
      .style("text-anchor", "middle")
      .text("Frameworks");

    // text label for the y axis
    svg
      .append("text")
      .attr('class', 'y-axis-label')
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -this.margin + 15)
      .attr("x", -this.height / 2)
      .text("Stars");

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    svg.append("g").call(d3.axisLeft(y));

    // Create and fill the bars
    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("fill", (d) => this.colors[d.name])
      .attr("x", (d) => Number(x(d.name)))
      .attr("y", (d) => Number(y(d.stars)))
      .attr("cursor", "pointer")
      .attr("width", x.bandwidth())
      .on("click", (event: PointerEvent, framework: FrontendFramework) => {
        this.onBarClick(event, framework);
      })
      .attr("height", (d) => this.height - y(d.stars));
  }

  onBarClick(_: PointerEvent, framework: FrontendFramework): void {
    this.frameworkClicked = framework;
  }
}
