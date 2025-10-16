import { FC } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

type Props = {
  value?: string;
  options?: string[];
  onValueChange?: (value: string) => void;
};

const RadioInput: FC<Props> = ({ value, options = [], onValueChange }) => {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {options.map((option) => (
        <Label className="flex items-center space-x-2" key={option}>
          <RadioGroupItem value={option} />
          <span>{option}</span>
        </Label>
      ))}
    </RadioGroup>
  );
};

export default RadioInput;
