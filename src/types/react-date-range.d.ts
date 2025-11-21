declare module "react-date-range" {
  import * as React from "react";

  export interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
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
  }

  export class DateRange extends React.Component<DateRangeProps, Record<string, unknown>> {}
}
