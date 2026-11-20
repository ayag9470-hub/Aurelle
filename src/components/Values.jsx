const VALUES = [
  "Recycled 18k Gold",
  "Conflict-free Stones",
  "Handmade in Paris",
  "Lifetime Guarantee",
];

export default function Values() {
  return (
    <section className="values" aria-label="Our promise">
      <ul className="container">
        {VALUES.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </section>
  );
}
