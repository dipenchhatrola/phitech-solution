const users = [
  {
    name: "Aarav Mehta",
    email: "aarav@phitech.com",
    role: "Operations",
    status: "Active",
  },
  {
    name: "Isha Patel",
    email: "isha@phitech.com",
    role: "Production",
    status: "Active",
  },
  {
    name: "Rahul Shah",
    email: "rahul@phitech.com",
    role: "Quality",
    status: "Inactive",
  },
  {
    name: "Neha Singh",
    email: "neha@phitech.com",
    role: "Client Support",
    status: "Active",
  },
];

const statusClass = (status: string) =>
  status === "Active"
    ? "bg-emerald-100 text-emerald-800"
    : "bg-slate-100 text-slate-600";

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white border border-slate-200 p-6">
        <h2 className="text-lg font-semibold">Users</h2>
        <p className="text-sm text-slate-500 mt-1">
          Static list of internal users for the admin panel
        </p>
      </section>

      <section className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left font-medium px-6 py-3">Name</th>
                <th className="text-left font-medium px-6 py-3">Email</th>
                <th className="text-left font-medium px-6 py-3">Role</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={`${user.email}-${index}`}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{user.email}</td>
                  <td className="px-6 py-4 text-slate-700">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
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
