import { beforeEach, describe, expect, test } from "vitest";

import DateTools from "../../src/utils/Date.Tools";

describe('Tests of the Date Tools', () => {
    test('That is will return tomorrows date', () => {
        //Arrange
        // Freeze system time to make the test deterministic
        const fixedDate = new Date('2025-08-29T10:00:00Z');
        vi.setSystemTime(fixedDate);

        //Act
        const result = DateTools.tomorrowDate();

        //Assert
        expect(result.slice(0, 10)).toBe('2025-08-30');
        
        // Reset system time
        vi.useRealTimers();
    });
    
});