import type { FloatingLabelInputProps } from "@/shared/models/input-field-model";
import { Box, defineStyle, Field, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "#271E40", // Calculated hex to perfectly match the modal's gradient + 6% white glassmorphism
  px: "2",       // Slightly wider padding to comfortably cover the border line
  top: "2.5",
  insetStart: "3",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  color: "white",
  borderRadius: "sm",
  "&[data-float]": {
    top: "-3",
    insetStart: "2",
    color: "white",
  },
});

const FloatingInput = (props: FloatingLabelInputProps) => {
  const { label, value, endElement, ...rest } = props;

  const [focused, setFocused] = useState(false);
  const shouldFloat = value?.length || 0 > 0 || focused;

  return (
    <Field.Root>
      <Box
        pos="relative"
        w="full">
        <InputGroup endElement={endElement}>
          <Input
            {...rest}
            color="white"
            onFocus={(e) => {
              props.onFocus?.(e);
              setFocused(true);
            }}
            onBlur={(e) => {
              props.onBlur?.(e);
              setFocused(false);
            }}
            onChange={(e) => {
              props.onChange?.(e);
            }}
            value={value}
            data-float={shouldFloat || undefined}
            css={{
              "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              MozAppearance: "textfield",
            }}
          />
        </InputGroup>
        <Field.Label
          css={floatingStyles}
          data-float={shouldFloat || undefined}>
          {label}
        </Field.Label>
      </Box>
    </Field.Root>
  );
};

export { FloatingInput };
