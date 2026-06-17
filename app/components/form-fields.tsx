const fieldClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900";

export function TextField({
  id,
  label,
  type = "text",
  placeholder,
  defaultValue,
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}

export function SelectField({
  id,
  label,
  defaultValue,
  children,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        className={fieldClass}
      >
        {children}
      </select>
    </div>
  );
}
