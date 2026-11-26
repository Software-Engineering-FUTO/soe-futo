export function WeekMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid grid-cols-5 gap-[3px] ${className}`}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className={
            i === 9
              ? "h-[5px] w-[5px] rounded-[1px] bg-gold"
              : i % 5 === 0
                ? "h-[5px] w-[5px] rounded-[1px] bg-accent"
                : "h-[5px] w-[5px] rounded-[1px] bg-border"
          }
        />
      ))}
    </span>
  );
}
