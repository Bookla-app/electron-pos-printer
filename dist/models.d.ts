export interface PosPrintOptions {
    /**
     * number of copies to print
     */
    copies?: number;
    /**
     * preview in a window, default is false
     */
    preview?: boolean;
    /**
     * the printer's name
     */
    printerName?: string;
    /**
     * margin of a page, css values can be used
     */
    margin?: string;
    /**
     *  timeout per line, default is 400
     */
    timeOutPerLine?: number;
    /**
     * To print silently without printer selection pop-up, default is true
     */
    silent?: boolean;
    /**
     * Specify the width and height in microns of the print out page, default is A4
     */
    pageSize?: SizeOptions;
    windowSize?: SizeOptions;
}
export interface SizeOptions {
    height: number;
    width: number;
}
/**
 * @type PosPrintPosition
 * @description Alignment for type barCode and qrCode
 *
 */
export declare type PosPrintPosition = "left" | "center" | "right";
/**
 * @interface
 * @name PosPrintTableField
 * */
export interface PosPrintTableField {
    type: "text" | "image";
    value?: string;
    path?: string;
    css?: any;
    style?: string;
    width?: string;
    height?: string;
}
/**
 * @interface
 * @name PosPrintData
 * **/
export interface PosPrintData {
    /**
     * @property type
     * @description type data to print: 'text' | 'barCode' | 'qrcode' | 'image' | 'table'
     */
    type: PosPrintType;
    value?: string;
    css?: any;
    style?: string;
    width?: string;
    height?: string;
    fontsize?: number;
    displayValue?: boolean;
    position?: PosPrintPosition;
    path?: string;
    tableHeader?: PosPrintTableField[] | string[];
    tableBody?: PosPrintTableField[][] | string[][];
    tableFooter?: PosPrintTableField[] | string[];
    tableHeaderStyle?: string;
    tableBodyStyle?: string;
    tableFooterStyle?: string;
}
/**
 * @type PosPrintType
 * @name PosPrintType
 * **/
export declare type PosPrintType = "text" | "barCode" | "qrCode" | "image" | "table";
