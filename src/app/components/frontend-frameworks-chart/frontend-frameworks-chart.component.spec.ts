import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FrontendFrameworksChartComponent } from './frontend-frameworks-chart.component';

describe('FrontendFrameworksChartComponent', () => {
  let fixture: ComponentFixture<FrontendFrameworksChartComponent>;
  let chartElement: HTMLElement;
  let component: FrontendFrameworksChartComponent;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FrontendFrameworksChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendFrameworksChartComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    chartElement = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the h2 title', () => {
    expect(chartElement.querySelector('h2')?.textContent).toBe('Bar Chart');
  });

  it('should render the h4 explanation title', () => {
    expect(chartElement.querySelector('h4')?.textContent).toBe('Number of repository stars by framework');
  });

  it('should render the figure base element', () => {
    expect(chartElement.querySelector('figure#bar')).toBeTruthy();
  });

  it(`should render one rect bar element for each framework`, () => {
    const frameworkBarElements = chartElement.querySelectorAll('figure rect').length;
    expect(frameworkBarElements).toBe(fixture.componentInstance['data'].length);
  });

  it(`should render a pointer cursor for the rect element`, () => {
    const attributes = chartElement.querySelector('figure rect')?.attributes;
    expect(attributes?.getNamedItem('cursor')?.value).toBe('pointer');
  });

  it('should render the x axis label', () => {
    expect(chartElement.querySelector('g text.x-axis-label')?.textContent).toEqual('Frameworks');
  });

  it('should render the y axis label', () => {
    expect(chartElement.querySelector('g text.y-axis-label')?.textContent).toEqual('Stars');
  });

  it('should render the on click message', () => {
    const frameworkBarElement = chartElement.querySelector('figure rect');
    frameworkBarElement?.dispatchEvent(new Event('click'));
    expect(component.frameworkClicked).toEqual(component['data'][0]);
  });
});
 