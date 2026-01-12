import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculatorComponent } from './tax-calculator.component';
import { TaxCalculationService } from '../services/tax-calculation.service';

describe('TaxCalculatorComponent', () => {
    let component: TaxCalculatorComponent;
    let fixture: ComponentFixture<TaxCalculatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaxCalculatorComponent],  // Standalone component
            providers: [TaxCalculationService]   // Provide the service!
        }).compileComponents();

        fixture = TestBed.createComponent(TaxCalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have initial form values', () => {
        expect(component.taxForm.value).toEqual({
            income: 0,
            age: 25
        });
    });

    it('should mark form as invalid when income is negative', () => {
        component.taxForm.patchValue({ income: -1000 });

        expect(component.taxForm.get('income')?.invalid).toBe(true);
    });

    it('should mark form as valid with correct values', () => {
        component.taxForm.patchValue({ income: 500000, age: 30 });

        expect(component.taxForm.valid).toBe(true);
    });

    it('should calculate tax when form is submitted', () => {
        // Arrange: Fill the form
        component.taxForm.patchValue({ income: 500000, age: 30 });

        // Act: Call calculate (simulates button click)
        component.calculate();

        // Assert: Check if result signal is set
        expect(component.result()).not.toBeNull();
        expect(component.result()?.totalTax).toBeCloseTo(115000, 0);
    });
});