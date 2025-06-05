import AnimationShowcase from '../../components/AnimationShowcase';

// Disable static generation for this page to avoid SSR issues with animations
export const dynamic = 'force-dynamic';

export default function DemoPage() {
  return <AnimationShowcase />;
}
