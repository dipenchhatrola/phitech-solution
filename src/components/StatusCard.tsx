type Props = {
  product: string;
  status: string;
};

export default function StatusCard({ product, status }: Props) {
  const getStatusStyles = () => {
    switch(status) {
      case "Pending":
        return "border-yellow-200 bg-yellow-50";
      case "In Machine":
        return "border-blue-200 bg-blue-50";
      case "Completed":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getStatusBadge = () => {
    switch(status) {
      case "Pending":
        return "bg-yellow-500";
      case "In Machine":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-lg border-2 shadow-md hover:shadow-lg transition duration-300 ${getStatusStyles()}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1 sm:mb-2">{product}</h3>
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${getStatusBadge()}`}></span>
            <span className="text-sm font-medium text-gray-600">Status:</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold
          ${status === "Pending" && "bg-yellow-100 text-yellow-800"}
          ${status === "In Machine" && "bg-blue-100 text-blue-800"}
          ${status === "Completed" && "bg-green-100 text-green-800"}
        `}>
          {status}
        </span>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
