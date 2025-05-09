import { Frame } from '@/layouts/components/frame/frame';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Frame>{children}</Frame>;
}
