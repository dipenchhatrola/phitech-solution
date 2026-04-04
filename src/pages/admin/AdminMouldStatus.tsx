import { mouldData } from "../../data/mouldData";

const getStatusClass = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-amber-100 text-amber-800";
    case "In Machine":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function AdminMouldStatus() {
  const summary = mouldData.reduce(
    (acc, item) => {
      acc.total += 1;
      acc[item.status] = (acc[item.status] ?? 0) + 1;
      return acc;
    },
    { total: 0, Pending: 0, "In Machine": 0, Completed: 0 } as Record<
      string,
      number
    >
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">Total Moulds</p>
          <p className="text-2xl font-semibold text-slate-900 mt-2">
            {summary.total}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">Pending</p>
          <p className="text-2xl font-semibold text-amber-600 mt-2">
            {summary.Pending}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">In Machine</p>
          <p className="text-2xl font-semibold text-blue-600 mt-2">
            {summary["In Machine"]}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-200">
          <p className="text-xs uppercase text-slate-400">Completed</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-2">
            {summary.Completed}
          </p>
        </div>
      </section>

      <section className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Mould Status</h2>
          <p className="text-sm text-slate-500">
            Static overview of mould progress by client
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left font-medium px-6 py-3">Client Code</th>
                <th className="text-left font-medium px-6 py-3">Product</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-left font-medium px-6 py-3">Quantity</th>
                <th className="text-left font-medium px-6 py-3">Start</th>
                <th className="text-left font-medium px-6 py-3">Expected</th>
              </tr>
            </thead>
            <tbody>
              {mouldData.map((item, index) => (
                <tr
                  key={`${item.clientCode}-${index}`}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.clientCode}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{item.product}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {item.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{item.startDate}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {item.expectedCompletion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
