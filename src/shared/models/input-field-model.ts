import type { InputProps } from "@chakra-ui/react";

export interface FloatingLabelInputProps extends InputProps {
  label: React.ReactNode;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  endElement?: React.ReactElement;
}
