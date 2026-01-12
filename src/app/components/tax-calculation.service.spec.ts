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

    it('should calculate correct tax for 5 lakh income', () => {
        const income = 500000;
        const age = 30;

        const result = service.calculateTax(income, age);
        expect(result.totalTax).toBeCloseTo(115000, 0);
    })

    it('should return zero tax for zero income', () => {
        const income = 0;
        const age = 30;

        const result = service.calculateTax(income, age);
        expect(result.totalTax).toBe(0);
    })

    it('should throw error for negative income', () => {
        expect(() => {
            service.calculateTax(-1, 30);
        }).toThrow();
    })

    it('should apply senior citizen deduction', () => {
        const income = 100000;
        const age = 70;
        const result = service.calculateTax(income, age);
        expect(result.totalTax).toBeLessThan(115000);
    })
});