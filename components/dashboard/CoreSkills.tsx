// components/dashboard/CoreSkills.tsx

"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type CoreSkillsProps = {
  skills?: string[];
  onChange: (skills: string[]) => void;
};

export default function CoreSkills({
  skills = [],
  onChange,
}: CoreSkillsProps) {
  const [newSkill, setNewSkill] = useState("");

  function handleAddSkill() {
    const skill = newSkill.trim();

    if (!skill) {
      return;
    }

    if (skills.includes(skill)) {
      setNewSkill("");
      return;
    }

    onChange([...skills, skill]);
    setNewSkill("");
  }

  function handleRemoveSkill(skillToRemove: string) {
    const updatedSkills = skills.filter(
      (skill) => skill !== skillToRemove
    );

    onChange(updatedSkills);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Core Skills
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add and manage your professional skills
        </p>
      </div>

      {/* Add Skill */}
      <div className="mb-5 flex gap-2">

        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill();
            }
          }}
          placeholder="Add a skill"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={handleAddSkill}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>

      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">

        {skills.length > 0 ? (
          skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600"
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-indigo-400 transition hover:text-red-500"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">
            No skills added yet.
          </p>
        )}

      </div>

    </div>
  );
}