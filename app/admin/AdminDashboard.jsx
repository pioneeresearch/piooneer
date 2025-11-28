"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  FileText,
  Users,
  ShoppingBag,
  Briefcase,
  ClipboardList,
  Quote,
  CreditCard,
  TrendingUp,
  TrendingDown,
  PlusCircle,
} from "lucide-react";
import { list } from "postcss";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [dbLeads, setDbLeads] = useState([]);
  const [originalLeads, setOriginalLeads] = useState([]);
  // 👇 YAHAN PASTE KARO
  const refreshLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setDbLeads(data.leads);
        setOriginalLeads(data.leads);
        alert("Leads Updated Successfully! 😊");
      }
    } catch (err) {
      console.error("Refresh error:", err);
      alert("Failed to refresh leads!");
    }
  };

  useEffect(() => {
    if (activeMenu === "Leads") {
      refreshLeads(); 
    }
  }, [activeMenu]);

useEffect(() => {
  if (activeMenu === "Contact List") {
    fetchContacts();
  }
}, [activeMenu]);

const fetchContacts = async () => {
  try {
    const res = await fetch("/api/contact-list");
    const data = await res.json();
    if (data.success) {
      setContactList(data.messages);
    }
  } catch (err) {
    console.log(err);
  }
};

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        alert("Logout successful!");
        window.location.href = "/login";
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Something went wrong during logout!");
    }
  };

