import { PosPrintData, PosPrintOptions } from "./models";
export declare class PosPrinter {
    static print(data: PosPrintData[], options: PosPrintOptions): Promise<{
        complete: boolean;
    }>;
    private static renderPrintDocument;
}
