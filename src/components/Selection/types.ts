interface types {
  label?: string;
  name: string;
  options: string | string[];
  defaultString: string;
  required?: boolean;
  onChange: (option: string) => void;
  size?: "small" | "medium" | "full";
}

export default types;
