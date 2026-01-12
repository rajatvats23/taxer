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
});