const [contactList, setContactList] = useState([]);

  const sidebarMenu = [

    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Leads", icon: Users },
    { name: "Contact List", icon: FileText},
    { name: "Manage Pages", icon: FileText },
    { name: "Services", icon: Briefcase },
    { name: "Products", icon: ShoppingBag },
    { name: "Insurance", icon: ClipboardList },

    { name: "Testimonials", icon: Quote },
    { name: "Visiting Cards", icon: CreditCard },
    
    { name: "Settings", icon: Settings },
  ];

  const metrics = [
    {
      title: "Total Leads",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "856",
      change: "+8.2%",
      trend: "up",
      color: "text-green-600",
    },
    {
      title: "Blog Posts",
      value: "42",
      change: "+3",
      trend: "up",
      color: "text-purple-600",
    },
    {
      title: "Conversions",
      value: "89",
      change: "-2.1%",
      trend: "down",
      color: "text-orange-600",
    },
  ];



  const recentLeads = [
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      plan: "Mutual Funds",
      time: "2 hours ago",
    },
    {
      name: "Priya Desai",
      email: "priya@example.com",
      plan: "Life Insurance",
      time: "5 hours ago",
    },
    {
      name: "Amit Kumar",
      email: "amit@example.com",
      plan: "Tax Planning",
      time: "1 day ago",
    },
  ];


  return (
    <div className="min-h-screen  -mt-10 flex bg-gray-50">

      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">
        <div>

          <div className="flex items-center space-x-2 p-6 border-b border-gray-100">
            <div className="bg-blue-600 text-white rounded-lg w-9 h-9 flex items-center justify-center font-bold text-lg shadow-sm">
              P
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Admin Panel
            </h2>
          </div>


          <nav className="mt-6 space-y-1 px-3">
            {sidebarMenu.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeMenu === item.name
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 mr-3 ${activeMenu === item.name ? "text-white" : "text-gray-500"
                    }`}
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>


        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-500 hover:bg-red-50 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 p-8 overflow-y-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mb-8">
          Welcome back! Here's what's happening with your platform.
        </p>

        {/* ---------- METRICS ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium ${metric.color}`}>
                  {metric.title}
                </span>
                {metric.trend === "up" ? (
                  <TrendingUp className="text-green-500 w-4 h-4" />
                ) : (
                  <TrendingDown className="text-red-500 w-4 h-4" />
                )}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {metric.value}
              </div>
              <div
                className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* ---------- BOTTOM SECTION ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-5 gap-8">

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Leads
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentLeads.map((lead, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-blue-100 text-blue-600 flex items-center justify-center font-semibold rounded-full">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">
                        {lead.name}
                      </h4>
                      <p className="text-gray-500 text-xs">{lead.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700 text-sm">{lead.plan}</p>
                    <p className="text-gray-400 text-xs">{lead.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button className="flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm">
                <PlusCircle className="w-4 h-4 mr-2" /> Add New Blog
              </button>
              <button className="flex items-center justify-center w-full py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                <Briefcase className="w-4 h-4 mr-2 text-gray-600" /> Add Service
              </button>
              <button className="flex items-center justify-center w-full py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                <ShoppingBag className="w-4 h-4 mr-2 text-gray-600" /> Add Product
              </button>
              <button className="flex items-center justify-center w-full py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                <Users className="w-4 h-4 mr-2 text-gray-600" /> View All Leads
              </button>
            </div>
          </div>
        </div>
        {activeMenu === "Leads" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">All Leads</h2>

              {/* RIGHT SECTION */}
              <div className="flex items-center gap-3">
                {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="border px-3 py-2 rounded-lg text-sm w-64"
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase();

                    if (!value.trim()) {
                      setDbLeads(originalLeads); // RESET
                      return;
                    }

                    setDbLeads(
                      originalLeads.filter(
                        (item) =>
                          item.name.toLowerCase().includes(value) ||
                          item.email.toLowerCase().includes(value)
                      )
                    );
                  }}
                />


                {/* REFRESH BUTTON */}
                <button
                  onClick={refreshLeads}
                  className="bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center gap-2"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>



            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Mobile</th>
                  <th className="p-3 border">Goal</th>
                  <th className="p-3 border">Calculator Type</th>
                  <th className="p-3 border">Created</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {dbLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{lead.name}</td>
                    <td className="p-3 border">{lead.email}</td>

                    {/* CALL BUTTON */}
                    <td className="p-3 border text-blue-600 underline">
                      <a href={`tel:${lead.mobile}`}>{lead.mobile}</a>
                    </td>

                    <td className="p-3 border">{lead.goal}</td>
                    <td className="p-3 border text-blue-600">{lead.calculatorType}</td>
                    <td className="p-3 border">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

                    {/* DELETE BUTTON */}
                    <td className="p-3 border">
                      <button
                        onClick={async () => {
                          if (!confirm("Delete this lead?")) return;

                          await fetch(`/api/leads?id=${lead._id}`, { method: "DELETE" });


                          setDbLeads((prev) => prev.filter((l) => l._id !== lead._id));
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* EXPORT BUTTON */}
            <button
              onClick={() => {
                const csv = dbLeads
                  .map((l) => `${l.name},${l.email},${l.mobile},${l.goal},${l.calculatorType}`)
                  .join("\n");

                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "leads.csv";
                a.click();
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
            >
              Export to Excel (CSV)
            </button>
          </div>
        )}
{activeMenu === "Contact List" && (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Contact Form Submissions
    </h2>

    <table className="w-full text-sm text-left border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Phone</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Subject</th>
          <th className="p-3 border">Message</th>
          <th className="p-3 border">Date</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {contactList.map((c) => (
          <tr key={c._id} className="hover:bg-gray-50">
            <td className="p-3 border">{c.name}</td>
            <td className="p-3 border">
              <a href={`tel:${c.phone}`} className="text-blue-600 underline">
                {c.phone}
              </a>
            </td>
            <td className="p-3 border">{c.email}</td>
            <td className="p-3 border">{c.subject}</td>
            <td className="p-3 border">{c.message}</td>
            <td className="p-3 border">
              {new Date(c.createdAt).toLocaleDateString()}
            </td>

            <td className="p-3 border">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                onClick={async () => {
                  if (!confirm("Delete this contact?")) return;
                  await fetch(`/api/contact-list?id=${c._id}`, { method: "DELETE" });
                  setContactList(prev => prev.filter(x => x._id !== c._id));
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      </main>
    </div>
  );
}
