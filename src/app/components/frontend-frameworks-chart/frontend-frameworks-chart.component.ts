import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { FrontendFrameworks } from './frontend-frameworks.interface';

@Component({
  selector: 'app-frontend-frameworks-chart',
  templateUrl: './frontend-frameworks-chart.component.html',
})
export class FrontendFrameworksChartComponent implements OnInit {
  private data: FrontendFrameworks[] = [
    { frameworkName: 'Vue', stars: 166443, released: '2014' },
    { frameworkName: 'React', stars: 150793, released: '2013' },
    { frameworkName: 'Angular', stars: 62342, released: '2016' },
    { frameworkName: 'Backbone', stars: 27647, released: '2010' },
    { frameworkName: 'Ember', stars: 21471, released: '2011' },
  ];

  private colors: { [framework: string]: string } = {
    Vue: '#a20021',
    React: '#F52F57',
    Angular: '#F79D5C',
    Backbone: '#F3752B',
    Ember: '#d04a35',
  };

  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  private margin = 70;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  public frameworkClicked: FrontendFrameworks;

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', `translate(${this.margin},${this.margin})`);
  }

  private drawBars(data: FrontendFrameworks[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(['framework'])
      .domain(data.map((d) => d.frameworkName))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'middle');

    // text label for the x axis
    this.svg
      .append('text')
      .attr('y', this.height + this.margin)
      .attr('x', this.width / 2)
      .style('text-anchor', 'middle')
      .text('Frameworks');

    // text label for the y axis
    this.svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin + 15)
      .attr('x', -this.height / 2)
      .text('Stars');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', (d) => this.colors[d.frameworkName])
      .attr('x', (d) => x(d.frameworkName))
      .attr('y', (d) => y(d.stars))
      .attr('cursor', 'pointer')
      .attr('width', x.bandwidth())
      .on('click', (event: PointerEvent, framework: FrontendFrameworks) => {
        this.onBarClick(event, framework);
      })
      .attr('height', (d) => this.height - y(d.stars));
  }

  onBarClick(_: PointerEvent, framework: FrontendFrameworks): void {
    this.frameworkClicked = framework;
  }
}
