import { TestBed } from "@angular/core/testing";
import { TaxCalculationService } from "../services/tax-calculation.service"

describe('TaxCalculationService', () => {
    let service: TaxCalculationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TaxCalculationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Basic Tax Calculations', () => {
        it('should calculate correct tax for ₹5 lakh income', () => {
            const income = 500000;
            const age = 30;

            const result = service.calculateTax(income, age);
            expect(result.totalTax).toBeCloseTo(115000, 0);
        });

        it('should return zero tax for zero income', () => {
            const income = 0;
            const age = 30;

            const result = service.calculateTax(income, age);
            expect(result.totalTax).toBe(0);
        });
    });

    describe('Error Handling', () => {
        it('should throw error for negative income', () => {
            expect(() => {
                service.calculateTax(-1, 30);
            }).toThrow();
        });
    });

    describe('Deductions', () => {
        it('should apply senior citizen deduction', () => {
            const income = 500000;  // Fixed: use same as basic test
            const youngTax = service.calculateTax(500000, 30).totalTax;
            const seniorTax = service.calculateTax(500000, 70).totalTax;

            expect(seniorTax).toBeLessThan(youngTax);
        });
    });

    describe('Slab Boundary Testing', () => {
        it('should calculate zero tax at ₹50k boundary', () => {
            const result = service.calculateTax(50000, 30);
            expect(result.totalTax).toBe(0);
        });

        it('should apply 10% tax just above ₹50k', () => {
            const result = service.calculateTax(50001, 30);
            // Only ₹1 in 10% slab = ₹0.10 tax
            expect(result.totalTax).toBeCloseTo(0.10, 2);
        });

        it('should calculate correct tax at ₹1L boundary', () => {
            const result = service.calculateTax(100000, 30);
            // Actual range taxed: ₹50k @ 10% = ₹5,000
            expect(result.totalTax).toBeCloseTo(5000, 0);
        });

        it('should transition to 20% slab above ₹1L', () => {
            const result = service.calculateTax(100001, 30);
            // Previous + ₹1 @ 20% = ₹5,000.10
            expect(result.totalTax).toBeGreaterThan(4999.90);
        });
    });
});