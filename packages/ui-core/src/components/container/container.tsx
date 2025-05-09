export function Container({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="container mx-auto flex flex-1">{children}</div>;
}
