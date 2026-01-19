interface DateInfoProps {
  date?: string;
  updatedDate?: string;
  className?: string;
  showCreatedLabel?: boolean;
  showUpdatedLabel?: boolean;
  createdLabel?: string;
  updatedLabel?: string;
}

export default function DateInfo({
  date,
  updatedDate,
  className = "text-xs text-gray-400 mb-4",
  showCreatedLabel = true,
  showUpdatedLabel = true,
  createdLabel = "作成日",
  updatedLabel = "最終更新",
}: DateInfoProps) {
  if (!date && !updatedDate) {
    return null;
  }

  return (
    <div className={className}>
      {date && (
        <>
          {showCreatedLabel && <span>{createdLabel}: </span>}
          <span>{date}</span>
          {updatedDate && (
            <>
              <span className="mx-2">|</span>
              {showUpdatedLabel && <span>{updatedLabel}: </span>}
              <span>{updatedDate}</span>
            </>
          )}
        </>
      )}
      {!date && updatedDate && (
        <>
          {showUpdatedLabel && <span>{updatedLabel}: </span>}
          <span>{updatedDate}</span>
        </>
      )}
    </div>
  );
}
