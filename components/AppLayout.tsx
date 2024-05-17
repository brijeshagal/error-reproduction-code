import Navbar from "./Navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div><Navbar />{children}</div>;
}
