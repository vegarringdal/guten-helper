import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sample } from "./Sample";
import React from "react";

/**
 * minimal sample
 * https://testing-library.com/docs/react-testing-library/example-intro
 */
describe("Sample test", () => {
    test("Should show something", () => {
        render(<Sample></Sample>);
        expect(screen.getByText(/wow it works/i)).toBeDefined();
    });
});
