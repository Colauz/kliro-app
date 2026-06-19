export default function EmptyState({
  icon,
  title,
  description,
  actionButton,
  variant = "page",
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
  variant?: "page" | "card";
}) {
  if (variant === "card") {
    return (
      <div className="flex flex-col items-center justify-center gap-2 px-5 py-12 text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
        {icon}
      </div>
      <h2 className="mt-5 text-base font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      )}
      {actionButton && <div className="mt-6">{actionButton}</div>}
    </div>
  );
}
