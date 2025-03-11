
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FILE_FORMATS, FileFormat } from "./FileConverter";

interface FormatSelectorProps {
  value: string | null;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ 
  value, 
  onChange, 
  label,
  disabled = false
}) => {
  const formatGroups: Record<string, FileFormat[]> = FILE_FORMATS.reduce(
    (groups, format) => {
      const category = format.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(format);
      return groups;
    },
    {} as Record<string, FileFormat[]>
  );

  const formatCategoryLabels: Record<string, string> = {
    image: "Images",
    document: "Documents",
    data: "Data Files",
    audio: "Audio",
    video: "Video",
    other: "Other Formats"
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select
        value={value || ""}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(formatGroups).map(([category, formats]) => (
            <React.Fragment key={category}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {formatCategoryLabels[category]}
              </div>
              {formats.map((format) => (
                <SelectItem key={format.extension} value={format.extension}>
                  {format.name}
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormatSelector;
