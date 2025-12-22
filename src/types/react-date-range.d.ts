declare module "react-date-range" {
  import * as React from "react";
  import { Locale } from "date-fns";

  export interface Range {
    startDate?: Date;
    endDate?: Date;
    key?: string;
    color?: string;
  }

  export interface RangeKeyDict {
    [key: string]: Range;
  }

  export interface DateRangeProps {
    ranges: Range[];
    onChange: (ranges: RangeKeyDict) => void;

    moveRangeOnFirstSelection?: boolean;
    showSelectionPreview?: boolean;
    months?: number;
    direction?: "vertical" | "horizontal";
    preventSnapRefocus?: boolean;
    showDateDisplay?: boolean;
    weekdayDisplayFormat?: string;
    monthDisplayFormat?: string;
    rangeColors?: string[];
    locale?: Locale;
    minDate?: Date;
    maxDate?: Date;
    editableDateInputs?: boolean;
    retainEndDateOnFirstSelection?: boolean;
    // staticRanges?: any[];
    // inputRanges?: any[];
  }

  export class DateRange extends React.Component<
    DateRangeProps,
    Record<string, unknown>
  > {}
}
