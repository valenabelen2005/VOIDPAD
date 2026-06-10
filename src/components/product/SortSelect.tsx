'use client'

type Option = { label: string; value: string }

export function SortSelect({ options, value }: { options: Option[]; value: string }) {
  return (
    <select
      id="sort"
      name="sort"
      defaultValue={value}
      onChange={(e) => (e.currentTarget.form as HTMLFormElement).submit()}
      className="bg-[#111118] border border-[#1e1e2e] text-sm text-[#f0f0f5] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00e5ff]"
    >
      {options.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  )
}
