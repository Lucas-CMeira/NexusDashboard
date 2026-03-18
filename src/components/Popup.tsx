interface PopupProps {
  show: boolean;
  title: string;
  description: string;
  variant: "success" | "error" | "warning";
}

const Popup = ({ description, show, title, variant }: PopupProps) => {
  if (!show) return null;

  const variantStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="flex justify-center p-6">
      <div
        className={`text-white px-6 py-4 rounded-xl shadow-lg ${variantStyles[variant]}`}
      >
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Popup;
