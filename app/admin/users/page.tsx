// app/ admin/ users/ page.tsx

"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Trash2 } from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTable from "@/components/admin/common/AdminTable";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
};

export default function UsersPage() {

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    useEffect( () => {
        const storedUsers = localStorage.getItem("careerhubUsers");

        if(storedUsers) {
            try {
                const parsedUsers = JSON.parse(storedUsers);

                if(Array.isArray(parsedUsers)) {
                    setUsers(parsedUsers);
                }
            }
            catch (error) {
                console.log("Failed to parse users:", error);
            }
        }
    }, []);

    const getInitials = (name: string = "") => {
        return name
        .trim()
        .split(/\s+/)
        .map( (word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    };

    const formatDate = (date: string = "") => {
        if(!date) return "-";

        const parsedDate = new Date(date);

        if(Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        });
    }

    const handleDelete = (id: string) => {
        const user = users.find( (user) => user.id === id);

        if(!user) return;

        if(user.role.toLowerCase() === "admin") {
            alert("Admin users cannot be deleted.");
            return;
        }

        const confirmed = window.confirm(`Are you sure you want to delete ${user.name}?`);

        if(!confirmed) return;

        const updatedUsers = users.filter(
            (user) => user.id !== id
        );


        setUsers(updatedUsers);

        localStorage.setItem("careerubUsers", JSON.stringify(updatedUsers))
    }

    const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.role.toLowerCase().includes(searchValue)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <AdminSidebar />

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

          <section className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

            {/* Page Header */}

            <div className="mb-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Users
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage registered users.
                  </p>
                </div>

                <Link
                  href="/admin"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Back to Dashboard
                </Link>

              </div>
            </div>

            {/* Search */}

            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

                <Search className="h-4 w-4 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search users..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

              </div>

            </div>

            {/* Users */}

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              {/* Table Header */}

              <div className="border-b border-gray-100 px-5 py-5 sm:px-6">

                <h2 className="text-lg font-semibold text-gray-900">
                  All Users
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredUsers.length} users found
                </p>

              </div>

              {/* Empty State / Table */}

              {filteredUsers.length === 0 ? (

                <div className="px-6 py-16 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    No users found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search.
                  </p>

                </div>

              ) : (

                <AdminTable
                  minWidth="800px"
                  headers={
                    <tr className="border-b border-gray-100">

                      <th className="w-[28%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        User
                      </th>

                      <th className="w-[27%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Email
                      </th>

                      <th className="w-[15%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Role
                      </th>

                      <th className="w-[20%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Joined
                      </th>

                      <th className="w-[10%] px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Action
                      </th>

                    </tr>
                  }
                >

                  {filteredUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* User */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {getInitials(user.name)}
                          </div>

                          <p className="truncate text-sm font-semibold text-gray-900">
                            {user.name}
                          </p>

                        </div>

                      </td>

                      {/* Email */}

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>

                      {/* Role */}

                      <td className="px-6 py-4">

                        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {user.role}
                        </span>

                      </td>

                      {/* Joined */}

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Action */}

                      <td className="px-6 py-4 text-right">

                        {user.role.toLowerCase() === "admin" ? (

                          <span className="text-xs font-medium text-gray-400">
                            Protected
                          </span>

                        ) : (

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            aria-label={`Delete ${user.name}`}
                            className="inline-flex rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </AdminTable>

              )}

            </div>

          </section>

        </div>

      </div>
    </main>
  );

}