import { useReveal } from '../hooks/useReveal';

export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
