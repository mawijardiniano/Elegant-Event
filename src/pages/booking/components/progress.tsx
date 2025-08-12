
import { Progress } from "@/components/ui/progress";
import type { ProgressProps } from '@/utils/types';


export default function ProgressComponent({ step, totalSteps }: ProgressProps) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-w-[800px] bg-white shadow-md rounded-lg p-6 border border-gray-100 mb-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Step {step} of {totalSteps}
        </h2>
        <span className="text-sm text-gray-500">{percent}%</span>
      </div>

      <Progress
        value={percent}
        className="h-4 rounded-full bg-gray-200 [&>div]:bg-black [&>div]:transition-all"
      />
    </div>
  );
}
