import {
  CheckCircle2,
  Send,
  UserPlus,
  FileUp,
  type LucideIcon,
} from "lucide-react";
import { getAllActivity, type ActivityItem } from "@/app/lib/data";

const icons: Record<ActivityItem["type"], LucideIcon> = {
  invoice_paid: CheckCircle2,
  invoice_sent: Send,
  client_added: UserPlus,
  document_shared: FileUp,
};

const activity = getAllActivity();

export default function ActivityFeed() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">Activité récente</h2>
      </div>

      <ul className="px-5 py-2">
        {activity.map((item) => {
          const Icon = icons[item.type];
          return (
            <li key={item.id} className="flex items-start gap-3 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.label}
                </p>
                <p className="truncate text-xs text-gray-500">{item.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">
                {item.time}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
