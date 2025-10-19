export interface IPlayerFormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  disabled?: boolean;
  flagPlayerB?: boolean;
}