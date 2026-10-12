"use client";

const packages = [
  {
    name: "Багц 1",
    title: "Эрэгтэй хөтлөгч",
    hosts: [
      "Э.Ууганбаяр",
      "Т.Бархүү",
      "Г.Алтаншагай",
      "Ж.Алтаншагай",
      "Э.Энхболд",
      "Ш.Мөнхбаяр",
      "Ц.Чойжилсүрэн",
      "Т.Шижирбаатар",
      "И.Төмөрхуяг",
      "М.Баяржаргал",
    ],
  },
  {
    name: "Багц 2",
    title: "Эмэгтэй хөтлөгч",
    hosts: [
      "С.Чимгээ",
      "Д.Одзааяа",
      "Н.Ундрал",
      "Б.Ганболор",
      "А.Гэрэлцэцэг",
      "Х.Бадамгэрэл",
      "Э.Уянга",
      "Н.Амаржаргал",
      "П.Одгэрэл",
    ],
  },
];

export function PackageSelection() {
  return (
    <fieldset className="package-selection">
      <legend>Хөтлөгчийн багц сонгох</legend>
      <div className="package-grid">
        {packages.map((item) => (
          <label className="package-card" key={item.name}>
            <span className="package-title">
              <input type="radio" name="host-package" value={item.name} />
              {item.name}
            </span>
            <strong>{item.title}</strong>
            <ul>
              {item.hosts.map((host) => (
                <li key={host}>{host}</li>
              ))}
            </ul>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
